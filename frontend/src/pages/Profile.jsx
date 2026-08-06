import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import * as userService from "../services/userService";
import * as orderService from "../services/orderService";
import { FiEdit2, FiCamera } from "react-icons/fi";
import WishlistSidebar from "../pages/Wishlist"


const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Profile() {
  const { user, token, updateStoredUser } = useAuth();
  const [tab, setTab] = useState("info");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({ userName: "", email: "", phone: "" });
  const [infoStatus, setInfoStatus] = useState("idle"); // idle | saving | saved | error
  const [infoError, setInfoError] = useState("");

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordStatus, setPasswordStatus] = useState("idle");
  const [passwordError, setPasswordError] = useState("");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await userService.getMe(token);
        setForm({
          userName: me.userName || "",
          email: me.email || "",
          phone: me.phone || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    if (token) load();
  }, [token]);

  useEffect(() => {
    const loadOrders = async () => {
      setOrdersLoading(true);
      try {
        const data = await orderService.getMyOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (token && tab === "orders") loadOrders();
  }, [token, tab]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoStatus("saving");
    setInfoError("");
    try {
      const updated = await userService.updateProfile(form, token);
      updateStoredUser(updated);
      setInfoStatus("saved");
      setEditing(false);
      setTimeout(() => setInfoStatus("idle"), 1500);
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      setInfoError(error.response?.data?.message || "Failed to update profile.");
      setInfoStatus("error");
    }
  };

  const handleCancelEdit = () => {
    setForm({
      userName: user.userName || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    setInfoError("");
    setEditing(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match.");
      setPasswordStatus("error");
      return;
    }

    setPasswordStatus("saving");
    setPasswordError("");
    try {
      await userService.changePassword(
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        token
      );
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordStatus("saved");
      setTimeout(() => setPasswordStatus("idle"), 1500);
    } catch (error) {
      setPasswordError(error.response?.data?.message || "Failed to change password.");
      setPasswordStatus("error");
    }
  };

  if (!user) {
    return (
      <div className="pt-20 sm:pt-24 max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500 text-sm">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 grid lg:grid-cols-4 max-w-7xl mx-auto px-6 py-12 gap-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:col-span-3">

        {/* Profile header card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#2D7A0F] text-white flex items-center justify-center text-2xl font-semibold">
              {getInitials(user.userName)}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
              title="Change photo (not yet wired up)"
            >
              <FiCamera size={13} />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="font-dm text-2xl sm:text-3xl">{user.userName}</h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            {user.createdAt && (
              <p className="text-xs text-gray-400 mt-2">
                Member since {new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </p>
            )}
          </div>

          {tab === "info" && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition shrink-0"
            >
              <FiEdit2 size={14} /> Edit Profile
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
          {[
            { key: "info", label: "Profile Info" },
            { key: "password", label: "Password" },
            { key: "orders", label: "Order History" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                if (t.key !== "info") setEditing(false);
              }}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
                tab === t.key
                  ? "border-[#dcb458] text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile Info */}
        {tab === "info" && (
          <div className="max-w-md">
            {!editing ? (
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Name</p>
                  <p className="text-sm font-medium">{user.userName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                  <p className="text-sm font-medium">{user.phone || "Not set"}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.userName}
                    onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                    required
                  />
                </div>

                {infoError && <p className="text-sm text-red-500">{infoError}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={infoStatus === "saving"}
                    className="bg-[#dcb458] hover:bg-[#c9a24d] text-black rounded-full px-6 py-2.5 text-sm font-semibold transition disabled:opacity-60"
                  >
                    {infoStatus === "saving" ? "Saving..." : infoStatus === "saved" ? "Saved ✓" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="border border-gray-300 rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Password */}
        {tab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#dcb458]"
                required
                minLength={6}
              />
            </div>

            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

            <button
              type="submit"
              disabled={passwordStatus === "saving"}
              className="bg-[#dcb458] hover:bg-[#c9a24d] text-black rounded-full px-6 py-2.5 text-sm font-semibold transition disabled:opacity-60"
            >
              {passwordStatus === "saving" ? "Updating..." : passwordStatus === "saved" ? "Updated ✓" : "Change Password"}
            </button>
          </form>
        )}

        {/* Order History */}
        {tab === "orders" && (
          <div>
            {ordersLoading ? (
              <p className="text-sm text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border border-gray-200 rounded-xl p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs text-gray-500">
                        Order #{order._id.slice(-8).toUpperCase()} · {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.orderStatus] || "bg-gray-100 text-gray-700"}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="space-y-1 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-gray-600">
                          <span>
                            {item.product?.name || "Product"} × {item.quantity}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-3">
                      <span>Total</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      <WishlistSidebar />
    </div>
  );
}

export default Profile;