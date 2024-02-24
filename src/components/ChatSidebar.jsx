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
  const { conversations } = useChatContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const { data, isLoading } = useSWR({ url: "/api/users/getAll", search: debouncedSearch }, () => fetchUsers(debouncedSearch), { keepPreviousData: true });

  // async function fetchSearch() {
  //   if (!search || fetching) return;

  //   setFetching(true);

  //   try {
  //     const res = await axios.get("/api/users/getAll", {
  //       params: {
  //         search,
  //       },
  //     });

  //     setUsers(res.data);
  //   } catch (err) {}
  //   setFetching(false);
  // }

  const debouncedUpdateSearch = useDebouncedCallback(() => {
    setDebouncedSearch(search);
  }, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  // const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 1000);

  // useEffect(() => {
  //   debouncedFetchSearch();
  // }, [search]);

  return (
    <div className="fixed bottom-0 top-[60px] left-0 w-[300px] py-4 px-2 border-r-2 border-slate-300">
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
      {data?.length ? (
        <ul className="flex flex-col gap-2 mt-2">
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
      ) : (
        <ul className="flex flex-col gap-2 mt-2">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <ConversationCard conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </div>
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
