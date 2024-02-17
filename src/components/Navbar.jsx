import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/Dropdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();
  const { user } = session || {};
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="z-50 fixed top-0 h-[60px] w-full px-4 bg-white border-b-2 border-slate-300">
      <nav className="flex items-center justify-between max-w-[1300px] h-full mx-auto">
        <Link href="/">
          <Image src="/logo.png" alt="logo" height={40} width={100} />
        </Link>
        <ul className="hidden scr800:flex gap-12 items-center">
          <li className={`font-bold hover:text-purple-800 duration-300 ${pathname === "/" ? "text-purple-600" : "text-slate-700"}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`font-bold hover:text-purple-800 duration-300 ${pathname === "/about" ? "text-purple-600" : "text-slate-700"}`}>
            <Link href="/about">About</Link>
          </li>
          <li className="font-bold text-slate-700">
            <Dropdown
              items={categories}
              position="left"
              renderItem={(item) => (
                <Link href={item.path || ""} className="py-2 px-3 rounded block font-normal hover:bg-slate-100 transition duration-300">
                  {item.label}
                </Link>
              )}
            >
              {(isOpen) => (
                <Link href="/" className="block font-bold text-slate-700  transition duration-300">
                  Categories
                  <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-sm transition duration-300 ${isOpen ? "-rotate-180" : ""}`} />
                </Link>
              )}
            </Dropdown>
          </li>
          <li
            className={`hidden min-[850px]:block font-bold hover:text-purple-800 duration-300 ${
              pathname === "/articles" ? "text-purple-600" : "text-slate-700"
            }`}
          >
            <Link href="/articles">Articles</Link>
          </li>
          <li className={`hidden scr900:block font-bold hover:text-purple-800 duration-300 ${pathname === "/tips" ? "text-purple-600" : "text-slate-700"}`}>
            <Link href="/tips">Tips</Link>
          </li>
          <li
            className={`hidden min-[1050px]:block font-bold hover:text-purple-800 duration-300 ${
              pathname === "/questions" ? "text-purple-600" : "text-slate-700"
            }`}
          >
            <Link href="/questions">Questions</Link>
          </li>
          <li
            className={`hidden min-[1100px]:block font-bold hover:text-purple-800 duration-300 ${pathname === "/faq" ? "text-purple-600" : "text-slate-700"}`}
          >
            <Link href="/faq">FAQ</Link>
          </li>
          <li
            className={`hidden min-[1200px]:block font-bold hover:text-purple-800 duration-300 ${
              pathname === "/contact" ? "text-purple-600" : "text-slate-700"
            }`}
          >
            <Link href="/contact">Contact Us</Link>
          </li>
          <li className="block scr1200:hidden font-bold text-slate-700 ">
            <Dropdown
              items={links}
              position="right"
              renderItem={(item) => (
                <Link href={item.path || ""} className={`${item.className} py-2 px-3 rounded font-normal hover:bg-slate-100 transition duration-300`}>
                  {item.label}
                </Link>
              )}
            >
              <FontAwesomeIcon icon={faBars} />
            </Dropdown>
          </li>
        </ul>

        {!user ? (
          <div className="flex gap-4">
            <Link
              href="/signin"
              className="py-2 px-4 rounded-lg border-purple border-2 bg-purple text-white hover:text-purple hover:bg-white duration-300 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="py-2 px-4 rounded-lg border-purple border-2 text-purple hover:text-white hover:bg-purple duration-300 transition-all"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link href="/profile" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
            <p className="font-medium capitalize">{user.username}</p>
          </Link>
        )}
      </nav>
    </div>
  );
}

const categories = [
  { key: 1, label: "Cyber Panel" },
  { key: 2, label: "HTML" },
  { key: 3, label: "Javascript" },
];

const links = [
  { label: "Contact Us", className: "block scr1200:hidden" },
  { label: "FAQ", className: "block scr1100:hidden" },
  { label: "Question", className: "block min-[1050px]:hidden" },
  { label: "Tips", className: "block scr900:hidden" },
  { label: "Articles", className: "block min-[850px]:hidden" },
];
