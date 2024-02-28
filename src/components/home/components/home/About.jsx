import React, { useState, useEffect } from "react";

import aboutImg from "@/images/about-us.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const About = () => {
  const [countOn, setCounterOn] = useState();
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
    <section id="about" className="px-4">
      <div className="max-w pt-12 flex justify-center items-center flex-col lg:justify-between lg:flex-row gap-8" data-aos="fade-up" data-aos-duration="2000">
        <div className="lg:w-1/2 pt-10 px-2">
          <h6 className="text-sm text-gray-400">About us</h6>
          <h2 className="text-3xl font-bold w-80 text-start">Insights About Our Company</h2>
          <p className="description text-xs mt-8">
            Let our experts prepare a free home analysis for you! Just fill out our form. Surround yourself with the luxury and quality of one of Saskatoon’s
            premier home builder. At Properties we take pride in building you everything you need to call The Meadows home.
          </p>
          <div className="flex align-center w-fit justify-center mt-4 p-2 border-none outline-none rounded-full cursor-pointer bg-white text-purple-700 transition duration-2000 hover:bg-purple-700 hover:text-white ">
            <div className="text-center">
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </div>
            <p>Learn More</p>
          </div>
          <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div className="py-8 grid grid-cols-2  scr800:grid-cols-4 gap-10">
              <div className="flex justify-center items-center flex-col">
                <div className="text-gray-600 text-lg">Projects</div>
                <div className="text-purple-700 text-2xl font-bold">{countOn && <CountUp start={0} end={27} duration={2} delay={0} />}</div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-gray-600 text-lg">Campaigns</div>
                <div className="text-purple-700 text-2xl font-bold">{countOn && <CountUp start={0} end={18} duration={2} delay={0} />} </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-gray-600 text-lg">Events</div>
                <div className="text-purple-700 text-2xl font-bold">{countOn && <CountUp start={0} end={56} duration={2} delay={0} />} </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-gray-600 text-lg">Exellency</div>
                <div className="text-purple-700 text-2xl font-bold">{countOn && <CountUp start={0} end={13} duration={2} delay={0} />} </div>
              </div>
            </div>
          </ScrollTrigger>
        </div>
        <div className="grow h-[300px] relative self-stretch rounded-lg">
          <Image src={aboutImg} alt="" className="object-contain" fill />
        </div>
      </div>
    </section>
  );
};

export default About;
