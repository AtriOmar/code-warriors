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
  { value: "title-asc", label: "Title Asc" },
  { value: "title-desc", label: "Title Desc" },
];

export default function AllQuestions({ questions: initialQuestions, questionsCount, categories, category }) {
  const router = useRouter();

  const sort = router?.query?.sort || "newest";
  const limit = router?.query?.limit || 20;
  const page = router?.query?.page || 1;
  const search = router?.query?.search || "";
  const categoryId = router?.query?.c || 0;

  const [searchInput, setSearchInput] = useState(search || "");

  const debouncedUpdateSearch = useDebouncedCallback(() => {
    const { search, ...rest } = router.query;

    if (!searchInput) router.replace({ query: { ...rest } });
    else router.replace({ query: { ...router.query, search: searchInput } });
  }, 500);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [searchInput]);

  const {
    data: questions,
    isLoading,
    mutate,
  } = useSWR({ url: "/api/questions/getAll", limit, search, sort, page, limit, categoryId }, () => fetcher({ categoryId, limit, search, sort, page, limit }), {
    keepPreviousData: true,
    revalidateOnMount: false,
    fallbackData: initialQuestions,
  });

  const searchTools = (
    <div className="flex items-end justify-end flex-wrap gap-2 mt-6 ml-auto w-fit">
      <div>{PageNavigation({ count: questionsCount })}</div>
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
    <article className="grow mt-10 mb-20">
      {category ? (
        <p className="w-fit mx-auto px-8 py-2 rounded-lg bg-purple hover:bg-purple-700 text-white text-lg  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {category.name}
        </p>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="font-bold text-xl">Questions ({questionsCount})</h1>
        <Link
          href="/questions/new"
          className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Ask Question
        </Link>
      </div>
      <div className="flex w-full max-w-[800px] mx-auto pl-4 pr-8 py-4 mt-4 rounded-full bg-slate-100">
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          type="text"
          placeholder="Looking for a specific tip ?"
          className="grow outline-none bg-transparent"
        />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <CategoriesNav categories={categories} path="/questions" />
      {searchTools}
      {questions?.length ? (
        <div className="mt-6 grid grid-cols-1 scr500:grid-cols-2 scr700:grid-cols-3 gap-4">
          {questions?.map((question) => {
            return <QuestionCard question={question} key={question.id} />;
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

function QuestionCard({ question }) {
  const author = question?.User;

  return (
    <Link href={`/questions/${question.id}`} className="flex flex-col bg-white hover:bg-slate-100 rounded-lg p-4 shadow-md duration-200">
      <div href="/profile" className="flex gap-2 items-center">
        {author.picture ? (
          <div className="relative w-8 aspect-square rounded-full overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${author.picture}`} fill alt="Profile Image" className="object-cover" priority />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        )}
        <p className="font-medium capitalize">{author?.username}</p>
      </div>
      <p className="text-xs text-slate-700">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
      <h2 className="mt-2 mb-2 font-semibold text-base">{question.title}</h2>
      <p className="mt-auto text-xs text-slate-700">{question?.answerCount} Answers</p>
      <div className="mt-4"></div>
      <p className="w-fit mt-auto px-3 py-2 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
        {question?.Category?.name}
      </p>
    </Link>
  );
}
