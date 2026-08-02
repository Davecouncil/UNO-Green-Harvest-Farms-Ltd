import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
        scrolled || menuOpen
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex gap-4 items-center justify-between">

        {/* ================= Logo ================= */}

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/logo1.png"
            alt="UNO Green Harvest"
            className={`transition-all duration-500 object-contain ${
              scrolled || menuOpen ? "w-14" : "w-16"
            }`}
          />
        </NavLink>

        {/* ================= Desktop Navigation ================= */}

        <ul className="hidden lg:flex items-center gap-2">

          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    isActive
                      ? "bg-gray-100 text-[#dcb458]"
                      : scrolled
                      ? "text-gray-800 hover:text-[#dcb458]"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

        </ul>

        {/* ================= Icons (visible on all screen sizes) ================= */}

        <div
          className={`flex items-center gap-3 sm:gap-5 text-lg transition-colors duration-300 ${
            scrolled || menuOpen ? "text-gray-800" : "text-white"
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

          {/* ============= Mobile Menu Toggle ============= */}

          <button
            className="lg:hidden text-2xl p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </div>

      {/* ================= Mobile Slide-Down Menu ================= */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${
          menuOpen ? "max-h-[500px] shadow-md" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-gray-100 last:border-none">
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-sm font-semibold ${
                    isActive ? "text-[#dcb458]" : "text-gray-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </header>
  );
};

export default Navbar;