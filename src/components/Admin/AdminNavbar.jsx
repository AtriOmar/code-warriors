import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/Dropdown";
import { useSession } from "next-auth/react";

export default function AdminNavbar() {
  return (
    <nav className="z-50 fixed top-0 flex items-center justify-center h-[60px] w-full px-4 bg-white shadow-[0_0_10px_rgb(0,0,0,.4)]">
      <Image src="/logo.png" alt="logo" height={40} width={100} />
    </nav>
  );
}
