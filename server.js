// const http = require('http');
// const filesystem = require('fs');

// const server = http.createServer((req, res) => {
// switch(req.url) {
//     case "/":
//         path = "index.html";
//         break;
//     case "/about":
//         path = "about.html";
//         break;
//     default:
//         path = "404.html";
//         break;
// }

// filesystem.readFile(`./views/${path}`, (err, data) => {
//     res.write(data);
//     res.end();
    
// });
// });


// server.listen(4878, "localhost", () => {
//   console.log('Server running at http://localhost:4878/');
// });
// const http = require('http');
// const filesystem = require('fs');
// const express = require('express');
// const app = express();
// const port = 4878;

// app.use(express.json());

// app.listen(4878, () =>{
//     console.log('Server running at http://localhost:4878');
// });
// app.post('/profile', (req, res)=>{
//     console.log(req.body);

//     res.json({
//         success:true,
//         message: "Registration successful",
//     })
//})
// // const http = require('http');
// const filesystem = require('fs/promises');
// const express = require('express');
// const app = express();


// // app.use(express.static(__dirname));
// app.use(express.json());

// app.get('/product', async (req, res)=>{
//     try{
//         const req = await fetch('https://fakestoreapi.com/products');
//         const data = await response.json();

//         await filesystem.writeFile('products.json', JSON.stringify(data, null, 2))

//              res.json(data)
//              console.log(data)
//     } catch (error){
//         console.log(error);
//         res.status(500).json({error: "internal server error", success: false, message: "Something went wrong homie" })
//     }
    
// })



// app.post('/product', async (req, res)=>{ 
//     try{
//         const fileContent = await filesystem.readFile('products.json', 'utf-8');
//         const products = JSON.parse(fileContent);

//         const newProduct ={
//             id: crypto.randomUUID(),
//             title: req.body.title,
//             price: req.body.price
//         };
//         products.push(newProduct);
        
//         await filesystem.writeFile('products.json', JSON.stringify(products, null, 2));

//         res.json({ success: true, message: "product added successfully", product: newProduct });

//     } catch(error){
//         console.log(error);
//         res.status(500).json({ success: false, message: "Something went wrong" });
//     }
// })
// app.listen(4878, () => {    
//     console.log('Server running at http://localhost:4878');
// });
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");

// API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch(err => console.log(err));

// my own

app.post('/register', (req, res) => {
    const {username} = req.body;

    console.log(username);
    res.status(201).json({ success: true, message: `User ${username} received!` });
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})