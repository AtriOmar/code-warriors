import { useChatContext } from "@/contexts/ChatProvider";
import {
  faCircleQuestion,
  faCircleUser,
  faComments,
  faDesktop,
  faEnvelope,
  faHome,
  faList,
  faMedal,
  faNewspaper,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ConversationCard from "@/components/chat/ConversationCard";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import { RingLoader } from "./Loading";
import { useUIContext } from "@/contexts/UIProvider";

async function fetchUsers(search) {
  if (!search) return [];

  const res = await axios.get("/api/users/getAll", {
    params: {
      search,
    },
  });

  return res.data;
}

export default function ChatSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const { conversations, chatSettings } = useChatContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const { data, isLoading } = useSWR({ url: "/api/users/getAll", search: debouncedSearch }, () => fetchUsers(debouncedSearch), { keepPreviousData: true });
  const { chatSidebarOpen, setChatSidebarOpen } = useUIContext();

  const debouncedUpdateSearch = useDebouncedCallback(() => {
    setDebouncedSearch(search);
  }, 500);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  // const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 1000);

  // useEffect(() => {
  //   debouncedFetchSearch();
  // }, [search]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] scr800:z-0 bg-opacity-25 duration-300 cursor-pointer ${chatSidebarOpen ? "bg-black" : "bg-transparent invisible"}`}
        onClick={() => setChatSidebarOpen(false)}
      ></div>
      <div
        className={`${
          chatSidebarOpen ? "" : "-translate-x-full"
        } scr800:translate-x-0 flex flex-col fixed z-[100] scr800:z-0 bottom-0 top-0 scr800:top-[60px] left-0 w-[300px] py-4 px-2 border-r-2 border-slate-300 bg-white duration-300`}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 bg-slate-100">
          <FontAwesomeIcon icon={faSearch} className="text-sm text-slate-500" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search"
            className="grow outline-none bg-transparent"
          />
        </div>
        <div className="grow overflow-y-auto scrollbar1">
          {data?.length ? (
            <ul className="flex flex-col gap-2 mt-2 ">
              {data.map((person) => (
                <li
                  onClick={() => {
                    setSearch("");
                    setDebouncedSearch("");
                  }}
                  key={person.id}
                >
                  <PersonCard person={person} />
                </li>
              ))}
            </ul>
          ) : chatSettings?.conversationsLoading ? (
            <div className="flex flex-col items-center gap-1 py-20">
              <RingLoader />
              <h2 className="font-bold text-lg">Loading ...</h2>
            </div>
          ) : conversations?.length ? (
            <ul className="flex flex-col gap-2 mt-2">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <ConversationCard conversation={conversation} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-1 py-10">
              <div className="relative size-[80px]">
                <Image src={"/chat.svg"} fill className="object-contain" alt="Chat Icon" />
              </div>
              <h2 className="font-bold text-lg">No conversations yet</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PersonCard({ person }) {
  return (
    <Link href={"/chat/" + person?.id} className={` relative block grow max-w-[400px] py-2 px-3 rounded-lg hover:bg-slate-300 hover:shadow-card2 duration-300`}>
      <div className="flex items-center gap-3">
        {person?.picture ? (
          <div className="shrink-0 relative w-[40px] aspect-square rounded-[50%] border bg-white overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${person?.picture}`} alt="Profile picture" className="object-cover" fill />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-[40px] aspect-square text-slate-400" />
        )}
        <div>
          <h3 className="font-semibold text-black capitalize">{person?.username}</h3>
        </div>
      </div>
    </Link>
  );
}
