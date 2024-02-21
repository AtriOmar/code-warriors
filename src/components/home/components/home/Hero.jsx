import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import lightImg from "@/images/light-hero-bg.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="pt-12 flex justify-between items-cente flex-col lg:flex-row gap-8 w-full">
            <div className="w-full lg:w-1/2 xl:w-1/2  pt-10 ">
              <div>
                <h2 className="text-4xl leading-10 text-indigo-600 md:text-2xl md:leading-12 lg:text-3xl lg:leading-14">Coding Chronicles:</h2>
                <h2 className="text-3xl leading-10 text-indigo-600 md:text-2xl md:leading-12 lg:text-2xl lg:leading-14">
                  Unraveling Solutions in the Developer's Universe
                </h2>
              </div>
              <p className="description mt-10 text-lg leading-8 md:text-lg md:leading-10 lg:text-base lg:leading-7">
                When life presents more challenges than you have answers,let ECJE make your journey easier with intelligent solutions.
              </p>
              <div className="mt-10 flex items-center gap-8">
                <a href="#footer">
                  <div className="px-6 py-2 border-0 outline-none  rounded-md cursor-pointer md:text-sm bg-white text-indigo-600">
                    <FontAwesomeIcon icon={faCirclePlay} /> Take a trip
                  </div>
                </a>
                <div className="px-6 py-2 border-0 outline-none text-white rounded-md cursor-pointer md:text-sm bg-indigo-600 border border-white">
                  Get Started Now{">"}{" "}
                </div>
              </div>
            </div>

            <div className="bg-black  relative h-50 w-full lg:w-1/2 xl:w-1/2">
              <Image fill src={lightImg} alt="hero-img" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
