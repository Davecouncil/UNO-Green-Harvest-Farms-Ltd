// // // import { useEffect, useState } from "react";
// // // import { getProducts } from "../../services/productService";

// // // function BestSellingProducts() {
// // //   const [products, setProducts] = useState([]);

// // //   useEffect(() => {
// // //     const loadProducts = async () => {
// // //       try {
// // //         const data = await getProducts();
// // //         setProducts(data);
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };

// // //     loadProducts();
// // //   }, []);

// // //   return (
// // //     <section className="max-w-7xl mx-auto py-20">
// // //       <h2 className="text-3xl font-bold mb-8">Products</h2>

// // //       {products.map((product) => (
// // //         <div key={product._id}>
// // //           <h3>{product.name}</h3>
// // //           <p>{product.category}</p>
// // //           <p>${product.price}</p>
// // //         </div>
// // //       ))}
// // //     </section>
// // //   );
// // // }

// // // export default BestSellingProducts;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiArrowRight } from "react-icons/fi";

// import { getProducts } from "../../services/productService";

// import ProductFilter from "../product/ProductFilter";
// import ProductGrid from "../product/ProductGrid";

// function BestSellingProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
// //     <section className="max-w-7xl mx-auto py-20">
// //      {/* Header */}
// //     <div className="flex justify-between items-end mb-10">

// //         <div>

// //             <p className="uppercase text-[#4D7C0F] font-semibold tracking-widest">
// //                 SHOP OUR BEST
// //             </p>

// //             <h2 className="text-5xl font-dm mt-2">
// //                 Best Selling Products
// //             </h2>

// //         </div>

// //         <button className="text-green-700 hover:text-green-900 font-medium">
// //             View All Products →
// //         </button>

// //     </div>

// //     <ProductFilter />

// //     <ProductGrid />

// // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //   {products.map((product) => (
// //     <ProductCard
// //       key={product._id}
// //       product={product}
// //     />
// //   ))}
// // </div>
//     // </section>
//     <section className="max-w-7xl mx-auto py-20">

//     {/* Header */}
//     <div className="flex justify-between items-end mb-10">

//         <div>

//             <p className="uppercase text-[#4D7C0F] font-semibold tracking-widest">
//                 SHOP OUR BEST
//             </p>

//             <h2 className="text-5xl font-dm mt-2">
//                 Best Selling Products
//             </h2>

//         </div>

//         <button className="text-green-700 hover:text-green-900 font-medium">
//             View All Products →
//         </button>

//     </div>

//     <ProductFilter/>

//     <ProductGrid products={products}/>

// </section>
//   );
// }

// export default BestSellingProducts;
import { IoIosArrowDropright } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

// import { getProducts } from "../../services/productService";

import ProductFilter from "../product/ProductFilter";
import ProductGrid from "../product/ProductGrid";


function BestSellingProducts({products}) {
const [selectedCategory, setSelectedCategory] = useState("All");
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, []);

  const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
    );


      const categories = ["All", ...new Set(products.map((product) => product.category)),];


  return (
    <section className="max-w-7xl mx-auto py-20">

      <div className="flex justify-between items-end mb-10">

        <div>
          <p className="uppercase text-[#4D7C0F] font-semibold tracking-widest">
            SHOP OUR BEST
          </p>

          <h2 className="text-5xl font-dm mt-2">
            Best Selling Products
          </h2>
        </div>

        {/* <button className="text-green-700 hover:text-green-900 font-medium" >
          View All Products →
        </button> */}
        <Link to= "/products" className="text-green-700 flex items-center gap-2 justify-center hover:text-green-900 font-medium">
        View all Product <IoIosArrowDropright /> </Link>

      </div>
       <ProductFilter
         categories={categories}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
        />
      <ProductGrid products={filteredProducts} />

    </section>
  );
}
export default BestSellingProducts;