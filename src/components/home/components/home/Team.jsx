import React, { useEffect } from "react";

import team01 from "@/images/team1.jpg";
import team02 from "@/images/team2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const teamMember = [
  {
    imgUrl: team01,
    name: "Country Hurry",
    position: "Product Developer",
  },
  {
    imgUrl: team02,
    name: "Lindas Walton",
    position: "Front-end Developer",
  },
  {
    imgUrl: team01,
    name: "Harry Martin",
    position: "Product Designer",
  },
  {
    imgUrl: team02,
    name: "Lisa Hurry",
    position: "Ceo & Sr. Developer",
  },
  {
    imgUrl: team02,
    name: "Lisa Hurry",
    position: "Ceo & Sr. Developer",
  },
  {
    imgUrl: team02,
    name: "Lisa Hurry",
    position: "Ceo & Sr. Developer",
  },
  {
    imgUrl: team01,
    name: "Lisa Hurry",
    position: "Ceo & Sr. Developer",
  },
  {
    imgUrl: team02,
    name: "Lisa Hurry",
    position: "Ceo & Sr. Developer",
  },
];
export default function Team({ team }) {
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
    <>
      <section className="our__team px-4 py-20">
        <div className="max-w">
          <div className="text-center" data-aos="fade-up" data-aos-duration="2000">
            <h2>
              <span className="hightlight font-bold text-xl">Our Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 scr500:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6" data-aos="fade-up" data-aos-duration="2000">
            {team.map((item, index) => (
              <div className="bg-white rounded-md mb-2 mx-auto w-full" key={index}>
                <div className="relative w-full h-60 rounded-lg overflow-hidden pt-4">
                  <Image src={`/api/photo?path=/uploads/team/${item.picture}`} alt="" fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-base mb-1">{item.name}</h4>
                  <p className="description">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
