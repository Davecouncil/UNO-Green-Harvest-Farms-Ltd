import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getProducts } from "../services/productService";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/ui/Loader";

function Products() { 
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <p className="uppercase tracking-widest text-sm text-[#4D7C0F] font-semibold mb-2">
        Farm Fresh Selection
      </p>

      <h1 className="font-dm text-4xl mb-3">All Products</h1>

      <p className="text-gray-600 text-base mb-8 max-w-xl">
        Browse our complete collection of organic, sustainably-grown farm
        products delivered fresh to your door.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#F4F8F1] border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
        />
      </div>

      {/* Filter + Sort Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] transition bg-white shrink-0"
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="text-gray-500 text-sm mb-6">
        Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span>{" "}
        of <span className="font-semibold text-gray-800">{products.length}</span> products
      </p>

      {/* Grid */}
      {loading ? (
        // <p className="text-gray-500 text-sm">Loading products...</p>
        <div className="flex justify-center items-center h-20 py-20"> <Loader/></div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">No products match your search.</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}

    </div>
  );
}

export default Products;