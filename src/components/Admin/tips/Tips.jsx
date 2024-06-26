import { RingLoader } from "@/components/Loading";
import { formatDate } from "@/lib/formatDate";
import { VerticalLeftOutlined } from "@ant-design/icons";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import useSWR, { mutate as mutateArticles } from "swr";
import { useDebouncedCallback } from "use-debounce";
import lamp from "@/images/lamp.png";

const { faSort, faPlus, faCircleUser, faImage } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect, Fragment, useRef } = require("react");

async function fetcher({ limit, search, categoryId, sort }) {
  const res = await axios.get("/api/tips/getAll", { params: { limit, search, categoryId, sort } });

  return res.data;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-liked", label: "Most Liked" },
  { value: "title-asc", label: "Title Asc" },
  { value: "title-desc", label: "Title Desc" },
];

export default function Tips({ tips: initialTips, search, categories }) {
  const [sending, setSending] = useState(false);
  // const [articles, setArticles] = useState(initialArticles);
  const [filter, setFilter] = useState({
    limit: 20,
    categoryId: 0,
    sort: "newest",
  });
  const { data: tips, isLoading } = useSWR(
    { url: "/api/tips/getAll", limit: filter.limit, search, categoryId: filter.categoryId, sort: filter.sort },
    () => fetcher({ limit: filter.limit, search, categoryId: filter.categoryId, sort: filter.sort }),
    {
      keepPreviousData: true,
      revalidateOnMount: false,
      fallbackData: initialTips,
    }
  );

  useEffect(() => {
    setFilter((prev) => ({ ...prev, limit: 20 }));
  }, [filter.categoryId]);

  console.log("-------------------- filter --------------------");
  console.log(filter);

  const observer = useRef(null);

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  useEffect(() => {
    if (tips?.length < filter.limit) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // When the 5th last item is in view, increase the limit by 20
          setFilter((prev) => ({ ...prev, limit: prev.limit + 20 }));
        }
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (observer.current) {
      const scrollTrigger = document.querySelector(".scroll-trigger");
      if (scrollTrigger) observer.current.observe(scrollTrigger); // Add a class to the 5th last item for observation
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [tips]);

  function setTips(value) {
    if (typeof value === "function") mutateArticles({ url: "/api/tips/getAll", limit: filter.limit, search }, value(tips), false);
    else mutateArticles({ url: "/api/tips/getAll", limit: filter.limit, search }, tips, false);
  }

  return (
    <section className="py-4 rounded-lg shadow-md ">
      <div className="flex gap-4 flex-wrap justify-between items-center px-4">
        <h2 className="font-medium text-xl text-slate-900 ">Articles</h2>
        <div className="ml-auto flex gap-2">
          <div>
            <p className="mb-0.5 font-medium text-xs">Sort</p>
            <select
              className="w-[120px] border border-slate-300 rounded py-1 px-2 font-bold text-sm"
              id="category"
              value={filter.sort}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, sort: e.target.value }));
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
            <p className="mb-0.5 font-medium text-xs">Category</p>
            <select
              className="w-[120px] border border-slate-300 rounded py-1 px-2 font-bold text-sm"
              id="category"
              value={filter.categoryId}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, categoryId: e.target.value }));
              }}
            >
              {
                <option key={0} value="all">
                  All
                </option>
              }
              {categoriesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="hidden scr800:grid grid-cols-[1fr_125px_80px_180px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">Name</div>
        <div className=" py-3 text-slate-900">Category</div>
        <div className=" py-3 text-slate-900">Pub. date</div>
        <div className=" py-3 text-slate-900"></div>
      </div>
      {tips?.map((tip, index) => (
        <Fragment key={index}>
          <TipItem tip={tip} setTips={setTips} setFilter={setFilter} />
          {index === tips?.length - 5 && <div className="scroll-trigger" />}
        </Fragment>
      ))}

      {!tips?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no Tips</p>
        </div>
      )}
    </section>
  );
}

function TipItem({ tip, setTips, setFilter }) {
  const [sending, setSending] = useState(false);

  return (
    <div
      key={tip.id}
      className="article-container grid scr800:grid-cols-[1fr_125px_80px_180px] py-3 scr800:py-2 gap-y-2 px-4 even:bg-slate-100/90 font-bold text-sm"
    >
      <div className="flex items-center gap-3 text-slate-900 capitalize">
        <div href="/profile" className="flex gap-2 items-center ">
          <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
            <p className="scr800:hidden">Name</p>

            <div className="flex gap-2 items-center">
              <div className="shrink-0 relative w-8 aspect-square rounded-lg overflow-hidden">
                <Image src={lamp} fill alt="Lamp Image" className="object-cover" priority />
              </div>
              <p className="font-medium capitalize line-clamp-2 pr-2">{tip.title}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
        <p className="scr800:hidden">Category</p>
        <div className="flex items-center gap-3 text-slate-900 text-xs font-semibold">
          <p suppressHydrationWarning>{tip.Category?.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
        <p className="scr800:hidden">Pub.</p>
        <div className="flex items-center gap-3 text-slate-900">
          <p>{formatDate(new Date(tip.createdAt), "day-month")}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          href={`/admin/best-practices/${tip.id}`}
          className="w-fit px-3 border border-purple-800 rounded-full hover:bg-violet-100 text-purple-800 text-sm font-semibold duration-300"
        >
          Edit
        </Link>
        <DeleteMenu tip={tip} setTips={setTips} setFilter={setFilter} />
      </div>
    </div>
  );
}

function DeleteMenu({ tip, setTips, setFilter }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/tips/deleteById", { params: { id: tip.id } });

      setFilter((prev) => ({ ...prev, limit: prev.limit - 1 }));
      setTips((prev) => prev.filter((el) => el.id !== tip.id));
      toast.success("Tip deleted");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <Menu as="div" className="relative self-center">
      <div>
        <Menu.Button className="self-center px-3 border border-red-500 rounded-full hover:bg-red-100 text-red-500 text-sm font-semibold duration-300">
          Delete
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="z-10"
      >
        <Menu.Items className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  rounded-md bg-white shadow-lg ring-1 ring-red-500 focus:outline-none">
          <div className="flex gap-2 p-1">
            {sending ? (
              <i className="flex items-center">
                <RingLoader color="red" />
              </i>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${active ? "bg-red-600" : "bg-red-500"} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-slate-300" : "bg-slate-200"} text-slate-700 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Cancel
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
