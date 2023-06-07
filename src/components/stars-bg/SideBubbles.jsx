import React from "react";
import "./SideBubble.css";
const SideBubbles = () => {
  return (
    <div className="absolute w-full h-full">
      <div className="cont border-t-[15px] border-b-[15px] dark:border-[#00000D] border-t-[#66d178] border-b-slate-300 ">
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>
        <div className="drip bg-[#66d178] dark:bg-white"></div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SideBubbles;
