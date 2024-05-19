import { useUIContext } from "@/contexts/UIProvider";
import { faCircleQuestion, faComments, faDesktop, faEnvelope, faHome, faList, faMedal, faNewspaper, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const styles = {
  div: "scr1000:translate-x-0 scr1000:z-0 scr1000:top-[60px] scr1000:hidden",
  div: "scr800:translate-x-0 scr800:z-0 scr800:top-[60px] scr800:hidden",
};

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();

  let scr;
  if (pathname === "/admin/articles") scr = "scr1000";
  else if (pathname === "/admin/questions") scr = "scr1000";
  else scr = "scr800";

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-opacity-25 duration-300 cursor-pointer ${mobileNavbarOpen ? "bg-black" : "bg-transparent invisible"}`}
        onClick={() => setMobileNavbarOpen(false)}
      ></div>
      <div
        className={`${
          mobileNavbarOpen ? "" : "-translate-x-full"
        } ${scr}:translate-x-0 fixed z-50 ${scr}:z-0 bottom-0 top-0 ${scr}:top-[60px] left-0 w-[200px] py-16 scr800:py-10 border-r-2 border-slate-300 bg-white duration-300 `}
      >
        <button className={`${scr}:hidden absolute top-3 right-3 z-10`} onClick={() => setMobileNavbarOpen(false)}>
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
    name: "Dashboard",
    Icon: <FontAwesomeIcon icon={faHome} className="" />,
    path: "/admin",
    strict: true,
  },
  {
    name: "Categories",
    Icon: <FontAwesomeIcon icon={faList} className="" />,
    path: "/admin/categories",
  },
  {
    name: "Newsletter",
    Icon: <FontAwesomeIcon icon={faEnvelope} className="" />,
    path: "/admin/newsletter",
  },
  {
    name: "Articles",
    Icon: <FontAwesomeIcon icon={faNewspaper} className="" />,
    path: "/admin/articles",
  },
  // {
  //   name: "Comments",
  //   Icon: <FontAwesomeIcon icon={faComments} className="" />,
  //   path: "/admin/comments",
  // },
  {
    name: "Questions",
    Icon: <FontAwesomeIcon icon={faCircleQuestion} className="" />,
    path: "/admin/questions",
  },
  {
    name: "Accounts",
    Icon: <FontAwesomeIcon icon={faUser} className="" />,
    path: "/admin/accounts",
  },
  {
    name: "Best Practices",
    Icon: <FontAwesomeIcon icon={faMedal} className=" rotate-180" />,
    path: "/admin/best-practices",
  },
  {
    name: "Website Management",
    Icon: <FontAwesomeIcon icon={faDesktop} className="" />,
    path: "/admin/website-management",
  },
];
