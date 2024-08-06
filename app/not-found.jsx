"use client";

import { useEffect, useState } from "react";

function CustomNotFound() {
  const [textElements, setTextElements] = useState([]);

  const randomText = () => {
    const text = "qwertyuiopasdfghjklzxcvbnm+-*/!@#$%^&(),.:;0123456789";
    return text[Math.floor(Math.random() * text.length)];
  };

  const addTextElement = () => {
    const cloudWidth = 320; // Fixed width for cloud
    const left = Math.floor(Math.random() * cloudWidth);
    const size = Math.random() * 1.5;
    const duration = Math.random() * 1 + 1; // Ensure minimum duration is 1s
    setTextElements((prev) => [
      ...prev,
      {
        key: Date.now(),
        left,
        fontSize: 0.5 + size,
        animationDuration: duration,
      },
    ]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addTextElement();
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <h1 className="text-9xl font-extrabold text-white z-10 absolute top-28 text-404-shadow">
        4 <span>0</span> 4
      </h1>
      <div className="relative w-[320px] h-[100px] cloud bg-white rounded-full z-10 shadow-[0_0_95px_rgba(255,255,255,0.5)]">
        <div className="absolute top-[-55px] left-[45px] w-[110px] h-[110px] rounded-full bg-white shadow-[0_0_95px_rgba(255,255,255,0.5)]"></div>
        {/* Smaller circle */}
        <div className="absolute top-[-82px] left-[130px] w-[140px] h-[140px] rounded-full bg-white shadow-[0_0_95px_rgba(255,255,255,0.5)]"></div>
        {textElements.map(({ key, left, fontSize, animationDuration }) => (
          <div
            key={key}
            className="absolute text-rain text-shadow"
            style={{
              left: `${left}px`,
              fontSize: `${fontSize}em`,
              animationDuration: `${animationDuration}s`,
            }}
          >
            {randomText()}
          </div>
        ))}
        <style jsx>{`
          @keyframes animate {
            0% {
              transform: translateY(0) scale(1);
            }
            70% {
              transform: translateY(290px) scale(1);
            }
            100% {
              transform: translateY(290px) scale(0);
            }
          }
          .text-rain {
            position: absolute;
            top: 40px;
            height: 20px;
            line-height: 20px;
            text-transform: uppercase;
            color: white;
            text-shadow: 0 0 5px white, 0 0 15px white, 0 0 30px white;
            animation: animate linear forwards;
          }
        `}</style>
      </div>
    </div>
  );
}

export default CustomNotFound;
