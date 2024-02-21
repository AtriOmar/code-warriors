import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="py-8 px-8 gap-6 items-center bg-purple grid grid-cols-2 scr1000:grid-cols-4">
      <div className="relative mx-6 max-w-[250px] aspect-square">
        <Image src="/logo_white.png" alt="logo" fill className="object-contain" />
      </div>
      <div>
        <p className="font-bold text-xl">Categories</p>
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          <li>Web development</li>
          <li>Mobile development</li>
          <li>Artificial Intelligence</li>
          <li>Cyber Security</li>
          <li>Data</li>
        </ul>
      </div>
      <div>
        <p className="font-bold text-xl">Resources</p>
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          <li>StackOverflow</li>
          <li>Udmey</li>
          <li>Coursera</li>
          <li>Coursera</li>
          <li>Coursera</li>
        </ul>
      </div>
      <div>
        <p className="font-bold text-xl">Contact</p>
        <ul className="mt-4 flex flex-col gap-2 font-medium">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Team</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}
