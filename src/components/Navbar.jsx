import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/Dropdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Navbar() {
  const { data: session } = useSession();
  const { user } = session || {};
  const router = useRouter();
  const pathname = router.pathname;
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories/getAll", { params: { type: "practices" } });
        setCategories(res.data?.map((category) => ({ label: category.name, path: `/categories/${category.id}` })) || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="z-50 fixed top-0 h-[60px] w-full px-4 bg-white border-b-2 border-slate-300">
      <nav className="flex items-center justify-between max-w-[1300px] h-full mx-auto">
        <Link href="/" className="relative w-[100px] h-full">
          <Image src="/logo.png" alt="logo" fill className="object-contain" />
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
              pathname.startsWith("/questions") ? "text-purple-600" : "text-slate-700"
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
          <Dropdown
            items={userLinks}
            position="right"
            renderItem={(item) => (
              <Link href={item.path || ""} className={`${item.className} block py-1 px-3 rounded font-normal hover:bg-slate-100 transition duration-300`}>
                {item.label}
              </Link>
            )}
          >
            <div className="flex gap-2 items-center">
              {user.picture ? (
                <div className="relative w-10 aspect-square rounded-full overflow-hidden">
                  <Image src={`/api/photo?path=/uploads/profile-pictures/${user.picture}`} fill alt="Profile Image" className="object-cover" priority />
                </div>
              ) : (
                <FontAwesomeIcon icon={faCircleUser} className="text-4xl text-slate-500" />
              )}
              <p className="font-medium capitalize">{user.username}</p>
              <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
            </div>
          </Dropdown>
        )}
      </nav>
    </div>
  );
}

const links = [
  { label: "Contact Us", className: "block scr1200:hidden" },
  { label: "FAQ", className: "block scr1100:hidden" },
  { label: "Question", className: "block min-[1050px]:hidden", path: "/questions" },
  { label: "Tips", className: "block scr900:hidden" },
  { label: "Articles", className: "block min-[850px]:hidden" },
];

const userLinks = [
  { label: "Profile", path: "/profile" },
  { label: "Friends", path: "/friends" },
  { label: "Sign Out", path: "/api/logout" },
];
