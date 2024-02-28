import React, { useEffect } from "react";
import img1 from "@/images/about2.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
const About2 = () => {
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
      <section className="about2_section px-4" id="about">
        <div className="max-w">
          <div
            className="pt-12 flex justify-center items-center flex-col lg:justify-between lg:flex-row gap-8 w-100"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className="w-full self-stretch lg:w-1/2 xl:w-1/2 flex justify-center items-center">
              <div className="relative w-full h-full rounded-lg">
                <Image src={img1} alt="" className="object-contain" fill />
              </div>
            </div>
            <div className="w-100 md:w-100 lg:w-1/2 xl:w-1/2  pt-10">
              <h2>Loreum epusm flow in dety nor acrc</h2>
              <p className="description text-xs mt-8 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac quis urna, enim, ut. Et nec justo aliquet vitae cum in. Tincidunt commodo ac nulla
                sit malesuada in vulputate. Volutpat ullamcorper pulvinar suspendisse mauris ipsum consequat suspendisse ullamcorper. Sed nibh ultrices in justo
                sed. Elit tortor, suscipit nullam aliquet. Vel malesuada morbi donec mattis eu lacus, odio at. Ut nibh massa ornare eleifend vestibulum.
              </p>
              <div className="mt-4 flex flex-col justify-start items-center gap-4">
                <div className="flex justify-center items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Ac erat hendrerit diam risus vitae facilisis a ultricies.
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Massa eget vulputate maecenas imperdiet dictum malesuada.
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Purus enim facilisis cursus cursus est, vitae arcu.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About2;
