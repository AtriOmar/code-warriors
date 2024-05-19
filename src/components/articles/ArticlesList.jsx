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

  const res = await axios.get("/api/articles/getAll", { params: { categoryId, limit, search, sort, page } });

  return res.data;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title-asc", label: "Title Asc" },
  { value: "title-desc", label: "Title Desc" },
];

export default function ArticlesList({ articles: initialArticles, articlesCount, categories, category }) {
  const router = useRouter();

  const sort = router?.query?.sort || "newest";
  const limit = router?.query?.limit || 20;
  const page = router?.query?.page || 1;
  const search = router?.query?.search || "";
  const categoryId = router?.query?.c || 0;

  const [searchInput, setSearchInput] = useState(search || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  const debouncedUpdateSearch = useDebouncedCallback(() => {
    // setDebouncedSearch(searchInput);
    const { search, ...rest } = router.query;

    if (!searchInput) router.replace({ query: { ...rest } });
    else router.replace({ query: { ...router.query, search: searchInput } });
  }, 500);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [searchInput]);

  const {
    data: articles,
    isLoading,
    mutate,
  } = useSWR({ url: "/api/articles/getAll", limit, search, sort, page, limit, categoryId }, () => fetcher({ categoryId, limit, search, sort, page, limit }), {
    keepPreviousData: true,
    revalidateOnMount: false,
    fallbackData: initialArticles,
  });

  const searchTools = (
    <div className="flex items-end justify-end flex-wrap gap-2 mt-6 ml-auto w-fit">
      <div>{PageNavigation({ count: articlesCount })}</div>
      <div>
        <p className="mb-0.5 font-medium text-xs">Sort</p>
        <select
          className="w-[120px] border border-slate-300 rounded py-1 px-2 font-bold text-sm"
          id="category"
          value={router?.query?.sort || "newest"}
          onChange={(e) => {
            router.replace({ query: { ...router.query, sort: e.target.value } }, undefined, { scroll: false });
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-0.5 font-medium text-xs">Per Page</p>
        <select
          className="w-[120px] border border-slate-300 rounded py-1 px-2 font-bold text-sm"
          id="category"
          value={router?.query?.limit || 25}
          onChange={(e) => {
            router.replace({ query: { ...router.query, limit: e.target.value } }, undefined, { scroll: false });
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );

  return (
    <article className="mt-10 mb-20 w-full">
      {category ? (
        <p className="w-fit mx-auto px-8 py-2 rounded-lg bg-purple hover:bg-purple-700 text-white text-lg  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {category.name}
        </p>
      ) : (
        ""
      )}
      <h1 className="font-bold text-xl">Articles ({articlesCount})</h1>
      <div className="flex max-w-[800px] mx-auto pl-4 pr-8 py-4 mt-4 rounded-full bg-slate-100">
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          type="text"
          placeholder="Do you have an article in mind ?"
          className="grow outline-none bg-transparent"
        />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <CategoriesNav categories={categories} path="/articles" />
      {searchTools}
      {articles?.length ? (
        <div className="mt-6 grid scr500:grid-cols-2 scr700:grid-cols-3 scr1200:grid-cols-4 gap-4">
          {articles?.map((article) => {
            return <ArticleCard article={article} key={article.id} />;
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
      {searchTools}
    </article>
  );
}

function ArticleCard({ article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex flex-col w-full max-w-[300px] mx-auto bg-black bg-white hover:bg-slate-100 rounded-lg overflow-hidden shadow-md hover:shadow-[2px_2px_10px_rgb(0,0,0,.3)] duration-200"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={`/api/photo?path=/uploads/articles/${article.poster}`}
          fill
          alt="Article Poster"
          className="object-cover"
          priority
          sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col grow px-4 pt-2 pb-4">
        <p className="text-xs text-slate-700">Posted on {formatDate(new Date(article.createdAt), "date")}</p>
        <h2 className="mt-2 mb-2 font-semibold text-base line-clamp-2">{article.title}</h2>
        <div className="mt-2 mb-2 font-medium text-sm text-slate-500 line-clamp-2 white-space-pre">{article.content.replace(/<[^>]+>/g, "")}</div>
        <p className="w-fit mt-auto px-3 py-2 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {article.Category.name}
        </p>
      </div>
    </Link>
  );
}
