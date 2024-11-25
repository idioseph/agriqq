import AccountNavigation from "@/components/DASHBOARD/AccountNavigation";
import { useCart } from "@/context/LikedProducts";
import { NextPage } from "next";
import Cookies from "js-cookie";
import { FormEvent, useEffect, useState } from "react";
import { ObjectId } from "mongoose";
import Dialog from "@mui/material/Dialog";
import AddProductModal from "@/components/DASHBOARD/AddProductModal";
import Button from "@/components/FRONTEND/Button";
import { Product } from "@/interface/Product";
import ProductItem from "@/components/FRONTEND/ProductItem";

interface Props {}

interface UserProfileProp {
  firstname: string;
  lastname: string;
  email: string;
  role: "farmer" | "buyer";
  profileImage?: string;
  farmName?: string;
  farmerContact?: string;
  farmAddress?: string;
  joinedDate: Date;
  farmDescription?: string;
  _id: ObjectId;
}

const Index: NextPage<Props> = ({}) => {
  const { cartItemCount, cartItems, addItemToCart, removeItemFromCart } =
    useCart();
  const token = Cookies.get("token");
  const [profile, setProfile] = useState<UserProfileProp | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetchProfile();
    fetchUserProducts();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/account/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data.user);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const createProduct = async (formData: {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
  }): Promise<void> => {
    try {
      const response = await fetch("/api/product/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsDialogOpen(false);
        alert("Product created successfully!");
        console.log("Created product:", data.product);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An unexpected error occurred.");
    }
  };

  const fetchUserProducts = async (): Promise<void> => {
    try {
      const response = await fetch("/api/product/my-products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
      } else {
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleSubmit = (product: any) => {
    console.log(product);
    createProduct(product);
    fetchUserProducts();
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-10 py-36 md:px-36 px-10 sm:px-16 bg-white">
      <div className="">
        <AccountNavigation />
      </div>
      {profile?.role === "buyer" &&
        (cartItems.length > 0 ? (
          <div className="flex justify-center flex-wrap gap-4">
            {cartItems?.map((product, index) => (
              <ProductItem product={product.product} key={index} />
            ))}
          </div>
        ) : (
          <h4 className="text-center font-montserrat flex text-black">
            No Liked Product
          </h4>
        ))}
      {profile?.role === "farmer" && (
        <div className="w-full">
          <h4 className="text-center capitalize py-2 text-2xl font-semibold font-montserrat text-black">
            {profile.farmName}
          </h4>
          {/* {(name, description, category, price, stock, images)} */}
          <div className="flex p-4 justify-center">
            <Button
              text="Create Product"
              className="flex self-center"
              onClick={handleDialogOpen}
            />
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            {products?.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </div>
          <AddProductModal
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
