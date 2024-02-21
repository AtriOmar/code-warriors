import React from "react";

import aboutImg from "@/images/about-us.png";

const About = () => {
  return (
    <>
      <section id="about">
        <div className="container">
          <div className="pt-12 flex justify-between items-center flex-col lg:flex-row gap-8 w-100">
            <div className="w-100 md:w-100 lg:w-1/2 xl:w-1/2  pt-10">
              <h6 className="subtitle">About us</h6>
              <h2 className="text-2xl">Insights About Our Company</h2>
              <p className="description text-xs mt-8">
                Let our experts prepare a free home analysis for you! Just fill out our form. Surround yourself with the luxury and quality of one of
                Saskatoon’s premier home builder. At Properties we take pride in building you everything you need to call The Meadows home.
              </p>
              <div className="mt-4 py-2 px-4 border-none outline-none text-white rounded-lg cursor-pointer bg-white text-blue-600 hover:bg-blue-600 hover:text-white">
                <i className="ri-arrow-right-line"></i>
                Learn More
              </div>

              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
                <div className="flex justify-center items-center flex-col">
                  <div className="text-gray-600 text-lg">Projects</div>
                  <div className="text-blue-600 text-2xl font-bold">27</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div className="text-gray-600 text-lg">Campaigns</div>
                  <div className="text-blue-600 text-2xl font-bold">18</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div className="text-gray-600 text-lg">Events</div>
                  <div className="text-blue-600 text-2xl font-bold">56</div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div className="text-gray-600 text-lg">Exellency</div>
                  <div className="text-blue-600 text-2xl font-bold">13</div>
                </div>
              </div>
            </div>
            <div className="w-100 md:w-100 lg:w-1/2 xl:w-1/2 flex justify-center items-center">
              <img src={aboutImg} alt="" className="w-90 h-full object-fill rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
