import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getProducts, deleteProduct } from "../services/productService";
import Button from "../components/ui/Button";
import { FiEdit2, FiTrash2, FiEye, FiSearch } from "react-icons/fi";

export default function Inventory() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", className: "bg-red-100 text-red-700" };
    if (stock <= 30) return { label: "Low Stock", className: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", className: "bg-green-100 text-green-700" };
  };

  const filteredProducts = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading inventory...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-dm text-2xl text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm">{products.length} total products</p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/admin/add-product")}>
          + Add Product
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-[#2D7A0F] text-white border-[#2D7A0F]"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-[#2D7A0F] transition"
        >
          <option value="name">Sort: Name</option>
          <option value="priceLow">Sort: Price (Low to High)</option>
          <option value="priceHigh">Sort: Price (High to Low)</option>
          <option value="stock">Sort: Stock</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.stock);
              return (
                <tr key={product._id} className="border-b border-gray-50 last:border-none">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-gray-100"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{product.category}</td>
                  <td className="px-5 py-3 text-gray-900">
                    ₦{product.price}
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-1.5 text-xs">
                        ₦{product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{product.stock}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="text-gray-400 hover:text-[#2D7A0F] p-1.5 rounded-lg hover:bg-gray-50 transition"
                        aria-label="View product"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        className="text-gray-400 hover:text-[#2D7A0F] p-1.5 rounded-lg hover:bg-gray-50 transition"
                        aria-label="Edit product"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        disabled={deletingId === product._id}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                        aria-label="Delete product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-10">
            {products.length === 0 ? "No products yet." : "No products match your search/filter."}
          </p>
        )}
      </div>
    </div>
  );
}