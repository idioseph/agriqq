import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NextPage } from "next";
import Link from "next/link";
import Button from "../Button";
import Typewriter from "../Typewriter";
import Image from 'next/image';

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
      <div className="md:px-36 px-10 sm:px-16 absolute flex flex-col items-start justify-center inset-0 bg-white bg-opacity-40">
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
    </div>
  );
};

export default Hero;
