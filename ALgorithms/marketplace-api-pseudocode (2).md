# E-Commerce Marketplace API — Algorithm & Pseudocode

Stack assumed: Node.js + Express + MongoDB (Mongoose). Chat = REST polling.

---

## 1. Data Models

```
User {
  _id
  name
  email (unique)
  passwordHash
  role: "buyer" | "seller"
  createdAt
}

Product {
  _id
  sellerId (ref User)
  title
  description
  price
  category
  stock
  images[]
  createdAt
  updatedAt
}

CartItem (embedded in Cart, one Cart doc per buyer) {
  productId (ref Product)
  quantity
  priceAtAdd        // snapshot, so cart totals don't silently change if seller edits price
}

Cart {
  _id
  buyerId (ref User, unique)
  items: [CartItem]
}

Order {
  _id
  buyerId (ref User)
  items: [{ productId, title, price, quantity }]   // snapshot at checkout time
  totalAmount
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled"
  createdAt
}

Message {
  _id
  senderId (ref User)
  receiverId (ref User)
  productId (ref Product, optional)   // ties chat to a listing
  content
  createdAt
  read: boolean
}
```

---

## 2. Auth Middleware (used by almost every route)

```
FUNCTION authenticate(req, res, next):
    token = extract from Authorization header ("Bearer <token>")
    IF token missing:
        RETURN 401 "No token provided"
    TRY:
        payload = verifyJWT(token, SECRET)
        req.user = { id: payload.id, role: payload.role }
        next()
    CATCH:
        RETURN 401 "Invalid or expired token"


FUNCTION authorize(...allowedRoles):
    RETURN FUNCTION(req, res, next):
        IF req.user.role NOT IN allowedRoles:
            RETURN 403 "Forbidden: insufficient role"
        next()
```

Note: since sellers can do everything buyers can, most buyer-only routes should check
`role IN ["buyer", "seller"]`, while seller-only routes (product management) check
`role == "seller"` strictly. Decide per-route below.

---

## 3. Auth Routes (/auth)

```
POST /auth/register
    INPUT: name, email, password, role ("buyer" | "seller")
    ALGORITHM:
        validate inputs (email format, password length, role in allowed set)
        existingUser = User.findOne({ email })
        IF existingUser exists:
            RETURN 409 "Email already registered"
        passwordHash = bcrypt.hash(password, saltRounds=10)
        newUser = User.create({ name, email, passwordHash, role })
        token = signJWT({ id: newUser._id, role: newUser.role })
        RETURN 201 { user: sanitize(newUser), token }

POST /auth/login
    INPUT: email, password
    ALGORITHM:
        user = User.findOne({ email })
        IF NOT user:
            RETURN 401 "Invalid credentials"
        match = bcrypt.compare(password, user.passwordHash)
        IF NOT match:
            RETURN 401 "Invalid credentials"
        token = signJWT({ id: user._id, role: user.role })
        RETURN 200 { user: sanitize(user), token }
```

`sanitize(user)` = strip `passwordHash` before returning.

---

## 4. User Profile Routes (/users)

```
GET /users/me
    [authenticate]
    ALGORITHM:
        user = User.findById(req.user.id)
        RETURN 200 sanitize(user)

PUT /users/me
    [authenticate]
    INPUT: name?, email?, password?
    ALGORITHM:
        updates = pick only allowed fields from body
        IF password provided:
            updates.passwordHash = bcrypt.hash(password)
        updatedUser = User.findByIdAndUpdate(req.user.id, updates, { new: true })
        RETURN 200 sanitize(updatedUser)
```

---

## 5. Product Routes (/products)

```
GET /products
    [public, no auth required]
    QUERY PARAMS: search, category, minPrice, maxPrice, page, limit, sortBy
    ALGORITHM:
        filter = {}
        IF search provided: filter.title/description = regex or text search
        IF category provided: filter.category = category
        IF minPrice/maxPrice: filter.price = { $gte, $lte }
        products = Product.find(filter)
                     .sort(sortBy)
                     .skip((page-1)*limit)
                     .limit(limit)
        total = Product.countDocuments(filter)
        RETURN 200 { products, total, page, totalPages }

GET /products/:id
    [public]
    ALGORITHM:
        product = Product.findById(id)
        IF NOT product: RETURN 404
        RETURN 200 product

POST /products
    [authenticate, authorize("seller")]
    INPUT: title, description, price, category, stock, images
    ALGORITHM:
        validate required fields, price > 0, stock >= 0
        product = Product.create({ ...input, sellerId: req.user.id })
        RETURN 201 product

PUT /products/:id
    [authenticate, authorize("seller")]
    ALGORITHM:
        product = Product.findById(id)
        IF NOT product: RETURN 404
        IF product.sellerId != req.user.id: RETURN 403 "Not your listing"
        applyUpdates(product, req.body)
        product.save()
        RETURN 200 product

DELETE /products/:id
    [authenticate, authorize("seller")]
    ALGORITHM:
        product = Product.findById(id)
        IF NOT product: RETURN 404
        IF product.sellerId != req.user.id: RETURN 403 "Not your listing"
        Product.deleteOne({ _id: id })
        RETURN 204
```

---

