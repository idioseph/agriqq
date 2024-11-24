import { NewsProps } from "@/interface/News";
import React, { useState } from "react";

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
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  </div>
);

const News: React.FC = () => {
  const [news, setNews] = useState<NewsProps[] | null>([
    {
      title: "Success at the World Food Day Exhibition 2024!",
      date: "Oct 16, 2024",
      description: "The World Food Day Exhibition at Ebony Park was a success!",
      image:
        "https://images.unsplash.com/photo-1518733057094-95b531704d56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Replace with any suitable online image
    },
    {
      title: "Agro-Invest Strategic Drive",
      date: "Oct 14, 2024",
      description:
        "The Agro-Investment Corporation is repurposing non-performing assets.",
      image:
        "https://images.unsplash.com/photo-1586772008367-daa4d10fd499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Replace with any suitable online image
    },
    {
      title: "Lease Handover Ceremony in St. Ann",
      date: "Aug 21, 2024",
      description: "A significant lease handover ceremony was held in St. Ann.",
      image:
        "https://images.unsplash.com/photo-1528657471655-8e8269f87040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Replace with any suitable online image
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
