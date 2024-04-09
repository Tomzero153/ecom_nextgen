'use client'

import { useState } from "react";
import Image from 'next/image'
// import {
//     BsFillArrowRightCircleFill,
//     BsFillArrowLeftCircleFill,
//   } from "react-icons/bs";
import arrowR from "../Assets/right-arrow.png"
import arrowL from "../Assets/left-arrow.png"

const Slider = ({ slides }) => {
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
      if (current === 0) setCurrent(slides.length - 1);
      else setCurrent(current - 1);
    };
  
    let nextSlide = () => {
      if (current === slides.length - 1) setCurrent(0);
      else setCurrent(current + 1);
    };
    
  return (
    <div className="overflow-hidden relative">
 <div
      className={`flex transition ease-out duration-400`}
      style={{
        transform: `translateX(-${current * 100}%)`,
      }}
    >
      {slides.map((s, index) => (
        <div key={index} className="flex-none w-full max-w-full">
          <Image
            src={s}
            alt=""
            className="w-full xl:h-[650px] object-cover object-center"
          />
        </div>
      ))}
    </div>

    <div className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2 text-white  text-3xl">
      <button onClick={previousSlide}>
      <Image className=" lg:w-10 w-8 " src={arrowL} alt="Previous Slide" />
      </button>
      <button onClick={nextSlide}>
      <Image className=" lg:w-10 w-8" src={arrowR} alt="Previous Slide" />
      </button>
    </div>

    <div className="absolute  bottom-0 py-4 flex justify-center gap-3 w-full">
      {slides.map((s, i) => {
        return (
          <div
            onClick={() => {
              setCurrent(i);
            }}
            key={"circle" + i}
            className={`rounded-full lg:w-5 lg:h-5 w-3 h-3 cursor-pointer  ${
              i == current ? "bg-purple-600" : "bg-gray-500"
            }`}
          ></div>
        );
      })}
    </div>
  </div>
  );
};

export default Slider;