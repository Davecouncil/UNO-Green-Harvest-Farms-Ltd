import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import * as wishlistService from "../services/wishlistService";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    if (!token) {
      setWishlist(null);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const data = await wishlistService.getWishlist(token);
        setWishlist(data);
      } catch (error) {
        setWishlist(null); 
      }
    };

    fetchWishlist();
  }, [token]);

  const isInWishlist = (productId) => {
    return wishlist?.products?.some((p) => p._id === productId) || false;
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      throw new Error("You must be logged in to use your wishlist.");
    }

    if (isInWishlist(productId)) {
      const updated = await wishlistService.removeFromWishlist(productId, token);
      setWishlist(updated);
    } else {
      const updated = await wishlistService.addToWishlist(productId, token);
      setWishlist(updated);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}