import { NextPage } from "next";
import {
  Store,
  Handshake,
  LocalShipping,
  Favorite,
  AccountCircle,
  Security,
  Analytics,
  Payment,
} from "@mui/icons-material";

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: <Store className="text-darkGreen text-4xl" />,
    title: "Digital Marketplace",
    description:
      "Direct platform for farmers to list and sell their fresh produce to customers nationwide.",
  },
  {
    icon: <Handshake className="text-darkGreen text-4xl" />,
    title: "Direct Farmer Connection",
    description:
      "Connect directly with local farmers, eliminating middlemen and ensuring better prices for both parties.",
  },
  {
    icon: <LocalShipping className="text-darkGreen text-4xl" />,
    title: "Efficient Distribution",
    description:
      "Streamlined logistics network ensuring fresh produce reaches customers quickly and in perfect condition.",
  },
  {
    icon: <Favorite className="text-darkGreen text-4xl" />,
    title: "Wishlist & Favorites",
    description:
      "Save and track your favorite products and farmers for quick access and future purchases.",
  },
  {
    icon: <AccountCircle className="text-darkGreen text-4xl" />,
    title: "Farmer Profiles",
    description:
      "Detailed farmer profiles showcasing their products, farming practices, and customer reviews.",
  },
  {
    icon: <Security className="text-darkGreen text-4xl" />,
    title: "Secure Transactions",
    description:
      "Safe and secure payment processing with buyer protection and transaction tracking.",
  },
  {
    icon: <Analytics className="text-darkGreen text-4xl" />,
    title: "Market Insights",
    description:
      "Access to market trends, pricing information, and demand forecasts for better decision-making.",
  },
  {
    icon: <Payment className="text-darkGreen text-4xl" />,
    title: "Flexible Payments",
    description:
      "Multiple payment options and secure transaction processing for convenient buying and selling.",
  },
];

const About: NextPage = () => {
  return (
    <div id="about" className="py-20 px-6 sm:px-16 md:px-36 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Revolutionizing Agricultural Commerce
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AGRIQQ connects farmers directly with customers, creating a
            transparent and efficient marketplace for agricultural products.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of farmers and customers already benefiting from our
            platform
          </p>
          <button className="bg-darkGreen text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
