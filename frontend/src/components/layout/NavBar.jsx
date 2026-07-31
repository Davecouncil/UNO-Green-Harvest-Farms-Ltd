import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Farms", path: "/farms" },
    { name: "Products", path: "/products" },
    { name: "Smart Farming", path: "/smart-farming" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-fit px-4  flex  gap-4 items-center justify-between">

        {/* ================= Logo ================= */}

        <NavLink to="/">
          {/* Replace with your own logo */}
          <img
            src="/images/logo1.png"
            alt="UNO Green Harvest"
            className={`transition-all duration-500 object-contain ${
              scrolled ? "w-16" : "w-20"
            }`}
          />
        </NavLink>

        {/* ================= Navigation ================= */}

        <ul className="hidden lg:flex items-center gap-2">

          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 px-4 py-2 rounded-lg text-sm font-semibold ${
                    isActive
                      ? "bg-grey-300 text-[#dcb458] "
                      : scrolled
                      ? "text-gray-800 hover:text-[#dcb458] "
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

        </ul>

        {/* ================= Right Icons ================= */}

        <div
          className={`hidden lg:flex items-center gap-7 text-xl transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >

          <button className="hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 rounded-full p-2">
            <FiSearch />
          </button>

          <NavLink
            to="/profile"
            className="hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 rounded-full p-2"
          >
            <FiUser />
          </NavLink>

          <NavLink
            to="/cart"
            className="relative hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 hover:rounded-full p-2"
          >
            <FiShoppingCart />

            <span className="absolute -top-2 -right-2 bg-[#dcb458] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>

          </NavLink>

        </div>

        {/* ================= Mobile Menu ================= */}

        <button
          className={`lg:hidden text-3xl transition ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <FiMenu />
        </button>

      </div>
    </header>
  );
};

export default Navbar;