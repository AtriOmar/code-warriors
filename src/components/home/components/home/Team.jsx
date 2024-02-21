import React from "react";

import team01 from "@/images/team1.jpg";
import team02 from "@/images/team2.jpg";
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
const Team = () => {
  return (
    <>
      <section className="our__team">
        <div className="container">
          <div className="text-center mb-20">
            <h6 className="text-gray-600 pb-4">Our Team</h6>
            <h2>
              <span className="hightlight">Our Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teamMember.map((item, index) => (
              <div className="bg-white rounded-md mb-2" key={index}>
                <div className="relative w-full h-60 rounded-lg overflow-hidden bg-white pt-4">
                  <Image fill src={item.imgUrl} alt="" className="w-full h-full object-contain transform scale-130" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-base mb-1">{item.name}</h4>
                  <p className="description">{item.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
