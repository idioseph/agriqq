import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { showToastSuccess } from "@/utils/toastFunctions";
import { Product } from "@/interface/Product";

export interface Cart {
  product: Product;
  quantity: number;
}
interface CartContextType {
  cartItemCount: number;
  cartItems: Cart[];
  addItemToCart: (item: Cart) => void;
  removeItemFromCart: (item: Cart) => void;
  clearCart: () => void;
  getCartItems: () => Cart[];
}

// Create the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("agriqq_cart") || "[]"
    );
    setCartItems(storedCartItems);
    setCartItemCount(storedCartItems.length);
  }, []);

  const addItemToCart = (item: Cart) => {
    // Remove the item if it already exists in the cart
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.product._id !== item.product._id
    );

    // Adding the new Item to cart
    updatedCartItems.push(item);

    // Here I am updating the state and localStorage with the new Product's Cart Item
    setCartItems(updatedCartItems);
    setCartItemCount(updatedCartItems.length);
    localStorage.setItem("agriqq_cart", JSON.stringify(updatedCartItems));

    showToastSuccess("Product Added to Liked products");
  };

  const removeItemFromCart = (item: Cart) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem?.product?._id !== item?.product?._id
    );
    setCartItems(updatedCartItems);
    setCartItemCount(updatedCartItems.length);
    localStorage.setItem("agriqq_cart", JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartItemCount(0);
    localStorage.removeItem("agriqq_cart");
  };

  const getCartItems = (): Cart[] => {
    return JSON.parse(localStorage.getItem("agriqq_cart") || "[]");
  };

  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        getCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
