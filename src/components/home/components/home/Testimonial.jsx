import React, { useEffect, useRef } from "react";

import ava01 from "@/images/ava-1.jpg";
import ava02 from "@/images/ava-2.jpg";
import ava03 from "@/images/ava-3.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Testimonial({ feedbacks }) {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperEl = swiperRef.current;

    const params = {
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 3,
      navigation: {
        nextEl: ".swiper-custom-button-next",
        prevEl: ".swiper-custom-button-prev",
      },
      breakpoints: {
        100: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    };
    Object.assign(swiperEl, params);

    // and now initialize it
    swiperEl.initialize();
  }, []);

  return (
    <div className="bg-purple-600 bg-opacity-60 px-4 py-8">
      <section className="max-w mx-auto">
        <div className="container">
          <div className="w-75 mb-10">
            <h6 className="font-semibold text-gray-800 text-2xl"> Testimonials</h6>
            <h2 className="font-bold mt-4 text-4xl text-slate-900">Customers Talk About Us</h2>
            <p className="mt-4 text-gray-700 text-lg font-semibold">
              Customer support represents the resources within your company that provide technical assistance to consumers after they purchase a product or
              service.
            </p>
          </div>

          <div className="m-auto flex justify-center items-center gap-2 relative ">
            <div className="swiper-custom-button-prev text-black-500 absolute left-0 text-base cursor-pointer  top-0 bottom-0 flex items-center justify-center z-10">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="grid grid-cols-1 w-full">
              <swiper-container ref={swiperRef} init="false" class="w-full">
                {feedbacks.map((feedback, index) => (
                  <swiper-slide class="h-auto">
                    <div className="h-full flex flex-col bg-slate-100 py-10 px-5 rounded-xl text-center cursor-pointer">
                      <p className="description mb-10">{feedback.feedback}</p>
                      <div className="mt-auto flex items-center justify-center gap-x-4 mt-10">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image src={`/api/photo?path=/uploads/feedbacks/${feedback.picture}`} alt="" fill className="object-cover" />
                        </div>
                        <div>
                          <h5 className=" text-lg font-medium">{feedback.name}</h5>
                          <p className="text-sm font-bold text-slate-500">{feedback.role}</p>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                ))}
                <div className="swiper-button-prev " style={{ display: "none" }}></div>
                <div className="swiper-button-next " style={{ display: "none" }}></div>
              </swiper-container>
            </div>
            <div
              style={{ right: "0" }}
              className="swiper-custom-button-next text-black-500 absolute top-0 bottom-0 text-base cursor-pointer flex items-center justify-center z-10"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
