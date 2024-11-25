import { NextPage } from "next";
import ProductItem from "../ProductItem";
import { Product } from "@/interface/Product";

interface Props {
  products: Product[] | null;
}

const Products: NextPage<Props> = ({ products }) => {
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
        {products?.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
