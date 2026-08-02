import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import * as cartService from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token, user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Load the cart whenever the user logs in; clear it when they log out
  useEffect(() => {
    if (!token) {
      setCart(null);
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await cartService.getCart(token);
        setCart(data);
      } catch (error) {
        // A 404 here just means "cart doesn't exist yet" — not a real error
        setCart(null);
      }
    };

    fetchCart();
  }, [token]);

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      throw new Error("You must be logged in to add items to your cart.");
    }

    setLoading(true);
    try {
      const updatedCart = await cartService.addToCart(productId, quantity, token);
      setCart(updatedCart);
      return updatedCart;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const updatedCart = await cartService.updateCartItem(productId, quantity, token);
    setCart(updatedCart);
  };

  const removeItem = async (productId) => {
    const updatedCart = await cartService.removeFromCart(productId, token);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    const updatedCart = await cartService.clearCart(token);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}