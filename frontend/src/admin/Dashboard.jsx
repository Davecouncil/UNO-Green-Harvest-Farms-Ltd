import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getProducts } from "../services/productService";
import Button from "../components/ui/Button";
import { FiBox, FiAlertTriangle, FiXCircle, FiFolder, FiPlus, FiEye } from "react-icons/fi";
import Loader from "../components/ui/Loader";

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    // return <p className="text-gray-500 text-sm">Loading dashboard...</p>;
    return <Loader/>
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  const totalProducts = products.length;
  const lowStockItems = products.filter((p) => p.stock > 0 && p.stock <= 40);
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalCategories = new Set(products.map((p) => p.category)).size;

  const stats = [
    {
      icon: FiBox,
      label: "Total Products",
      value: totalProducts,
      iconBg: "bg-green-100",
      iconColor: "text-[#2D7A0F]",
    },
    {
      icon: FiAlertTriangle,
      label: "Low Stock Alerts",
      value: lowStockItems.length,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700",
    },
    {
      icon: FiXCircle,
      label: "Out of Stock",
      value: outOfStockCount,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: FiFolder,
      label: "Categories",
      value: totalCategories,
      iconBg: "bg-[#f5e2b8]",
      iconColor: "text-[#D69B06]",
    },
  ];

  return (
    <div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-dm text-2xl text-gray-900">
            Welcome back, {user?.userName?.split(" ")[0] || "there"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening on your farm today.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={() => navigate("/admin/add-product")}>
            <FiPlus size={14} className="mr-1.5 inline" />
            Add Product
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
            <FiEye size={14} className="mr-1.5 inline" />
            View Inventory
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={stat.iconColor} />
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-dm text-lg text-gray-900">Low Stock Alerts</h2>
            {lowStockItems.length > 0 && (
              <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">
                {lowStockItems.length} items
              </span>
            )}
          </div>

          {lowStockItems.length === 0 ? (
            <p className="text-gray-400 text-sm">No low stock items right now.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {lowStockItems.map((product) => (
                <div key={product._id} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </div>
                  <p className="text-sm font-medium text-yellow-700 whitespace-nowrap">
                    {product.stock} left
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders — placeholder until Orders backend exists */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center py-14">
          <h2 className="font-dm text-lg text-gray-900 mb-2">Recent Orders</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Order tracking isn't set up yet. Once the Orders system is built,
            your most recent orders will show up here.
          </p>
        </div>

      </div>

    </div>
  );
}