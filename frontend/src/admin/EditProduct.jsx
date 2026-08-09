import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getProduct, updateProduct } from "../services/productService";
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

export default function EditProduct() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setPageLoading(true);
      try {
        const product = await getProduct(id);
        setForm({
          name: product.name || "",
          category: product.category || categories[0],
          price: product.price ?? "",
          originalPrice: product.originalPrice ?? "",
          stock: product.stock ?? "",
          unit: product.unit || units[0],
          badge: product.badge || badges[0],
          origin: product.origin || "",
          description: product.description || "",
          image: product.image || "",
        });
        setCertifications(product.certifications || []);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    setSaving(true);

    try {
      await updateProduct(
        id,
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
      setError(err.response?.data?.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) {
    return <p className="text-gray-500 text-sm">Loading product...</p>;
  }

  if (!form) {
    return <p className="text-red-600 text-sm">{error || "Product not found."}</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-dm text-2xl text-gray-900 mb-1">Edit Product</h1>
      <p className="text-gray-500 text-sm mb-6">
        Update the details for this product.
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
            Product updated successfully!
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="secondary" loading={saving}>
            Save Changes
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/inventory")}>
            Cancel
          </Button>
        </div>

      </form>
    </div>
  );
}