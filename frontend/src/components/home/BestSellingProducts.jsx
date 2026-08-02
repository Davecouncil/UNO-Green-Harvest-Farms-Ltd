import { IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

import ProductFilter from "../product/ProductFilter";
import ProductGrid from "../product/ProductGrid";

function BestSellingProducts({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  return (
    <section className="max-w-7xl mx-auto py-14 px-4">

      <div className="flex justify-between items-end mb-6">

        <div>
          <p className="uppercase text-sm text-[#4D7C0F] font-semibold tracking-widest">
            SHOP OUR BEST
          </p>

          <h2 className="text-3xl font-dm mt-1">
            Best Selling Products
          </h2>
        </div>

        <Link
          to="/products"
          className="text-sm text-green-700 flex items-center gap-2 hover:text-green-900 font-medium"
        >
          View all Products <IoIosArrowDropright />
        </Link>

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