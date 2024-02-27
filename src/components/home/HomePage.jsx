import React from "react";
import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import About from "./components/home/About";
import About2 from "./components/home/About2";
import Team from "./components/home/Team";
import Testimonial from "./components/home/Testimonial";
import Newsletter from "../contact/Newsletter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <About2 />
      <Team />
      {/* <Testimonial /> */}
      <Newsletter />
    </>
  );
};

export default HomePage;
