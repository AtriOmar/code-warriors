import React from "react";

import ava01 from "@/images/ava-1.jpg";
import ava02 from "@/images/ava-2.jpg";
import ava03 from "@/images/ava-3.jpg";

import dynamic from "next/dynamic";
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false });

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
const Testimonial = () => {
  return (
    <>
      <section className="bg-purple-600 bg-opacity-60">
        <div className="container">
          <div className="w-75 mb-10">
            <h6 className="text-gray-400 text-2xl"> Testimonials</h6>
            <h2 className="mt-4 text-4xl">Customers Talk About Us</h2>
            <p className="mt-4 text-gray-700 text-2xl">
              Customer support represents the resources within your company that provide technical assistance to consumers after they purchase a product or
              service.
            </p>
          </div>

          <div className="m-auto md:w-90">
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={3}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
              breakpoints={{
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
              }}
            >
              <SwiperSlide>
                <div className="bg-gray-200 py-10 px-5 rounded-md text-center cursor-pointer">
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In voluptates veritatis modi eveniet similique voluptatum a voluptatem, recusandae
                    qui rem quod voluptatibus dolores ullam illum dignissimos accusamus ratione repellat officiis?
                  </p>
                  <div className="flex items-center justify-center gap-x-4 mt-10">
                    <div className="w-12 h-12 rounded-full">
                      <Image src={ava01} alt="" width={100} height={100} className="object-cover rounded-full" />
                    </div>
                    <div>
                      <h5 className="text-white text-lg font-medium">John Doe</h5>
                      <p className="description">CEO , Workcreation</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gray-200 py-10 px-5 rounded-md text-center cursor-pointer">
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In voluptates veritatis modi eveniet similique voluptatum a voluptatem, recusandae
                    qui rem quod voluptatibus dolores ullam illum dignissimos accusamus ratione repellat officiis?
                  </p>
                  <div className="flex items-center justify-center gap-x-4 mt-10">
                    <div className="w-12 h-12 rounded-full">
                      <Image src={ava02} alt="" width={100} height={100} className="object-cover rounded-full" />
                    </div>
                    <div>
                      <h5 className="text-white text-lg font-medium">John Doe</h5>
                      <p className="description">CEO , Workcreation</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-gray-200 py-10 px-5 rounded-md text-center cursor-pointer">
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In voluptates veritatis modi eveniet similique voluptatum a voluptatem, recusandae
                    qui rem quod voluptatibus dolores ullam illum dignissimos accusamus ratione repellat officiis?
                  </p>
                  <div className="flex items-center justify-center gap-x-4 mt-10">
                    <div className="w-12 h-12 rounded-full">
                      <Image src={ava03} alt="" width={100} height={100} className="object-cover rounded-full" />
                    </div>
                    <div>
                      <h5 className="text-white text-lg font-medium">John Doe</h5>
                      <p className="description">CEO , Workcreation</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-gray-200 py-10 px-5 rounded-md text-center cursor-pointer">
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In voluptates veritatis modi eveniet similique voluptatum a voluptatem, recusandae
                    qui rem quod voluptatibus dolores ullam illum dignissimos accusamus ratione repellat officiis?
                  </p>
                  <div className="flex items-center justify-center gap-x-4 mt-10">
                    <div className="w-12 h-12 rounded-full">
                      <Image src={ava02} alt="" width={100} height={100} className="object-cover rounded-full" />
                    </div>
                    <div>
                      <h5 className="text-white text-lg font-medium">John Doe</h5>
                      <p className="description">CEO , Workcreation</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
