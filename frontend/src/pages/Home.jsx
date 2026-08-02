import Hero from "../components/home/Hero";
// import Features from "../components/home/Features";
import ProductCategories from "../components/home/ProductCategories";
import BestSellingProducts from "../components/home/BestSellingProducts";
import Sustainability from "../components/home/Sustainability";
// import Newsletter from "../components/home/Newsletter";
import { useEffect, useState } from "react";
import SmartFarming from "../components/home/SmartFarming"
import {getProducts} from "../services/productService"
import Reveal from "../components/Reveal";


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
    <Reveal><Hero /></Reveal>
      <Reveal> <BestSellingProducts products={products} /></Reveal>
      <Reveal><ProductCategories products={products}/></Reveal>
      <Reveal><SmartFarming/></Reveal>
      <Reveal><Sustainability/></Reveal>
     
      
      
      
      {/* <Features />
      
      
      <Testimonials />
      <Newsletter /> */}
    </>
  );
}

export default Home;