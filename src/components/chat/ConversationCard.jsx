import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatDateRelative } from "@/lib/formatDate";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConversationCard({ conversation }) {
  const { data: session } = useSession();
  const { user } = session || {};
  const router = useRouter();
  const id = router?.query?.id;

  const otherUser = useMemo(() => (conversation?.User1?.id === user?.id ? conversation?.User2 : conversation?.User1), [conversation]);
  const [formattedDate, setFormattedDate] = useState(formatDateRelative(conversation?.Messages?.[0].createdAt));

  useEffect(() => {
    setFormattedDate(formatDateRelative(conversation?.Messages?.[0].createdAt, "short"));
    const interval = setInterval(() => {
      setFormattedDate(formatDateRelative(conversation?.Messages?.[0].createdAt, "short"));
    }, 30000);

    return () => clearInterval(interval);
  }, [conversation]);

  if (!conversation) return;

  return (
    <Link
      href={"/chat/" + otherUser?.id}
      className={`${
        id === otherUser?.id + "" ? "bg-slate-200" : ""
      } relative block grow max-w-[400px] py-2 px-3 rounded-lg hover:bg-slate-300 hover:shadow-card2 duration-300`}
    >
      <p className={`absolute top-1 right-2 font-bold text-xs ${conversation.seen === "both" || conversation.seen === user.id + "" ? "hidden" : ""}`}>Nouv</p>
      <div className="flex items-center gap-3">
        {otherUser?.picture ? (
          <div className="shrink-0 relative w-[40px] aspect-square rounded-[50%] border bg-white overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${otherUser?.picture}`} alt="Profile picture" className="object-cover" fill />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-[40px] aspect-square text-slate-400" />
        )}
        <div>
          <h3 className="font-semibold text-black capitalize">{otherUser?.username}</h3>

          {conversation?.Messages?.[0] ? (
            <div className="flex text-sm text-slate-700">
              <p className="text-sm text-slate-700 break-all line-clamp-1">
                {conversation?.Messages?.[0]?.senderId === user.id ? <span className="">You: </span> : ""}
                {conversation?.Messages?.[0]?.content}
              </p>
              <span className="mx-1">.</span>
              <p className="">{formattedDate}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}
