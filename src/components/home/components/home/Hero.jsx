import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import lightImg from "@/images/light-hero-bg.jpg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 120,
      delay: 0,
      duration: 1000,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <div>
      <section id="home" className="overflow-hidden px-4">
        <div className="container max-w">
          <div className="pt-12 flex justify-between items-center flex-col lg:flex-row gap-8 w-100">
            <div className=" lg:w-1/2  pt-10 " data-aos="fade-right">
              <div>
                <h2 className="text-4xl font-bold leading-10 text-purple-700 md:text-2xl lg:text-3xl ">Coding Chronicles:</h2>
                <h2 className="text-3xl font-bold leading-10 text-purple-700 md:text-2xl lg:text-2xl ">Unraveling Solutions in the Developer's Universe</h2>
              </div>
              <p className="description mt-10 text-lg leading-8 md:text-lg md:leading-10 lg:text-base lg:leading-7">
                When life presents more challenges than you have answers,let ECJE make your journey easier with intelligent solutions.
              </p>
              <div className="mt-10 flex items-center gap-8">
                <a href="#footer">
                  <div className="px-6 py-2 border-0 text-center outline-none  rounded-xl cursor-pointer md:text-sm bg-white text-purple-700">
                    <FontAwesomeIcon icon={faCirclePlay} /> Take a trip
                  </div>
                </a>
                <div className="px-6 py-2 text-center border-0 outline-none text-white rounded-full cursor-pointer md:text-base bg-purple-700 border border-white">
                  Get Started Now <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center items-center" data-aos="fade-left">
              <div className="relative w-full h-full max-w-[500px]">
                <Image src={lightImg} alt="hero-img" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
