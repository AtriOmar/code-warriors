import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import TipsLayout from "@/layouts/TipsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AllTips from "@/components/tips/AllTips";
import CategoriesNav from "@/components/CategoriesNav";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import PageNavigation from "@/lib/PageNavigation";

async function fetcher({ limit, search, sort, page, categoryId }) {
  console.log("-------------------- fetching --------------------");

  const res = await axios.get("/api/tips/getAll", { params: { categoryId, limit, search, sort, page } });

  return res.data;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title-asc", label: "Title Asc" },
  { value: "title-desc", label: "Title Desc" },
];

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function tips({ tips: initialTips, categories, tipsCount, category }) {
  const { data: session } = useSession();

  const router = useRouter();

  const limit = router?.query?.limit || 20;
  const search = router?.query?.search || "";
  const sort = router?.query?.sort || "newest";
  const page = router?.query?.page || 1;
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
    data: tips,
    isLoading,
    mutate,
  } = useSWR({ url: "/api/tips/getAll", limit, search, sort, page, limit, categoryId }, () => fetcher({ categoryId, limit, search, sort, page, limit }), {
    keepPreviousData: true,
    // revalidateOnMount: false,
    fallbackData: initialTips,
  });

  const searchTools = (
    <div className="flex items-end justify-end flex-wrap gap-2 mt-6 ml-auto w-fit">
      <div>{PageNavigation({ count: tipsCount })}</div>
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
    <div className={` pt-10 pb-20 ${jakarta.className}`}>
      {category ? (
        <p className="w-fit mx-auto px-8 py-2 rounded-lg bg-purple hover:bg-purple-700 text-white text-lg  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {category.name}
        </p>
      ) : (
        ""
      )}
      <h1 className="font-bold text-xl">Tips ({tipsCount})</h1>
      <div className="flex w-full max-w-[800px] mx-auto pl-4 pr-8 py-4 mt-4 rounded-full bg-slate-100">
        <input type="text" placeholder="Looking for a specific tip ?" className="grow outline-none bg-transparent" />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <CategoriesNav categories={categories} path="/tips" />
      <div className="mt-20" />
      {searchTools}
      <AllTips tips={tips} />
      {searchTools}
    </div>
  );
}

tips.getLayout = function getLayout(page, pageProps) {
  return (
    <Layout {...pageProps}>
      <TipsLayout {...pageProps}>{page}</TipsLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Tip = require("@/models/Tip");
  const Category = require("@/models/Category");
  const Setting = require("@/models/Setting");

  const options = {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
  };

  if (Number(context.query.c) > 0) {
    options.where = {
      categoryId: context.query.c,
    };
  }

  const tips = await Tip.findAll({
    ...options,
  });

  if (Number(context.query.c) > 0) {
    var tipsCount = await Tip.count({
      where: {
        categoryId: context.query.c,
      },
    });
  } else {
    var tipsCount = await Tip.count();
  }

  const categories = await Category.findAll();
  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  if (Number(context.query.c) > 0) {
    var category = await Category.findByPk(context.query.c);
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      tips: JSON.parse(JSON.stringify(tips)),
      categories: JSON.parse(JSON.stringify(categories)),
      settings: JSON.parse(JSON.stringify(settings)),
      category: category ? JSON.parse(JSON.stringify(category)) : null,
      tipsCount,
    },
  };
}
