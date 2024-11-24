import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-darkGreen py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:px-36 px-10 sm:px-16">
        <div>
          <h4 className="text-lg font-bold mb-4 font-autowide">Agriqq</h4>
          <p className="text-sm font-poppins">
            <span className="font-semibold !font-montserrat">Agriqq</span>,
            empower farmers by providing an easy-to-use platform where farmers
            can list and sell products.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 font-montserrat">
            Quick Links
          </h4>
          <ul className="text-sm font-poppins space-y-2">
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
          <h4 className="text-lg font-bold mb-4 font-montserrat">Contact Us</h4>
          <p className="text-sm font-poppins">Email: support@agriqq.com</p>
          <p className="text-sm font-poppins">Phone: +234 123 456 7890</p>
          <p className="text-sm font-poppins">
            Location: Rivers State
          </p>
        </div>
      </div>
      <div className="text-center font-montserrat text-sm mt-8 border-t border-darkGreen border-opacity-50 pt-4">
        &copy; {new Date().getFullYear()} Agriqq. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
