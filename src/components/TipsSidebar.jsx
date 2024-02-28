import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TipsSidebar({ categories }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="shrink-0 w-[200px] hidden scr900:block rounded-lg px-6 py-4 bg-slate-100">
      <div className="sticky top-20">
        <h2 className="font-bold text-purple">Categories</h2>
        <ul className="mt-2 flex flex-col gap-2 list-disc font-bold text-sm">
          {categories.map((category) => (
            <li key={category.id} className={`ml-7 hover:text-purple ${pathname === "/tips/" + category.id ? "text-purple" : "text-black"}`}>
              <Link href={"/tips/" + category.id} className={`block relative duration-200 `}>
                <p>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
