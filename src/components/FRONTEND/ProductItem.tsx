import React, { useContext } from "react";
import Button from "./Button";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import { useCart } from "@/context/LikedProducts";
import { Product } from "@/interface/Product";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { cartItemCount, cartItems, addItemToCart, removeItemFromCart } =
    useCart();

  const AddItemToCart = () => {
    const Product = {
      product,
      quantity: 1,
    };
    addItemToCart(Product);
  };

  return (
    <div className="relative w-64 bg-white shadow-md rounded-md overflow-hidden group">
      {/* Product Image */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Discount Badge (if applicable) */}
      {product.price && (
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
          <div className="text-xl px-2 flex items-center justify-center rounded-md hover:text-white hover:bg-darkGreen cursor-pointer text-darkGreen border border-darkGreen">
            <ThumbUpOffAltRoundedIcon fontSize="inherit" />
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute scale-75 rounded-md hidden inset-0 group-hover:scale-100 bg-black bg-opacity-70 lg:flex flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          type="fill"
          className="text-white text-sm hover:!text-white hover:!outline-white font-poppins font-medium"
          text="Buy now"
        />
        <div className="flex space-x-4 text-white">
          <button onClick={AddItemToCart} className="hover:text-gray-300">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
