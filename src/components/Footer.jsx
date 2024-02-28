import Image from "next/image";
import React from "react";

export default function Footer({ settings: settingsArr }) {
  const settings = settingsArr?.reduce((acc, setting) => {
    acc[setting.name] = setting.value;
    return acc;
  }, {});

  return (
    <div className="py-20 px-8 gap-6 items-center bg-gradient-to-tr from-purple-700 to-purple-600 grid grid-cols-2 scr1000:grid-cols-4">
      <div className="relative mx-6 max-w-[250px] aspect-square">
        <Image src="/logo_white.png" alt="logo" fill className="object-contain" sizes="(max-width: 600px) 150px, 250px" />
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
          {settingsArr?.map?.((setting) => (
            <li key={setting.id}>{setting.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
