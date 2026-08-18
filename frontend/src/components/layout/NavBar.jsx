import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import{useAuth} from "../../hooks/useAuth"

// const {user} = useAuth()

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const {user} = useAuth()


  const isHome = location.pathname === "/";
  const solid = isMobile || scrolled || menuOpen || !isHome; 

  console.log("pathname:", location.pathname, "isHome:", isHome, "solid:", solid);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); 
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        solid ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex gap-4 items-center justify-between">

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/logo1 (1).png"
            alt="UNO Green Harvest"
            className={`transition-all duration-500 object-contain ${
              solid ? "w-14" : "w-16"
            }`}
          />
        </NavLink>

        <ul className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    isActive
                      ? "bg-gray-100 text-[#dcb458]"
                      : solid
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

        <div className="flex items-center gap-3 sm:gap-5 text-lg">
          {/* <button
            className={`hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 rounded-full p-2 ${
              solid ? "text-gray-800" : "text-white"
            }`}
          >
            <FiSearch />
          </button> */}
          {!user && (
            <>            <NavLink 
            to="/login"
            className={`text-sm font-semibold hover:text-[#dcb458] transition ${solid? "text-gray-800":"text-white"}`}>
              Login
            </NavLink>
            <NavLink
            to="/signup"
             className={`text-sm font-semibold hover:text-[#dcb458] transition ${solid? "text-gray-800":"text-white"}`}
            > Signup</NavLink>
            </>

          )}
          

          <NavLink
            to="/profile"
            className={`hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 rounded-full p-2 ${
              solid ? "text-gray-800" : "text-white"
            }`}
          >
            <FiUser />
          </NavLink>

          <NavLink
            to="/cart"
            className={`relative hover:text-[#dcb458] transition hover:scale-110 hover:bg-white/10 hover:rounded-full p-2 ${
              solid ? "text-gray-800" : "text-white"
            }`}
          >
            <FiShoppingCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#dcb458] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>

          <button
            className={`lg:hidden text-2xl p-1 ${solid ? "text-gray-800" : "text-white"}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${
          menuOpen ? "max-h-125 shadow-md" : "max-h-0"
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