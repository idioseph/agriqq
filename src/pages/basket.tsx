import React from 'react';
import { useLikedProducts } from '@/context/LikedProducts';
import ProductItem from '@/components/FRONTEND/ProductItem';

const BasketPage = () => {
  const { likedItems } = useLikedProducts();
  
  return (
    <div className='md:px-24 px-10 gap-5 flex flex-col sm:px-14 py-20 bg-white min-h-screen'>
      <h2 className='text-2xl font-semibold text-darkGreen'>Liked Products</h2>
      {likedItems.length > 0 ? (
        <div className='flex flex-wrap gap-4 justify-center'>
          {likedItems.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center text-gray-500 mt-10'>
          No liked products yet
        </div>
      )}
    </div>
  );
};

export default BasketPage; 