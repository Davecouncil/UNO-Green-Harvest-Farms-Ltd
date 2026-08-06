import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createProduct } from "../services/productService";
import Button from "../components/ui/Button";

const categories = [
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Livestock",
  "Grains & Cereals",
  "Bakery",
  "Pantry",
];

const units = ["kg", "lb", "per lb", "dozen", "per bag", "per jar", "per bunch"];

const badges = ["None", "New", "Sale", "Organic", "Best Seller"];

const certificationOptions = [
  "NAFDAC Registered",
  "SON Certified",
  "Nigeria Organic Agriculture Network (NOAN) Certified",
  "Halal Certified",
  "Made in Nigeria",
  "Fair Trade Certified",
  "Non-GMO Verified",
  "Free Range",
];

export default function AddProduct() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    price: "",
    originalPrice: "",
    stock: "",
    unit: units[0],
    badge: badges[0],
    origin: "",
    description: "",
    image: "",
  });

  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCertification = (cert) => {
    setCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await createProduct(
        {
          ...form,
          price: Number(form.price),
          originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
          stock: Number(form.stock),
          certifications,
        },
        token
      );

      setSuccess(true);
      setTimeout(() => navigate("/admin/inventory"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-dm text-2xl text-gray-900 mb-1">Add New Product</h1>
      <p className="text-gray-500 text-sm mb-6">
        Fill in the details below to add a new product to your inventory.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-5">

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Organic Roma Tomatoes"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Price (₦) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="4.99"
              min="0"
              step="0.01"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Original Price (₦)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="5.99"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="100"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Unit
            </label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Badge
            </label>
            <select
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            >
              {badges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Origin / Farm
            </label>
            <input
              type="text"
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="e.g., Green Valley Farm, Oyo State"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/tomatoes.png"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the product — its qualities, growing practices, flavor notes..."
            required
            maxLength={500}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">{form.description.length}/500 characters</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Certifications
          </label>
          <div className="flex flex-wrap gap-2">
            {certificationOptions.map((cert) => (
              <button
                type="button"
                key={cert}
                onClick={() => toggleCertification(cert)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                  certifications.includes(cert)
                    ? "bg-[#2D7A0F] text-white border-[#2D7A0F]"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-700 text-sm bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            Product created successfully!
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="secondary" loading={loading}>
            Save Product
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/inventory")}>
            Cancel
          </Button>
        </div>

      </form>
    </div>
  );
}