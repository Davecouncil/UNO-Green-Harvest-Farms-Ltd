import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiPlusCircle, FiBox, FiUser, FiShoppingCart, FiBarChart, } from "react-icons/fi";

export default function AdminLayout() {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { name: "Add Product", path: "/admin/add-product", icon: <FiPlusCircle /> },
    { name: "Inventory", path: "/admin/inventory", icon: <FiBox /> },
    {name: "Users", path: "/admin/users", icon: <FiUser />},
    {name: "Orders", path: "/admin/orders", icon: <FiShoppingCart />},
    {name: "Analytics", path: "/admin/analytics", icon: <FiBarChart />},
    {name: "Edit Products", path: "/admin/edit-product", icon: <FiBox/>}
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="px-6 py-4 border-b border-gray-100">
            <img src="/images/logo1.png" alt="Logo" 
            className=" h-15 w-19 "
            />
        </div>

        <p className="px-6 pt-5 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Management
        </p>

        <nav className="flex-1 px-3 space-y-1 ">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5  rounded-lg text-sm font-medium transition ${
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

      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}