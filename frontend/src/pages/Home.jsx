import Hero from "../components/home/Hero";
// import Features from "../components/home/Features";
import ProductCategories from "../components/home/ProductCategories";
import BestSellingProducts from "../components/home/BestSellingProducts";
// import Testimonials from "../components/home/Testimonials";
// import Newsletter from "../components/home/Newsletter";
import { useEffect, useState } from "react";
import {getProduct } from "../services/productService"


function Home() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  fetchProducts();
}, []);
  return (
    <>
      <Hero />
      <BestSellingProducts products={products} />
      <ProductCategories products={products}/>
      {/* <Features />
      
      
      <Testimonials />
      <Newsletter /> */}
    </>
  );
}

export default Home;