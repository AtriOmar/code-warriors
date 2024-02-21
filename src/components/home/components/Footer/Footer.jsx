import React from "react";

import facebook from "@/images/facebook.png";
import instagram from "@/images/instagram.png";
import linkedin from "@/images/linkedin.png";
import Image from "next/image";

const quickLinks01 = [
  {
    path: "#",
    display: "Developpement web ",
  },
  {
    path: "#",
    display: "Developpement mobile",
  },
  {
    path: "#",
    display: "Intelligence artificielle",
  },
  {
    path: "#",
    display: "Cybercecurity",
  },
  {
    path: "#",
    display: "Data",
  },
];

const quickLinks02 = [
  {
    path: "#",
    display: "Stackoverflow",
  },
  {
    path: "#",
    display: "Udemy",
  },
  {
    path: "#",
    display: "Coursera",
  },
  {
    path: "#",
    display: "Paragraph 3 Semi bold",
  },
  {
    path: "#",
    display: "Paragraph 3 Semi bold",
  },
];

const quickLinks03 = [
  {
    icon: "ri-home-line",
    display: "Zeramadine monastir",
  },
  {
    icon: "ri-mail-line",
    display: "Mehrezhoussem@gmail.com",
  },
  {
    icon: "ri-phone-fill",
    display: "+216 26 868 733",
  },
];

const Footer = () => {
  const year = new Date().getFullYear;
  return (
    <>
      <footer className="py-24 bg-purple-600" id="footer">
        <div className="container">
          <div className="flex justify-between gap-x-10 flex-wrap md:flex-wrap sm:flex-wrap md:gap-x-6 md:gap-y-6">
            <div className="w-30  md:w-47">
              <div className="relative w-full h-20">
                <Image fill src={"/logo.png"} alt="" className="object-cover" />
              </div>
            </div>
            <div className="w-35 md:w-47">
              <div className="text-2xl font-normal mb-8 cursor-pointer font-bold">Categories</div>
              <ul className="list-none">
                {quickLinks01.map((item, index) => (
                  <li className="mb-8 flex items-center justify-start gap-4" key={index}>
                    <a href={item.path} className="text-sm font-light transition-colors duration-200 hover:text-white">
                      {item.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-35 md:w-47">
              <div className="text-2xl font-normal mb-8 cursor-pointer font-bold">Ressources</div>
              <ul className="list-none">
                {quickLinks02.map((item, index) => (
                  <li className="mb-8 flex items-center justify-start gap-4" key={index}>
                    <a href={item.path} className="text-sm font-light transition-colors duration-200 hover:text-white">
                      {item.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-35 md:w-47">
              <div className="text-2xl font-normal mb-8 cursor-pointer font-bold">Contact</div>
              <ul className="list-none">
                {quickLinks03.map((item, index) => (
                  <li className="mb-8 flex items-center justify-start gap-4" key={index}>
                    <i className={item.icon + " text-2xl"}></i>
                    <p className="text-xl">{item.display}</p>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-start gap-4">
                <div className="w-8 h-8">
                  <a href="">
                    <img src={facebook} alt="" className="w-full h-full" />
                  </a>
                </div>
                <div className="w-8 h-8">
                  <a href="">
                    <img src={linkedin} alt="" className="w-full h-full" />
                  </a>
                </div>
                <div className="w-8 h-8">
                  <a href="">
                    <img src={instagram} alt="" className="w-full h-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-8 text-center text-sm font-normal">Copy Rights ENET’Com Junior Entreprise</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
