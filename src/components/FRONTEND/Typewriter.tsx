// components/Typewriter.tsx
import { NextPage } from "next";
import React, { useState, useEffect } from "react";

interface TypewriterProps {
  textList: string[];
  typingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const Typewriter: NextPage<TypewriterProps> = ({
  textList,
  typingSpeed = 150,
  pauseTime = 2000,
  className,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const targetText = textList[currentIndex];
    
    if (currentText === targetText) {
      // Move to next text after pause
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % textList.length);
        setCurrentText("");
      }, pauseTime);
      
      return () => clearTimeout(timeout);
    }

    // Type next character
    const timeout = setTimeout(() => {
      setCurrentText(targetText.slice(0, currentText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, textList, typingSpeed, pauseTime]);

  return (
    <div className={`${className} flex items-center`}>
      <span className="whitespace-pre">{currentText}</span>
      <span className="animate-pulse border-r-4 border-white h-[80%] ml-1"></span>
    </div>
  );
};

export default Typewriter;
