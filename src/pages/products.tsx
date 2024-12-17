import ProductItem from "@/components/FRONTEND/ProductItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Product } from "@/interface/Product";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const ProductsPage: NextPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/all-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-36">
      {products && products?.length > 0 && !loading ? (
        <div className="flex justify-center flex-wrap gap-4">
          {products?.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center text-darkGreen justify-center">
          {loading ? <LoadingSpinner /> : "No products found"}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
