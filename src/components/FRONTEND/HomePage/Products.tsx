import { NextPage } from "next";
import ProductItem from "../ProductItem";

interface Props {}

const Products: NextPage<Props> = ({}) => {
  return (
    <div className="md:px-24 px-10 gap-5 flex flex-col sm:px-14 py-20 bg-white">
      <div>
        <h4 className="text-center text-black text-3xl font-bold font-montserrat">
          Our Products
        </h4>
        <h4 className="text-grey-100 font-poppins text-gray-600 text-[14px] font-[400] text-center">
          Browse The Collection of Top Farm Products{" "}
        </h4>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Syltherine"
          description="Stylish cafe chair"
          price={3500000}
          discountPrice={2500000}
        />
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Leviosa"
          description="Stylish cafe chair"
          price={2500000}
        />
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Leviosa"
          description="Stylish cafe chair"
          price={2500000}
        />
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Leviosa"
          description="Stylish cafe chair"
          price={2500000}
        />
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Leviosa"
          description="Stylish cafe chair"
          price={2500000}
        />
        <ProductItem
          image="https://via.placeholder.com/300"
          name="Leviosa"
          description="Stylish cafe chair"
          price={2500000}
        />
      </div>
    </div>
  );
};

export default Products;