## 6. Cart Routes (/cart) — buyers (and sellers acting as buyers)

```
[authenticate, authorize("buyer","seller")] on all cart routes

GET /cart
    ALGORITHM:
        cart = Cart.findOne({ buyerId: req.user.id }) OR create empty one
        RETURN 200 cart (populate product titles/images for display)

POST /cart/items
    INPUT: productId, quantity
    ALGORITHM:
        product = Product.findById(productId)
        IF NOT product OR product.stock < quantity: RETURN 400 "Unavailable / insufficient stock"
        cart = Cart.findOne({ buyerId: req.user.id }) OR create new
        IF product already in cart.items:
            increment quantity
        ELSE:
            push { productId, quantity, priceAtAdd: product.price }
        cart.save()
        RETURN 200 cart

PUT /cart/items/:productId
    INPUT: quantity
    ALGORITHM:
        cart = Cart.findOne({ buyerId: req.user.id })
        item = find item in cart.items matching productId
        IF NOT item: RETURN 404
        IF quantity <= 0: remove item from cart.items
        ELSE: item.quantity = quantity
        cart.save()
        RETURN 200 cart

DELETE /cart/items/:productId
    ALGORITHM:
        cart = Cart.findOne({ buyerId: req.user.id })
        remove item matching productId
        cart.save()
        RETURN 200 cart
```

---

## 7. Order Routes (/orders) — buyers only (in the "can place orders" sense)

```
[authenticate, authorize("buyer","seller")] on all order routes

POST /orders/checkout
    ALGORITHM:
        cart = Cart.findOne({ buyerId: req.user.id })
        IF cart.items is empty: RETURN 400 "Cart is empty"

        FOR each item in cart.items:
            product = Product.findById(item.productId)
            IF product.stock < item.quantity:
                RETURN 400 "Insufficient stock for <product.title>"

        // begin transaction (Mongo session) for consistency
        START TRANSACTION
            FOR each item in cart.items:
                Product.updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } }
                )
            orderItems = cart.items.map(item => ({
                productId: item.productId,
                title: product.title,
                price: item.priceAtAdd,
                quantity: item.quantity
            }))
            totalAmount = sum(orderItems.price * quantity)
            order = Order.create({
                buyerId: req.user.id,
                items: orderItems,
                totalAmount,
                status: "pending"
            })
            cart.items = []
            cart.save()
        COMMIT TRANSACTION

        RETURN 201 order

GET /orders
    ALGORITHM:
        orders = Order.find({ buyerId: req.user.id }).sort({ createdAt: -1 })
        RETURN 200 orders

GET /orders/:id
    ALGORITHM:
        order = Order.findById(id)
        IF NOT order OR order.buyerId != req.user.id: RETURN 404
        RETURN 200 order
```

---

## 8. Chat Routes (/messages) — REST polling

```
[authenticate] on all routes

POST /messages
    INPUT: receiverId, productId?, content
    ALGORITHM:
        validate receiverId exists
        message = Message.create({
            senderId: req.user.id,
            receiverId,
            productId,
            content,
            read: false
        })
        RETURN 201 message

GET /messages/:otherUserId
    QUERY PARAMS: since? (ISO timestamp, for polling)
    ALGORITHM:
        filter = {
            $or: [
                { senderId: req.user.id, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: req.user.id }
            ]
        }
        IF since provided:
            filter.createdAt = { $gt: since }
        messages = Message.find(filter).sort({ createdAt: 1 })
        RETURN 200 messages

GET /messages/conversations
    ALGORITHM:
        // list distinct users the current user has exchanged messages with,
        // plus last message + unread count per conversation
        conversations = aggregate messages grouped by "other user"
        RETURN 200 conversations

PATCH /messages/:id/read
    ALGORITHM:
        message = Message.findById(id)
        IF message.receiverId != req.user.id: RETURN 403
        message.read = true
        message.save()
        RETURN 200 message
```

Polling pattern for the client: call `GET /messages/:otherUserId?since=<lastMessageTimestamp>`
every N seconds, append new results, update `since` to the latest `createdAt` received.

---

## 9. Route/Middleware Summary Table

| Route                         | Auth? | Roles allowed        |
|-------------------------------|-------|-----------------------|
| POST /auth/register           | No    | —                     |
| POST /auth/login              | No    | —                     |
| GET/PUT /users/me              | Yes   | buyer, seller         |
| GET /products, GET /products/:id | No | — (public)          |
| POST/PUT/DELETE /products/:id | Yes   | seller only + ownership check |
| /cart/*                       | Yes   | buyer, seller         |
| /orders/*                     | Yes   | buyer, seller         |
| /messages/*                   | Yes   | buyer, seller         |

---

## 10. Suggested Build Order

1. User model + /auth (register, login, JWT)
2. authenticate/authorize middleware
3. /users profile routes
4. Product model + /products CRUD + search/filter
5. Cart model + /cart routes
6. Order model + /orders/checkout (with stock-decrement transaction)
7. Message model + /messages polling routes
8. Input validation layer (e.g. Joi/Zod) across all routes
9. Error-handling middleware (central 404/500 handler)
10. Tests for RBAC edge cases (buyer hitting seller-only routes, ownership checks)
