import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer({ settings: settingsArr, categories }) {
  const settings = settingsArr?.reduce((acc, setting) => {
    acc[setting.name] = setting.value;
    return acc;
  }, {});

  return (
    <div className="text-slate-200 py-20 px-8 gap-6 items-center bg-gradient-to-tr from-purple-800 to-purple-700 grid scr500:grid-cols-2 scr1000:grid-cols-4">
      <div className="relative mx-6 max-w-[250px] aspect-square">
        <Image src="/logo_white.png" alt="logo" fill className="object-contain" sizes="(max-width: 600px) 150px, 250px" />
      </div>
      <div>
        <p className="font-bold text-xl">Categories</p>
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          {categories?.map((category) => (
            <li key={category.id}>
              <Link href={"/categories/" + category.id}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-bold text-xl">Resources</p>
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          <li>StackOverflow</li>
          <li>Udemy</li>
          <li>Coursera</li>
        </ul>
      </div>
      <div>
        <p className="font-bold text-xl">Contact</p>
        <div className="mt-4 grow flex items-center ">
          <div className="grid grid-cols-[30px_1fr] items-center gap-y-2">
            <FontAwesomeIcon icon={faPhone} className="" />
            <p className="">{settings?.phone}</p>
            <FontAwesomeIcon icon={faEnvelope} className="" />
            <p className="">{settings?.email}</p>
            <FontAwesomeIcon icon={faLocationDot} className="" />
            <p className="">{settings?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
