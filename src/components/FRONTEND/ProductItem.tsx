import React, { useContext } from "react";
import Button from "./Button";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Product } from "@/interface/Product";
import Image from "next/image";
import { useLikedProducts } from "@/context/LikedProducts";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { isLiked, addToLiked, removeFromLiked } = useLikedProducts();

  const toggleLike = () => {
    if (isLiked(product._id)) {
      removeFromLiked(product._id);
    } else {
      addToLiked(product);
    }
  };

  // Common classes for like button
  const likeButtonClasses = `
    transition-all duration-300 ease-in-out
    flex items-center gap-2 rounded-md cursor-pointer
    hover:scale-105 active:scale-95
  `;

  const mobileLikeButton = `
    ${likeButtonClasses}
    text-xl px-3 py-2 border
    ${isLiked(product._id)
      ? 'bg-darkGreen text-white border-darkGreen'
      : 'text-darkGreen border-darkGreen hover:bg-darkGreen/10'}
  `;

  const desktopLikeButton = `
    ${likeButtonClasses}
    text-white px-4 py-2
    ${isLiked(product._id)
      ? 'bg-darkGreen hover:bg-darkGreen/90'
      : 'bg-gray-600/80 hover:bg-gray-600'}
  `;

  return (
    <div className="relative w-64 bg-white shadow-md rounded-md overflow-hidden group">
      {/* Product Image */}
      <Image
        height={100}
        width={100}
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Discount Badge (if applicable) */}
      {product.price && (Math.round(((product.price - product.price) / product.price) * 100) != 0) && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          -{Math.round(((product.price - product.price) / product.price) * 100)}
          %
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg text-black font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            ₦ {product.price || product.price}
          </p>
          {/* {product.price && (
            <p className="text-sm text-gray-400 line-through">₦ {product.price}</p>
          )} */}
        </div>
        <div className="mt-2 lg:hidden gap-2 flex">
          <Button text="Buy now" className="w-full !font-medium" type="fill" />
          <div onClick={toggleLike} className={mobileLikeButton}>
            {isLiked(product._id) ? (
              <ThumbUpIcon fontSize="inherit" className="animate-bounce" />
            ) : (
              <ThumbUpOffAltIcon fontSize="inherit" />
            )}
          </div>
        </div>
      </div>

      {/* Desktop Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 lg:flex hidden flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          type="fill"
          className="text-white text-sm hover:!text-white hover:!outline-white font-poppins font-medium"
          text="Buy now"
        />
        <button 
          onClick={toggleLike} 
          className={desktopLikeButton}
        >
          {isLiked(product._id) ? (
            <>
              <ThumbUpIcon className="animate-bounce" />
              <span>Liked</span>
            </>
          ) : (
            <>
              <ThumbUpOffAltIcon />
              <span>Like</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
