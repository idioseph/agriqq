import { NextPage } from "next";

interface Props {
  type?: "outline" | "fill" | "variant";
  text: string;
  className?: string;
}

const Button: NextPage<Props> = ({ text, type = "fill", className }) => {
  return (
    <button
      className={`${
        type === "outline"
          ? "bg-opacity-0 border text-darkGreen hover:text-white border-darkGreen backdrop-blur-sm hover:bg-darkGreen"
          : type === "fill"
          ? "bg-darkGreen hover:first:bg-opacity-0 hover:outline-1 outline outline-1 outline-darkGreen hover:text-darkGreen hover:outline backdrop-blur-sm hover:outline-darkGreen"
          : "border border-yellowGreen bg-darkGreen"
      } py-2 px-6 rounded-md ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;