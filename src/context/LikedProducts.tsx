import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { showToastSuccess, showToastError, showToastWarning, showToastInfo } from "@/utils/toastFunctions";
import { Product } from "@/interface/Product";

interface LikedProductsContextType {
  likedItems: Product[];
  addToLiked: (product: Product) => void;
  removeFromLiked: (productId: string) => void;
  isLiked: (productId: string) => boolean;
}

const LikedProductsContext = createContext<LikedProductsContextType | undefined>(undefined);

export function LikedProductsProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<Product[]>([]);

  // Load liked items from localStorage on mount
  useEffect(() => {
    const savedLikedItems = localStorage.getItem('likedProducts');
    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }
  }, []);

  // Save to localStorage whenever likedItems changes
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedItems));
  }, [likedItems]);

  const addToLiked = (product: Product) => {
    setLikedItems(prev => {
      if (!prev.some(item => item._id === product._id)) {
        showToastSuccess(`${product.name} added to favorites!`);
        return [...prev, product];
      }
      showToastWarning(`${product.name} is already in favorites!`);
      return prev;
    });
  };

  const removeFromLiked = (productId: string) => {
    setLikedItems(prev => {
      const product = prev.find(item => item._id === productId);
      const filtered = prev.filter(item => item._id !== productId);
      if (product) {
        showToastInfo(`${product.name} removed from favorites`);
      }
      return filtered;
    });
  };

  const isLiked = (productId: string) => {
    return likedItems.some(item => item._id === productId);
  };

  return (
    <LikedProductsContext.Provider value={{ likedItems, addToLiked, removeFromLiked, isLiked }}>
      {children}
    </LikedProductsContext.Provider>
  );
}

export const useLikedProducts = () => {
  const context = useContext(LikedProductsContext);
  if (!context) {
    throw new Error('useLikedProducts must be used within a LikedProductsProvider');
  }
  return context;
};
