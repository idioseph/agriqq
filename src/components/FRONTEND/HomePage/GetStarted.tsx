import { NextPage } from "next";
import { 
  PersonAdd, 
  Store, 
  ShoppingCart, 
  Payment,
  Agriculture,
  LocalShipping,
  Inventory,
  AccountBox
} from "@mui/icons-material";
import Link from "next/link";

const GetStarted: NextPage = () => {
  const farmerSteps = [
    {
      icon: <PersonAdd className="text-darkGreen text-3xl" />,
      title: "Create Account",
      description: "Sign up as a farmer with your details and verification documents."
    },
    {
      icon: <Store className="text-darkGreen text-3xl" />,
      title: "Set Up Your Store",
      description: "Create your farmer profile and customize your digital storefront."
    },
    {
      icon: <Inventory className="text-darkGreen text-3xl" />,
      title: "List Products",
      description: "Add your products with descriptions, prices, and high-quality images."
    },
    {
      icon: <LocalShipping className="text-darkGreen text-3xl" />,
      title: "Start Selling",
      description: "Receive orders and manage deliveries through our platform."
    }
  ];

  const buyerSteps = [
    {
      icon: <AccountBox className="text-darkGreen text-3xl" />,
      title: "Register Account",
      description: "Quick registration process with basic information."
    },
    {
      icon: <ShoppingCart className="text-darkGreen text-3xl" />,
      title: "Browse & Select",
      description: "Explore products from various farmers and add to cart."
    },
    {
      icon: <Payment className="text-darkGreen text-3xl" />,
      title: "Secure Payment",
      description: "Choose your payment method and complete your purchase."
    },
    {
      icon: <Agriculture className="text-darkGreen text-3xl" />,
      title: "Receive Fresh Produce",
      description: "Get fresh farm products delivered to your doorstep."
    }
  ];

  return (
    <div id="get-started" className="py-20 px-6 sm:px-16 md:px-36 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Getting Started Sections */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold text-center mb-16">
            Getting Started with AGRIQQ
          </h2>

          {/* Farmers Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-darkGreen">For Farmers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {farmerSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="mb-4 flex items-center gap-2">
                    {step.icon}
                    <span className="text-sm text-gray-500">Step {index + 1}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/register?type=farmer">
                <button className="bg-darkGreen text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Register as Farmer
                </button>
              </Link>
            </div>
          </div>

          {/* Buyers Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-darkGreen">For Buyers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {buyerSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="mb-4 flex items-center gap-2">
                    {step.icon}
                    <span className="text-sm text-gray-500">Step {index + 1}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/register?type=buyer">
                <button className="bg-darkGreen text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Register as Buyer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted; 