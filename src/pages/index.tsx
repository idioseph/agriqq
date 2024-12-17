import Hero from "@/components/FRONTEND/HomePage/Hero";
import News from "@/components/FRONTEND/HomePage/News";
import Products from "@/components/FRONTEND/HomePage/Products";
import { Product } from "@/interface/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async (): Promise<void> => {
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
    }
  };
  return (
    <div className="font-montserrat">
      <section>
        <Hero />
      </section>
      <section>
        <Products products={products} />
      </section>
      <section>
        <News />
      </section>
    </div>
  );
}
