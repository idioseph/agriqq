import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-darkGreen text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
        <div>
          <h4 className="text-lg font-bold mb-4">Agriqq</h4>
          <p className="text-sm">
            Fresh Produce, Smarter Marketing, and a Brighter Future for Farmers
            Everywhere.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/about" className="hover:text-lightGreen">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-lightGreen">
                Products
              </a>
            </li>
            <li>
              <a href="/stories" className="hover:text-lightGreen">
                Our Stories
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-lightGreen">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <p className="text-sm">Email: support@agriqq.com</p>
          <p className="text-sm">Phone: +234 123 456 7890</p>
          <p className="text-sm">Location: Abua/Odual LGA, Rivers State</p>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Agriqq. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
