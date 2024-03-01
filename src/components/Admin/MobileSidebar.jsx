import { useUIContext } from "@/contexts/UIProvider";
import {
  faCircleQuestion,
  faComments,
  faDesktop,
  faEnvelope,
  faHome,
  faLightbulb,
  faList,
  faMedal,
  faNewspaper,
  faPhone,
  faQuestion,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function MobileSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] scr800:z-0 bg-opacity-25 duration-300 cursor-pointer scr800:bg-transparent scr800:invisible ${
          mobileNavbarOpen ? "bg-black" : "bg-transparent invisible"
        }`}
        onClick={() => setMobileNavbarOpen(false)}
      ></div>
      <div
        className={`${
          mobileNavbarOpen ? "" : "-translate-x-full"
        } scr800:-translate-x-full fixed z-[100] scr800:z-0 bottom-0 top-0 scr800:top-[60px] left-0 w-[200px] py-16 scr800:py-10 border-r-2 border-slate-300 bg-white duration-300 `}
      >
        <button className={`scr800:hidden absolute top-3 right-3 z-10`} onClick={() => setMobileNavbarOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className="text-lg text-black" />
        </button>
        <ul className="flex flex-col gap-1 ">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path || "/"}
                className={`relative grid grid-cols-[20px_1fr] gap-3 items-center px-6 p-1.5 hover:bg-slate-200 duration-300 ${
                  (item.strict && pathname === item.path) || (!item.strict && pathname.startsWith(item.path)) ? "text-purple" : "text-slate-500"
                }`}
              >
                <div
                  className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 w-1.5 h-[150%] rounded-r-3xl bg-purple ${
                    pathname === item.path ? "" : "-translate-x-full"
                  } duration-300`}
                ></div>
                {item.Icon}
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const items = [
  {
    name: "Home",
    Icon: <FontAwesomeIcon icon={faHome} className="" />,
    path: "/",
    strict: true,
  },
  {
    name: "About",
    Icon: <FontAwesomeIcon icon={faCircleQuestion} className="" />,
    path: "/about",
  },
  {
    name: "Categories",
    Icon: <FontAwesomeIcon icon={faList} className="" />,
    path: "/categories",
  },
  {
    name: "Articles",
    Icon: <FontAwesomeIcon icon={faNewspaper} className="" />,
    path: "/articles",
  },
  {
    name: "Tips",
    Icon: <FontAwesomeIcon icon={faLightbulb} className="" />,
    path: "/tips",
  },
  {
    name: "Questions",
    Icon: <FontAwesomeIcon icon={faCircleQuestion} className="" />,
    path: "/questions",
  },
  {
    name: "FAQ",
    Icon: <FontAwesomeIcon icon={faQuestion} className="" />,
    path: "/faq",
  },
  {
    name: "Contact Us",
    Icon: <FontAwesomeIcon icon={faPhone} className="" />,
    path: "/contact",
  },
];
