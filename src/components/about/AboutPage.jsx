import React from "react";

import aboutImg from "@/images/about-us.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AboutPage = ({ values }) => {
  // const valeurs = [
  //   {
  //     title: "Qualité",
  //     content:
  //       "Nous avons pour raison d’être la satisfaction de nos clients et nous nous assurons de toujours leur offrir un travail de la plus haute qualité.",
  //   },
  //   {
  //     title: "Engagement",
  //     content: "Nous embauchons des personnes motivées, engagées et passionnées par leur profession.",
  //   },
  //   {
  //     title: "Innovation",
  //     content:
  //       "Nous cherchons constamment à nous améliorer dans toutes nos activités et encourageons une culture d’innovation afin d’assurer le développement continu de nouveaux produits et services répondant aux besoins de nos clients.",
  //   },
  //   {
  //     title: "Collaboration",
  //     content: "Nous croyons que la collaboration, l’esprit d’équipe et le travail d’équipe sont des ingrédients clés du succès en affaires.",
  //   },
  //   {
  //     title: "Intégrité",
  //     content:
  //       "Nous croyons que le meilleur garant de notre réputation est le maintien d’un haut niveau d’intégrité et de déontologie dans toutes nos activités quotidiennes.",
  //   },
  //   {
  //     title: "Intégrité",
  //     content:
  //       "Nous croyons que le meilleur garant de notre réputation est le maintien d’un haut niveau d’intégrité et de déontologie dans toutes nos activités quotidiennes.",
  //   },
  // ];
  return (
    <div className="max-w pt-16 pb-32 mx-auto">
      <section className="flex justify-center items-center flex-col">
        <h2 className="font-bold text-3xl w-3/4 text-center pb-4 ">Empowering the world to develop technology through collective knowledge.</h2>
        <p className="font-bold text-lg text-center">Our products and tools enable people to ask, share and learn at work or at home.</p>
      </section>

      <section className="mt-10 ">
        <p className="text-2xl font-bold my-8">What Sets Us Apart</p>
        <ul className="pl-12 ">
          <li className="pb-2">
            <span className="text-lg font-bold pr-2">Expertise:</span>
            Our forum is curated by IT professionals with extensive experience in various domains. You can trust the information and advice shared within our
            community.
          </li>
          <li className="pb-2">
            <span className="text-lg font-bold pr-2">Community-Driven: </span>[ Name] thrives on the active participation of its members. Your contributions
            shape the discussions and knowledge shared within the community.
          </li>
          <li className="pb-2">
            <span className="text-lg font-bold pr-2">Diverse Topics:</span>
            From programming languages to hardware troubleshooting, we cover a wide range of IT-related topics. Whatever your interest or expertise level,
            there's a place for you here.
          </li>
        </ul>
      </section>

      <section className="valeurs">
        <p className="text-2xl font-bold my-8">Nos valeurs</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {values.map((item, index) => (
            <div className="w-full pt-4 pb-10 mx-auto rounded-md shadow-[2px_2px_10px_rgb(0,0,0,.2)] " key={index}>
              <h4 className="text-lg py-4 text-center font-bold capitalize">{item.title}</h4>
              <p className="description px-4">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-45% mt-20">
            <p className="text-xs mt-8 md:text-xl">
              Let our experts prepare a free home analysis for you! Just fill out our form. Surround yourself with the luxury and quality of one of Saskatoon’s
              premier home builder. At Properties we take pride in building you everything you need to call The Meadows home.
            </p>
            <div className="mt-4 px-6 py-2 border-0 text-base outline-none text-purple-600 rounded-md cursor-pointer bg-white">
              <FontAwesomeIcon icon={faArrowRight} /> Learn More
            </div>

            <div className="p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              <div className="flex  items-center flex-col">
                <div className=" text-purple-600 text-center text-base  font-bold whitespace-no-wrap">2 Years</div>
                <div className="text-gray-600 text-sm text-center">of trusted and high-quality knowledge</div>
              </div>
              <div className="flex  items-center flex-col">
                <div className=" text-purple-600 text-center text-base font-bold whitespace-no-wrap">14 seconds</div>
                <div className="text-gray-600 text-sm text-center">average time between new questions</div>
              </div>
              <div className="flex  items-center flex-col">
                <div className=" text-purple-600 text-center text-base font-bold whitespace-no-wrap">2 Millions</div>
                <div className="text-gray-600 text-sm text-center">total questions and answers so far</div>
              </div>
              <div className="flex items-center flex-col">
                <div className=" text-purple-600 text-base text-center font-bold whitespace-no-wrap">5 Billions</div>
                <div className="text-gray-600 text-sm text-center">times knowledge has been reused</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-45% flex justify-center items-center">
            <div className="relative size-[400px]  object-fill rounded-md">
              <Image src={aboutImg} alt="" className="object-contain" fill />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
