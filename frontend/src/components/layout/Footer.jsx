import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { RiPinterestFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Footer() {
  const socialLinks = [
    { icon: FiFacebook, href: "#" },
    { icon: FiInstagram, href: "#" },
    { icon: FiTwitter, href: "#" },
    { icon: FiYoutube, href: "#" },
    { icon: FiMail, href: "#" },
  ];

  return (
    <footer className="bg-[#022B00] w-full max-w-full overflow-x-hidden text-white mt-10">
      {/* Top */}
      <div className="w-full max-w-full mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="min-w-0">
          <img
            src="/images/logo1 (1).png"
            alt="UNO"
            className="w-12 max-w-full bg-white rounded-md p-1 mb-4"
          />

          <p className="text-sm text-gray-300 leading-6 max-w-xs mb-5 break-words">
            Fresh organic produce from our family farm to your family table.
            Sustainably grown, harvested at peak ripeness, delivered with
            care.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a key={index}
                href={href}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="min-w-0">
          <h3 className="font-dm text-lg mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/about" className="hover:text-[#D69B06] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/farms" className="hover:text-[#D69B06] transition-colors">
                Our Farms
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#D69B06] transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/smart-farming" className="hover:text-[#D69B06] transition-colors">
                Smart Farming
              </Link>
            </li>
            <li>
              <Link to="/sustainability" className="hover:text-[#D69B06] transition-colors">
                Sustainability
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#D69B06] transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="min-w-0">
          <h3 className="font-dm text-lg mb-4">Support</h3>

          <ul className="space-y-2 text-sm text-gray-300">
            {[
              "FAQs",
              "Order Info",
              "Returns & Refunds",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#D69B06] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="min-w-0">
          <h3 className="font-dm text-lg mb-4">Stay in the Loop</h3>

          <p className="text-sm text-gray-300 leading-6 mb-4 break-words">
            Subscribe for weekly harvest updates, recipes, and exclusive
            offers.
          </p>

          <div className="flex flex-col sm:flex-row w-full max-w-full">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 min-w-0 w-full text-sm bg-[#1C3815] border border-[#36542A] px-4 py-2.5 outline-none placeholder:text-gray-400 rounded-lg sm:rounded-r-none"
            />

            <button className="bg-[#D69B06] hover:bg-[#C38D04] px-5 py-2.5 text-sm font-semibold transition whitespace-nowrap rounded-lg sm:rounded-l-none mt-2 sm:mt-0 shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#21491A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>© 2026 UNO Green Harvest Farms Ltd. All rights reserved.</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <div className="flex items-center gap-2">
              <FiPhone className="text-[#D69B06]" />
              <span>+1 (555) 234-5678</span>
            </div>

            <div className="flex items-center gap-2">
              <FiMail className="text-[#D69B06]" />
              <span>hello@unogreenharvest.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;