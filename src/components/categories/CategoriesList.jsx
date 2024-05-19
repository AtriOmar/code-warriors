import PageNavigation from "@/lib/PageNavigation";
import { formatDate } from "@/lib/formatDate";
import { faCircleUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import CategoriesNav from "../CategoriesNav";

async function fetcher({ limit, search, sort, page, categoryId }) {
  console.log("-------------------- fetching --------------------");

  const res = await axios.get("/api/questions/getAll", { params: { categoryId, limit, search, sort, page, includeUser: true } });

  return res.data;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-liked", label: "Most Liked" },
  { value: "title-asc", label: "Title Asc" },
  { value: "title-desc", label: "Title Desc" },
];

export default function CategoriesList({ categories }) {
  const router = useRouter();

  return (
    <article className="grow mt-10 mb-20">
      <h1 className="font-bold text-xl">Categories </h1>
      {categories?.length ? (
        <div className="mt-6 grid grid-cols-1 scr500:grid-cols-2 scr700:grid-cols-3 gap-4">
          {categories?.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 gap-8">
          <div className="relative w-full max-w-[250px] aspect-square">
            <Image src="/coding.png" alt="no content" className="object-contain" fill />
          </div>
          <p className="text-xl text-slate-500">No articles found with these criteria</p>
        </div>
      )}
    </article>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="flex flex-col bg-white hover:bg-slate-100 rounded-lg p-4 shadow-[1px_1px_5px_rgb(0,0,0,.3)] duration-200"
    >
      <h2 className="mt-2 mb-2 font-semibold text-base">{category.name}</h2>
      <p className="mt-auto text-xs text-slate-700">{category?.questionsCount} Questions</p>
    </Link>
  );
}
