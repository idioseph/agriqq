// components/Typewriter.tsx
import { NextPage } from "next";
import React, { useState, useEffect } from "react";

interface TypewriterProps {
  textList: string[];
  typingSpeed?: number; // time per character
  pauseTime?: number; // pause time between words
  className?: String;
}

const Typewriter: NextPage<TypewriterProps> = ({
  textList,
  typingSpeed = 100,
  pauseTime = 1500,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = textList[index];
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length < currentText.length) {
            return currentText.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            return prev;
          }
        });
      }, typingSpeed);
      return () => clearInterval(typingInterval);
    } else {
      const pauseTimeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayedText("");
        setIndex((prevIndex) => (prevIndex + 1) % textList.length);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }
  }, [isTyping, index, textList, typingSpeed, pauseTime]);

  return (
    <h4 className={`border-r-2 max-h-max border-gray-600 pr-1 ${className}`}>
      {displayedText}
    </h4>
  );
};

export default Typewriter;
