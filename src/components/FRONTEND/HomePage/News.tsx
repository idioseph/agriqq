import { NewsProps } from "@/interface/News";
import React, { useState } from "react";
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  description,
  image,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs">
    <Image
      src={image}
      alt={title}
      width={400}
      height={300}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  </div>
);

const News: React.FC = () => {
  const [news, setNews] = useState<NewsProps[] | null>([
    {
      title: "Government Subsidies for Fertilizers Announced",
      date: "Oct 22, 2024",
      description:
        "The Federal Government has introduced a new subsidy program to make fertilizers more affordable for smallholder farmers across the country. Applications begin next week.",
      image: "/images/blog1.jpeg",
    },
    {
      title: "Rainy Season Farming Techniques for 2025",
      date: "Mar 8, 2024",
      description:
        "Experts share the best practices for optimizing crop yields during the upcoming rainy season, focusing on rice, maize, and cassava.",
      image: "/images/blog2.jpeg",
    },
    {
      title: "Fresh Export Opportunities for Nigerian Farmers",
      date: "Apr 14, 2024",
      description:
        "The EU is seeking suppliers of organic farm produce from Africa, opening new doors for Nigerian farmers to export fresh goods like ginger, yams, and peppers.",
      image: "/images/blog3.jpeg",
    },
    {
      title: "Digital Farming Tools Workshop in Abuja",
      date: "June 3, 2024",
      description:
        "A free training session on how farmers can use mobile apps to track inventory, monitor weather patterns, and market produce is scheduled for February 2025.",
      image: "/images/blog4.jpeg",
    },
    {
      title: "Drought-Resistant Crop Seeds Now Available",
      date: "Sept 12, 2024",
      description:
        "Leading seed companies release new drought-resistant seed varieties to help farmers tackle unpredictable weather conditions.",
      image: "/images/blog5.jpeg",
    },
  ]);

  return (
    <section
      id="news"
      className=" bg-gray-100 md:px-24 px-10 gap-5 flex flex-col sm:px-14 py-20 justify-center"
    >
      <div>
        <h4 className="text-center text-black text-3xl font-bold font-montserrat">
          Our Latest News
        </h4>
        <h4 className="text-grey-100 font-poppins text-gray-600 text-[14px] font-[400] text-center">
          Browse latest news from the agricultural sector{" "}
        </h4>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        {news?.map((item: NewsProps, index: number) => (
          <NewsCard
            key={index}
            title={item.title}
            date={item.date}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default News;
