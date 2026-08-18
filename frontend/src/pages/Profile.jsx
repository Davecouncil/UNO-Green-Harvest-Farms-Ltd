import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import * as userService from "../services/userService";
import * as orderService from "../services/orderService";
import { FiEdit2, FiCamera, FiLock } from "react-icons/fi";
import {Link} from "react-router-dom";

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
  const { user, token, updateStoredUser, logoutUser } = useAuth();
  const [tab, setTab] = useState("orders");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({ userName: "", email: "", phone: "" });
  const [infoStatus, setInfoStatus] = useState("idle");
  const [infoError, setInfoError] = useState("");

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordStatus, setPasswordStatus] = useState("idle");
  const [passwordError, setPasswordError] = useState("");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const tabSectionRef = useRef(null);

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

    if (token) loadOrders();
  }, [token]);

  const scrollToTabSection = () => {
    tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEditProfileClick = () => {
    setTab("info");
    setEditing(true);
    scrollToTabSection();
  };

  const handleChangePasswordClick = () => {
    setTab("password");
    scrollToTabSection();
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoStatus("saving");
    setInfoError("");
    try {
      const updated = await userService.updateProfile(form, token);
      updateStoredUser(updated);
      setInfoStatus("saved");
      setTimeout(() => {
        setInfoStatus("idle");
        setEditing(false);
        setTab("orders"); // return to default view after saving
      }, 1000);
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
    setTab("orders");
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
      setTimeout(() => {
        setPasswordStatus("idle");
        setTab("orders"); // return to default view after saving
      }, 1000);
    } catch (error) {
      setPasswordError(error.response?.data?.message || "Failed to change password.");
      setPasswordStatus("error");
    }
  };

  const handleCancelPassword = () => {
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setTab("orders");
  };

  if (!user) {
    return (
      <div className="pt-20 sm:pt-24 max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500 text-sm">
        Please log in to view your profile.
      </div>
    );
  }

  const recentOrders = orders.slice(0, 2);

  return (
    <div className="pt-20 sm:pt-24 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Top header row: avatar/name (left) + personal details card (right) */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* Avatar + name card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="relative shrink-0 mb-4">
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

          <h1 className="font-dm text-xl">{user.userName}</h1>
          {user.createdAt && (
            <p className="text-xs text-gray-400 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric" })}
            </p>
          )}
          {/* <span className="mt-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            🌱 Seedling Tier
          </span> */}

          <button
            onClick={handleChangePasswordClick}
            className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition"
          >
            <FiLock size={12} /> Change Password
          </button>
        </div>

        {/* Personal details card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-dm text-lg">Personal Details</h2>
            <button
              onClick={handleEditProfileClick}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition"
            >
              <FiEdit2 size={12} /> Edit
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Full Name</p>
              <p className="text-sm font-medium">{user.userName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Email Address</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Phone</p>
              <p className="text-sm font-medium">{user.phone || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Impact + Subscription status row */}
      {/* <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0f2b0a] text-white rounded-2xl p-6">
          <h2 className="font-dm text-lg mb-4">Sustainability Impact</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Produce Rescued</span>
              <span className="font-semibold">142 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Carbon Offset</span>
              <span className="font-semibold">85 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Local Farms Supported</span>
              <span className="font-semibold">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl shrink-0">
            🌾
          </div>
          <div className="flex-1 w-full">
            <p className="font-dm text-base mb-1">Seedling Tier Active</p>
            <p className="text-xs text-gray-500 mb-3">
              Your next harvest box is scheduled for delivery on Friday.
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
              <div className="bg-[#2D7A0F] h-2 rounded-full" style={{ width: "60%" }} />
            </div>
            <p className="text-xs text-gray-400">30 points to Sapling Tier</p>
          </div>
          <button className="border border-gray-300 rounded-full px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition shrink-0">
            Manage Subscription
          </button>
        </div>
      </div> */}

      {/* Recent Harvests — real order data */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="font-dm text-lg mb-4">Recent Harvests</h2>

        {ordersLoading ? (
          <p className="text-sm text-gray-500">Loading orders...</p>
        ) : recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">${order.totalPrice.toFixed(2)}</p>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      STATUS_COLORS[order.orderStatus] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section — only "Order History" is a normal visible tab;
          "info" and "password" only appear when triggered via Edit / Change Password above */}
      <div ref={tabSectionRef} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">

        {tab !== "orders" && (
          <div className="flex gap-2 border-b border-gray-200 mb-6 sm:mb-8">
            <span className="px-4 py-2.5 text-sm font-semibold border-b-2 border-[#dcb458] text-black">
              {tab === "info" ? "Edit Profile" : "Change Password"}
            </span>
          </div>
        )}

        {tab === "orders" && (
          <>
            <div className="flex gap-2 border-b border-gray-200 mb-6 sm:mb-8">
              <span className="px-4 py-2.5 text-sm font-semibold border-b-2 border-[#dcb458] text-black">
                Order History
              </span>
            </div>

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
          </>
        )}

        {/* Profile Info — only visible when Edit was tapped */}
        {tab === "info" && editing && (
          <div className="max-w-md">
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
          </div>
        )}

        {/* Password — only visible when "Change Password" was tapped */}
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

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={passwordStatus === "saving"}
                className="bg-[#dcb458] hover:bg-[#c9a24d] text-black rounded-full px-6 py-2.5 text-sm font-semibold transition disabled:opacity-60"
              >
                {passwordStatus === "saving" ? "Updating..." : passwordStatus === "saved" ? "Updated ✓" : "Change Password"}
              </button>
              <button
                type="button"
                onClick={handleCancelPassword}
                className="border border-gray-300 rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <button

          onClick={logoutUser}
          className="mt-8 bg-[#dcb458] hover:bg-[#c9a24d] text-black rounded-full px-6 py-2.5 text-sm font-semibold transition"
        >
          <Link
          to="/login">
          Log Out
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Profile;