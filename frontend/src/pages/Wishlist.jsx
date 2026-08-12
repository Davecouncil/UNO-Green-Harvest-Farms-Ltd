import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { useState } from "react";

function WishlistSidebarItem({ product }) {
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [removing, setRemoving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await toggleWishlist(product._id);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    } finally {
      setRemoving(false);
    }
  };

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-none">
      <Link to={`/products/${product._id}`} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 rounded-lg object-cover bg-gray-100"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${product._id}`}>
          <h4 className="text-sm font-medium truncate hover:text-[#D69B06] transition">
            {product.name}
          </h4>
        </Link>
        <p className="text-sm font-bold text-black mb-2">${product.price}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#dcb458] hover:bg-[#c9a24d] text-black"
            }`}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : added ? (
              "Added ✓"
            ) : (
              <>
                <FiShoppingCart size={12} /> Add
              </>
            )}
          </button>

          <button
            onClick={handleRemove}
            disabled={removing}
            aria-label="Remove from wishlist"
            className="text-gray-400 hover:text-red-500 transition disabled:opacity-60"
          >
            <FiHeart size={14} className="fill-red-500 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

function WishlistSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useWishlist();
  const products = wishlist?.products || [];

  return (
    <>
      {/* Floating toggle button — remove/move this if you already have a wishlist icon elsewhere (e.g. Navbar) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-200 shadow-md rounded-full p-3 hover:scale-105 transition"
        aria-label="Open wishlist"
      >
        <FiHeart className="text-red-500" size={18} />
        {products.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#2D7A0F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {products.length}
          </span>
        )}
      </button>

      {/* Dark overlay behind the drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white z-50
          shadow-xl transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-dm text-lg">My Wishlist</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{products.length}</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close wishlist"
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                <FiX />
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <FiHeart size={24} className="mx-auto text-gray-300 mb-3" />
              <p className="text-xs text-gray-500 mb-4">No items saved yet.</p>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-[#dcb458] hover:bg-[#c9a24d] text-black rounded-full px-4 py-2 text-xs font-semibold transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="mt-2 flex-1 overflow-y-auto pr-1">
              {products.map((product) => (
                <WishlistSidebarItem key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WishlistSidebar;