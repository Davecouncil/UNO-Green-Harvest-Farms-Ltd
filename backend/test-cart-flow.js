const axios = require("axios");

const BASE = "http://localhost:4878/api";

// change these each time you run it, since email must be unique
const testUser = {
  userName: "Test Buyer",
  email: `testbuyer${Date.now()}@example.com`,
  password: "password123",
  phone: "08012345678",
  role: "buyer",
};

const testProduct = {
  name: "Test Cassava",
  description: "A test product for cart flow verification.",
  price: 10.5,
  category: "Tubers",
  stock: 50,
  image: "https://example.com/images/cassava.jpg",
};

async function run() {
  try {
    console.log("1. Signing up test user...");
    const signupRes = await axios.post(`${BASE}/auth/signup`, testUser);
    console.log("   ✔ Signup success:", signupRes.data.user.email);

    console.log("2. Logging in...");
    const loginRes = await axios.post(`${BASE}/auth/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    const token = loginRes.data.token;
    console.log("   ✔ Login success, token received.");

    console.log("3. Creating test product...");
    const productRes = await axios.post(`${BASE}/products`, testProduct);
    const productId = productRes.data.product._id;
    console.log("   ✔ Product created:", productRes.data.product.name, "| ID:", productId);

    console.log("4. Adding product to cart...");
    const addRes = await axios.post(
      `${BASE}/cart`,
      { productId, quantity: 2 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("   ✔ Add to cart response:", addRes.data.message);

    console.log("5. Fetching cart...");
    const cartRes = await axios.get(`${BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("   ✔ Cart contents:", JSON.stringify(cartRes.data.cart, null, 2));

    console.log("\nAll steps passed successfully.");
  } catch (error) {
    console.error("\n✘ Test failed at some step:");
    console.error(error.response?.data || error.message);
  }
}

run();