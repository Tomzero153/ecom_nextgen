"use client";
import Image from "next/image";
import Slider from "./slide";
import silde1 from "../Assets/poster_car.jpg"
import silde2 from "../Assets/poster_clothes.jpg"
import silde3 from "../Assets/poster_robot.jpg"
import silde4 from "../Assets/poster_vr.jpg"

export default function homesite() {
  let slides = [
    silde2,
    silde1,
    silde3,
    silde4
  ];
  return (
    <>
      <div className="block  lg:mt-5  xl:w-[1300px] h-full w-full xl:m-auto  items-center">
      <div className="w-[100%]  h-auto xl:m-auto">
       <Slider  slides= {slides}/>
       </div>
      </div>
    </>
  );
}
