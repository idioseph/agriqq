import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NextPage } from "next";
import Link from "next/link";
import Button from "../Button";
import Typewriter from "../Typewriter";
import Image from "next/image";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  return (
    <div className="h-screen relative bg-gray-100">
      <Carousel
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        autoPlay
        showArrows={false}
        infiniteLoop
        transitionTime={1000}
        interval={5000}
        renderIndicator={(clickHandler, isSelected, index) => (
          <div
            className={`inline-block mx-1 w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              isSelected ? 'bg-darkGreen w-6' : 'bg-gray-400'
            }`}
            onClick={clickHandler}
            key={index}
          />
        )}
      >
        <div>
          <Image
            src="/images/hero.jpg"
            alt="Hero image description"
            width={500}
            height={300}
            className="h-[100vh] object-cover"
          />
        </div>
        <div>
          <Image
            src="/images/hero2.jpg"
            alt="Hero image description"
            width={500}
            height={300}
            className="h-[100vh] object-cover"
          />
        </div>
      </Carousel>
      <div className="md:px-36 px-10 sm:px-16 absolute flex flex-col items-start justify-center inset-0 bg-white/30 backdrop-blur-sm">
        <Typewriter
          className={
            "md:text-5xl md:h-[50px] text-darkGreen font-bold text-nowrap text-3xl h-[36px]"
          }
          textList={[
            "Connecting Farmers",
            "Connecting Customers",
            "One Click at a Time!",
          ]}
        />
        <p className="mt-4 text-xl text-darkGreen text-left max-w-2xl font-medium font-poppins">
          Fresh Produce, Smarter Marketing, and a Brighter Future for Farmers
          Everywhere.
        </p>
        <div className="my-5 flex gap-3">
          <Link className="w-full" href={"/register"}>
            <Button className="w-full" type="fill" text="Explore" />
          </Link>
          <Button
            className="whitespace-nowrap"
            text="Contact Us"
            type="outline"
          />
        </div>
      </div>
      <div className="absolute bottom-8 left-6 sm:left-16 md:left-36 flex gap-8">
          <div className="text-white">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-white/80">Active Farmers</div>
          </div>
          <div className="text-whit">
            <div className="text-3xl font-bold">100+</div>
            <div className="text-whit/80">Products Listed</div>
          </div>
          <div className="text-whit">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-whit/80">Customer Satisfaction</div>
          </div>
        </div>
    </div>
  );
};

export default Hero;
