import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NextPage } from "next";
import Link from "next/link";
import Button from "../Button";
import Typewriter from "../Typewriter";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  return (
    <div className="h-screen relative">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        autoPlay
        showArrows={false}
        infiniteLoop
        transitionTime={1500}
      >
        <div>
          <img className="h-[100vh] object-cover" src="images/hero.jpg" />
        </div>
        <div>
          <img className="h-[100vh] object-cover" src="images/hero2.jpg" />
        </div>
      </Carousel>
      <div className="md:px-36 px-10 sm:px-16 absolute flex flex-col items-start justify-center inset-0 bg-lightGreen bg-opacity-70">
        <Typewriter
          className={
            "md:text-5xl md:h-[50px] text-white font-bold text-nowrap text-3xl h-[36px]"
          }
          textList={[
            "Connecting Farmers",
            "Connecting Customers",
            "One Click at a Time!",
          ]}
        />
        <p className="mt-4 text-xl text-white text-left max-w-2xl font-poppins">
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
    </div>
  );
};

export default Hero;
