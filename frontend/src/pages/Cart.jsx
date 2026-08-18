import { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import Button from "../components/ui/Button";
import WishlistSidebar from "../pages/Wishlist";
import { FiHeart } from "react-icons/fi";


export default function Cart() {
  const navigate = useNavigate();
  const { cart, itemCount, loading, updateQuantity, removeItem, clearCart } = useCart();
  const { wishlist } = useWishlist();
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const items = cart?.items || [];
  const wishlistCount = wishlist?.products?.length || 0;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleDecrease = (productId, currentQty) => {
    if (currentQty <= 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const handleIncrease = (productId, currentQty) => {
    updateQuantity(productId, currentQty + 1);
  };
  const handleClearCart = () => {
  const confirmed = window.confirm("Clear your entire cart? This cannot be undone.");
  if (!confirmed) return;
  clearCart();
};

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen pt-28 sm:pt-32 flex flex-col items-center justify-center px-4">
        <div
          className="hidden lg:block fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cart-bg (1).png')" }}
        />
        <div className="bg-white rounded-2xl shadow-lg px-6 sm:px-10 py-10 sm:py-12 flex flex-col items-center text-center">
          <p className="font-dm text-xl sm:text-2xl text-gray-800 mb-2">Your cart is empty</p>
          <p className="text-gray-500 text-sm mb-6">Browse our products and find something fresh.</p>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Start Shopping
          </Button>
        </div>

        <WishlistSidebar isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="hidden lg:block fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cart-bg (1).png')" }}
      />

      <div className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">

          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="font-dm text-2xl sm:text-3xl text-gray-900">
              Your Cart ({itemCount})
            </h1>

            <button
              onClick={() => setWishlistOpen(true)}
              className="relative bg-white border border-gray-200 shadow-sm rounded-full p-2.5 hover:scale-105 transition"
              aria-label="Open wishlist"
            >
              <FiHeart className="text-red-500 animate-pulse" size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2D7A0F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = item.product;
                if (!product) return null;

                return (
                  <div
                    key={product._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border border-gray-200 rounded-xl p-3 sm:p-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Link to={`/products/${product._id}`} className="shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="font-dm text-sm sm:text-base text-gray-900 truncate">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mt-0.5">
                          ${product.price} <span className="text-xs">{product.unit}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:gap-4 sm:justify-end sm:flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrease(product._id, item.quantity)}
                          disabled={loading}
                          className="w-8 h-8 shrink-0 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(product._id, item.quantity)}
                          disabled={loading}
                          className="w-8 h-8 shrink-0 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900 w-16 text-right shrink-0 text-sm sm:text-base">
                        ₦{(product.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(product._id)}
                        className="text-gray-400 hover:text-red-600 text-xs transition shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0f2b0a] text-white rounded-xl p-5 sm:p-6 lg:sticky lg:top-32">
                <h2 className="font-dm text-lg mb-4">Order Summary</h2>

                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₦{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Shipping & taxes calculated at checkout</p>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WishlistSidebar isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </div>
  );
}