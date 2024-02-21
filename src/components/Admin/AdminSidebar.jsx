import { faCircleQuestion, faComments, faDesktop, faEnvelope, faHome, faList, faMedal, faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="fixed bottom-0 top-[60px] left-0 w-[200px] py-10 border-r-2 border-slate-300">
      <ul className="flex flex-col gap-4 ">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path || "/"}
              className={`relative grid grid-cols-[20px_1fr] gap-3 items-center px-6 ${
                (item.strict && pathname === item.path) || (!item.strict && pathname.startsWith(item.path)) ? "text-purple" : "text-slate-500"
              }`}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-[150%] rounded-r-3xl bg-purple ${
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
  {
    name: "Comments",
    Icon: <FontAwesomeIcon icon={faComments} className="" />,
    path: "/admin/comments",
  },
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
