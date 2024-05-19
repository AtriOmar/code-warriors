import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useChatContext } from "@/contexts/ChatProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function TipsSidebar({ categories }) {
  const router = useRouter();
  const pathname = router.pathname;
  const { conversations } = useChatContext();

  return (
    <div className="shrink-0 w-[200px] hidden scr900:block rounded-lg px-6 py-4 bg-slate-100">
      <div className="sticky top-20">
        <h2 className="font-bold text-purple">Categories</h2>
        <ul className="mt-2 flex flex-col gap-2 list-disc font-bold text-sm">
          {categories?.slice(0, 8).map((category) => (
            <li key={category.id} className={`ml-7 hover:text-purple ${pathname === "/tips?c=" + category.id ? "text-purple" : "text-black"}`}>
              <Link href={"/tips?c=" + category.id} className={`block relative duration-200 `}>
                <p>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        {conversations?.length > 0 && <h2 className="mt-6 font-bold text-purple">Conversations</h2>}
        <ul className="flex flex-col gap-0.5 mt-2">
          {conversations.slice(0, 5).map((conversation) => (
            <li key={conversation.id}>
              <ConversationCard conversation={conversation} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConversationCard({ conversation }) {
  const { data: session } = useSession();
  const { user } = session || {};
  const otherUser = useMemo(() => (conversation?.User1?.id === user?.id ? conversation?.User2 : conversation?.User1), [conversation]);

  return (
    <Link
      href={"/chat/" + otherUser?.id}
      className={` relative block grow max-w-[400px] py-1 px-1 rounded-lg hover:bg-slate-300 hover:shadow-card2 duration-300`}
    >
      <p className={`absolute top-1 right-2 font-bold text-xs ${conversation.seen === "both" || conversation.seen === user.id + "" ? "hidden" : ""}`}>New</p>
      <div className="flex items-center gap-2">
        {otherUser?.picture ? (
          <div className="shrink-0 relative w-[30px] aspect-square rounded-[50%] border bg-white overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${otherUser?.picture}`} alt="Profile picture" className="object-cover" fill />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-[30px] aspect-square text-slate-400" />
        )}
        <div>
          <h3 className="font-semibold text-black text-sm capitalize">{otherUser?.username}</h3>
        </div>
      </div>
    </Link>
  );
}
