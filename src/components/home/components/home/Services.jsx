import React from "react";
import service1 from "@/images/bs_img.png";
import service2 from "@/images/service2.png";
import service3 from "@/images/service3.png";
import Image from "next/image";

const serviceData = [
  {
    icon: service1,
    title: "Business Strategy",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining themethods and tactics",
  },
  {
    icon: service2,
    title: "UX/UI Design",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining the methods and tactics",
  },
  {
    icon: service3,
    title: "App Development",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining themethods and tactics",
  },
  {
    icon: service1,
    title: "Business Strategy",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining themethods and tactics",
  },
  {
    icon: service2,
    title: "UX/UI Design",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining the methods and tactics",
  },
  {
    icon: service3,
    title: "App Development",
    desc: "A business strategy is a powerful tool for helping you reach your goals, defining themethods and tactics",
  },
];

const Services = () => {
  return (
    <>
      <div className="services_section" id="service">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {serviceData.map((item, index) => (
            <div className="bg-white p-10  text-center border-1 border-black mx-auto w-80 md:w-31 lg:w-90 md:mb-8 lg:mb-0 sm:w-full" key={index}>
              <span className="relative w-20 h-20 p-1 flex items-center justify-center mx-auto rounded-full bg-blue-200 mb-8 border border-blue-600">
                <Image fill src={item.icon} className="h-full w-full p-2" />
              </span>
              <h3 className="text-lg mb-8">{item.title}</h3>
              <p className="description">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
