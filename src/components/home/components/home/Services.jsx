import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Services({ fields }) {
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
    <div className="px-4 py-8">
      <div className="services_section max-w" id="service">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 " data-aos="fade-up">
          {fields.map((item, index) => (
            <div className="bg-white p-10 rounded-2xl text-center border-1 border-black mx-auto w-80 md:mb-8 lg:mb-0 sm:w-full shadow-lg" key={index}>
              <span className="w-20 h-20 flex items-center justify-center mx-auto mb-8">
                <div className="relative h-full w-full p-2">
                  <Image src={`/api/photo?path=/uploads/fields/${item.icon}`} alt="Icon" className="object-cover" fill />
                </div>
              </span>
              <h3 className="text-lg mb-8">{item.title}</h3>
              <p className="description">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
