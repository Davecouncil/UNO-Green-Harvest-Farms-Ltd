import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { FiHeart, FiMinus, FiPlus, FiMapPin, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";


function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("idle"); // idle | loading | inCart | removing | error
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [heartPop, setHeartPop] = useState(false);
  const [cartPop, setCartPop] = useState(false);

  const { addToCart, removeItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCartAction = async () => {
    if (status === "inCart") {
      setStatus("removing");
      try {
        await removeItem(product._id);
        setStatus("idle");
        setCartPop(true);
        setTimeout(() => setCartPop(false), 300);
      } catch (error) {
        console.error("Remove from cart failed:", error);
        setStatus("error");
        setTimeout(() => setStatus("inCart"), 1500);
      }
      return;
    }

    // currently idle -> add it
    setStatus("loading");
    try {
      await addToCart(product._id, quantity);
      setStatus("inCart");
      setCartPop(true);
      setTimeout(() => setCartPop(false), 300);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  const handleToggleWishlist = async () => {
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 300);

    setWishlistLoading(true);
    try {
      await toggleWishlist(product._id);
    } catch (error) {
      console.error("Wishlist update failed:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500 text-sm">
  //       Loading product...
  //     </div>
  //   );
  // }
    if (loading) {
      return (
        <div className="flex items-center h-screen justify-center "><Loader/></div>
       )
    }

  if (!product) {
    return (
      <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500 text-sm">
        Product not found.
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);

  return (
    <div className="pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#D69B06] transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link to="/products" className="hover:text-[#D69B06] transition-colors">
            Products
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">

          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover rounded-2xl bg-gray-100"
            />

            <button
              onClick={handleToggleWishlist}
              disabled={wishlistLoading}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={inWishlist}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiHeart
                size={16}
                className={`sm:hidden transition-all duration-200 ${
                  heartPop ? "scale-125" : "scale-100"
                } ${
                  inWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
              <FiHeart
                size={18}
                className={`hidden sm:block transition-all duration-200 ${
                  heartPop ? "scale-125" : "scale-100"
                } ${
                  inWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>
          </div>

          {/* Details */}
          <div>

            <p className="uppercase text-xs tracking-wider text-gray-500 mb-2">
              {product.category}
            </p>

            <h1 className="font-dm text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
              {product.name}
            </h1>

            <div className="mb-4 sm:mb-5">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                ${product.price}
              </span>
              <span className="text-sm text-gray-400 ml-1">
                {product.unit}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-6 mb-5 sm:mb-6">
              {product.description}
            </p>

            {/* Badges */}
            {product.badges?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Origin */}
            {product.origin && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FiMapPin className="text-[#D69B06] shrink-0" size={14} />
                <span>
                  Origin: <span className="font-medium text-black">{product.origin}</span>
                </span>
              </div>
            )}

            <p className="flex items-center gap-2 text-sm text-gray-500 mb-5 sm:mb-6">
              {product.stock > 0 ? (
                <>
                  <FiCheckCircle className="text-green-700 shrink-0" size={14} />
                  <span className="text-green-700 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>

            {/* Quantity + Add/Remove Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">

              <div className="flex items-center justify-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-gray-600 hover:text-black transition"
                >
                  <FiMinus size={14} />
                </button>

                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2.5 text-gray-600 hover:text-black transition"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <div
                className={`flex-1 transition-transform duration-200 ${
                  cartPop ? "scale-105" : "scale-100"
                }`}
              >
                <Button
                  onClick={handleCartAction}
                  loading={status === "loading" || status === "removing"}
                  disabled={product.stock === 0 && status !== "inCart"}
                  variant={status === "inCart" ? "secondary" : "primary"}
                  className="w-full sm:w-auto"
                >
                  {status === "inCart" ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiTrash2 size={16} /> Remove from Cart
                    </span>
                  ) : status === "error" ? (
                    "Failed — Try Again"
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;