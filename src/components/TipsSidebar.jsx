import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TipsSidebar({ categories }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="absolute bottom-4 top-4 left-4 w-[200px] px-6 py-4 rounded-lg bg-slate-100">
      <div className="sticky top-20">
        <h2 className="font-bold text-purple">Tips Categories</h2>
        <ul className=" flex flex-col gap-1 mt-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={"/tips/" + category.id}
                className={`block relative px-3 hover:text-purple ${pathname === "/tips/" + category.id ? "text-purple" : "text-slate-500"}`}
              >
                <p>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
