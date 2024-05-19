import { RingLoader } from "@/components/Loading";
import { formatDate } from "@/lib/formatDate";
import { VerticalLeftOutlined } from "@ant-design/icons";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

const { faSort, faPlus, faCircleUser, faImage } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect, Fragment, useRef } = require("react");

async function fetcher({ limit, search, accessId, sort }) {
  const res = await axios.get("/api/users/getAll", { params: { limit, search, accessId, sort } });

  return res.data;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name-asc", label: "Name Asc" },
  { value: "name-desc", label: "Name Desc" },
];

export default function UserAccounts({ users: initialUsers, search, categories }) {
  const [sending, setSending] = useState(false);
  // const [articles, setArticles] = useState(initialArticles);
  const [filter, setFilter] = useState({
    limit: 20,
    accessId: 0,
    sort: "newest",
  });
  const {
    data: users,
    isLoading,
    mutate: mutateUsers,
  } = useSWR(
    { url: "/api/users/getAll", limit: filter.limit, search, accessId: filter.accessId, sort: filter.sort },
    () => fetcher({ limit: filter.limit, search, accessId: filter.accessId, sort: filter.sort }),
    {
      keepPreviousData: true,
      revalidateOnMount: false,
      fallbackData: initialUsers,
    }
  );

  useEffect(() => {
    setFilter((prev) => ({ ...prev, limit: 20 }));
  }, [filter.accessId]);

  console.log("-------------------- filter --------------------");
  console.log(filter);

  const observer = useRef(null);

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  useEffect(() => {
    if (users?.length < filter.limit) return;

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
  }, [users]);

  function setUsers(value) {
    if (typeof value === "function") mutateUsers(value(users), false);
    else mutateUsers(users, false);
  }

  return (
    <section className="py-4 rounded-lg shadow-md ">
      <div className="flex gap-4 flex-wrap justify-between items-center px-4">
        <h2 className="font-medium text-xl text-slate-900 ">Users</h2>
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
            <p className="mb-0.5 font-medium text-xs">Role</p>
            <select
              className="w-[120px] border border-slate-300 rounded py-1 px-2 font-bold text-sm"
              id="category"
              value={filter.accessId}
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, accessId: e.target.value }));
              }}
            >
              <option value="0">All</option>
              <option value="1">Users</option>
              <option value="3">Admins</option>
            </select>
          </div>
        </div>
      </div>
      <div className="hidden scr800:grid grid-cols-[1fr_100px_80px_140px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">Name</div>
        <div className=" py-3 text-slate-900">Role</div>
        <div className=" py-3 text-slate-900">Since</div>
        <div className=" py-3 text-slate-900"></div>
      </div>
      {users?.map((user, index) => (
        <Fragment key={index}>
          <UserItem user={user} setUsers={setUsers} setFilter={setFilter} />
          {index === users?.length - 5 && <div className="scroll-trigger" />}
        </Fragment>
      ))}

      {!users?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no Articles</p>
        </div>
      )}
    </section>
  );
}

function UserItem({ user, setUsers, setFilter }) {
  const [sending, setSending] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    accessId: user?.accessId,
  });
  const { data: session } = useSession();
  const { user: authUser } = session || {};

  async function updateRole() {
    if (sending) return;

    const data = {
      id: user.id,
      accessId: input.accessId,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/users/updateRole", data);

      setEdit(false);
      setUsers((prev) => prev.map((usr) => (usr.id === res.data.id ? res.data : usr)));
      toast.success("Changes saved");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div
      key={user.id}
      className="article-container grid scr800:grid-cols-[1fr_100px_80px_140px] py-3 scr800:py-2 gap-y-2 px-4 even:bg-slate-100/90 font-bold text-sm"
    >
      <div className="flex items-center gap-3 text-slate-900 capitalize">
        <div href="/profile" className="flex gap-2 items-center ">
          <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
            <p className="scr800:hidden">Name</p>

            <div className="flex gap-2 items-center">
              {user.picture ? (
                <div className="shrink-0 relative w-8 aspect-square rounded-lg overflow-hidden">
                  <Image src={`/api/photo?path=/uploads/profile-pictures/${user.picture}`} fill alt="Article Poster" className="object-cover" priority />
                </div>
              ) : (
                <FontAwesomeIcon icon={faImage} className="text-3xl text-slate-500" />
              )}
              <p className="font-medium capitalize line-clamp-2 pr-2">{user.username}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
        <p className="scr800:hidden">Role</p>
        <div className="flex items-center gap-3 text-slate-900 font-semibold">
          {edit ? (
            <select
              className=" border border-slate-300 rounded py-1 px-2 font-bold text-sm"
              id="category"
              value={input.accessId}
              onChange={(e) => {
                setInput((prev) => ({ ...prev, accessId: e.target.value }));
              }}
            >
              <option value={1}>User</option>
              {authUser.accessId > 3 && <option value={3}>Admin</option>}
            </select>
          ) : (
            <p suppressHydrationWarning>{ROLES[user.accessId]}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1">
        <p className="scr800:hidden">Since</p>
        <div className="flex items-center gap-3 text-slate-900">
          <p>{formatDate(new Date(user.createdAt), "day-month")}</p>
        </div>
      </div>
      {authUser.accessId > user.accessId && (
        <div className="flex gap-1 items-center">
          {!edit ? (
            <button
              onClick={() => {
                setEdit(true);
              }}
              className="w-fit px-3 border border-purple-800 rounded-full hover:bg-violet-100 text-purple-800 text-sm font-semibold duration-300"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={updateRole}
                className="w-fit px-3 border  rounded-md hover:bg-purple-800 bg-purple-600 text-white text-sm font-semibold duration-300"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setInput({ accessId: user?.accessId });
                  setEdit(false);
                }}
                className="w-fit px-3 border  rounded-md hover:bg-red-800 bg-red-600 text-white text-sm font-semibold duration-300"
              >
                Cancel
              </button>
              {sending ? (
                <i className="flex items-center">
                  <RingLoader color="black" />
                </i>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DeleteMenu({ user, setUsers, setFilter }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/articles/deleteById", { params: { id: user.id } });

      setFilter((prev) => ({ ...prev, limit: prev.limit - 1 }));
      setUsers((prev) => prev.filter((el) => el.id !== user.id));
      toast.success("Article deleted");
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

const ROLES = {
  1: "User",
  3: "Admin",
  5: "Owner",
};
