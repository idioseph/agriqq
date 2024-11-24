import React from "react";
import Button from "./Button";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";

interface ProductItemProps {
  image: string; // Image URL
  name: string; // Product name
  description: string; // Product description
  price: number; // Product price
  discountPrice?: number; // Optional discount price
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  name,
  description,
  price,
  discountPrice,
}) => {
  return (
    <div className="relative w-64 bg-white shadow-md rounded-md overflow-hidden group">
      {/* Product Image */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {/* Discount Badge (if applicable) */}
      {discountPrice && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          -{Math.round(((price - discountPrice) / price) * 100)}%
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg text-black font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            ₦ {discountPrice || price}
          </p>
          {discountPrice && (
            <p className="text-sm text-gray-400 line-through">₦ {price}</p>
          )}
        </div>
        <div className="mt-2 lg:hidden gap-2 flex">
          <Button
            text="Add to Cart"
            className="w-full !font-bold"
            type="fill"
          />
          <div className="text-2xl px-2 rounded-md hover:text-white hover:bg-darkGreen cursor-pointer text-darkGreen border border-darkGreen">
            <ThumbUpOffAltRoundedIcon fontSize="inherit" />
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute scale-75 rounded-md hidden inset-0 group-hover:scale-100 bg-black bg-opacity-70 lg:flex flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          text="Add to Cart"
          className="!bg-lightGreen !font-bold hover:!bg-darkGreen"
          type="outline"
        />
        <div className="flex space-x-4 text-white">
          <button className="hover:text-gray-300">Share</button>
          <button className="hover:text-gray-300">Compare</button>
          <button className="hover:text-gray-300">Like</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
