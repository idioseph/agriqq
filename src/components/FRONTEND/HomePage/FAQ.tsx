import { NextPage } from "next";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: NextPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Is this a real e-commerce platform?",
      answer: "No, AGRIQQ is currently a demonstration project showcasing CRUD (Create, Read, Update, Delete) operations. It's designed to demonstrate web development skills and does not process real transactions."
    },
    {
      question: "Can I actually buy products through this platform?",
      answer: "No, the platform currently doesn't support real transactions or payments. It's a demonstration project where you can browse products, create listings (as a farmer), and interact with the interface, but no actual purchases can be made."
    },
    {
      question: "What features are actually functional?",
      answer: "You can register accounts, create/edit/delete product listings (as a farmer), browse products, add items to favorites, and update your profile. The payment and delivery systems are not implemented as this is a demo project."
    },
    {
      question: "Why was this project created?",
      answer: "AGRIQQ was developed as a portfolio project to demonstrate full-stack development capabilities, including user authentication, database management, and responsive UI design."
    },
    {
      question: "Can I use this for my real farming business?",
      answer: "While the platform showcases the potential of digital agricultural marketplaces, it's currently a demonstration project. For real business use, you would need a fully implemented version with payment processing and other critical features."
    }
  ];

  return (
    <div id="faq" className="py-20 px-6 sm:px-16 md:px-36 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h4 className="text-lg font-semibold text-darkGreen">
                  {faq.question}
                </h4>
                {openIndex === index ? (
                  <KeyboardArrowUp className="text-darkGreen" />
                ) : (
                  <KeyboardArrowDown className="text-darkGreen" />
                )}
              </button>
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'py-4 max-h-96' : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-darkGreen/80">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 