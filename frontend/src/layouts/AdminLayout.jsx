import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiPlusCircle, FiBox, FiUser, FiShoppingCart, FiBarChart, FiMenu, FiX } from "react-icons/fi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { name: "Add Product", path: "/admin/add-product", icon: <FiPlusCircle /> },
    { name: "Inventory", path: "/admin/inventory", icon: <FiBox /> },
    { name: "Users", path: "/admin/users", icon: <FiUser /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
    { name: "Analytics", path: "/admin/analytics", icon: <FiBarChart /> },
  ];

  return (
    <div className="min-h-screen flex">

      {/* Mobile overlay — click to close sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`w-60 bg-white border-r border-gray-200 flex flex-col h-screen z-40
          fixed top-0 left-0 transition-transform duration-300
          lg:sticky lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <img src="/images/logo1.png" alt="Logo" className="h-15 w-19" />
          <button
            className="lg:hidden text-gray-500 text-xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <p className="px-6 pt-5 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Management
        </p>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2D7A0F] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Mobile top bar with hamburger */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-20">
          <img src="/images/logo1.png" alt="Logo" className="h-10 w-auto" />
          <button
            className="text-gray-600 text-2xl"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}