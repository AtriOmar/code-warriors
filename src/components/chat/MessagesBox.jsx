import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import MessageCard from "@/components/chat/MessageCard";
import { RingLoader } from "@/components/Loading";
import { useChatContext } from "@/contexts/ChatProvider";
import { formatDate } from "@/lib/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSession } from "next-auth/react";

let prevReceiver = -1;

export default function MessagesBox({ user: receiver, messages, limit }) {
  const { data: session } = useSession();
  const { user } = session || {};

  const [firstRender, setFirstRender] = useState(true);
  const { isConnected } = useChatContext();

  useEffect(() => {
    if (!receiver) return;

    if (prevReceiver === receiver?.id) return;

    setFirstRender(true);
    prevReceiver = receiver?.id;
  }, [receiver?.id]);

  useEffect(() => {}, [firstRender]);

  useEffect(() => {}, [isConnected]);

  // scrolling to bottom when a new message arrives
  useLayoutEffect(() => {
    const messagesBox = document.querySelector(".messagesBox");
    const allMessages = document.querySelectorAll(".message-container");
    const lastMessage = allMessages[0];

    if (firstRender && messages?.length) {
      lastMessage?.scrollIntoView();
      //   setFirstRender(false);
      // firstRender = false;
      setFirstRender(false);
    }

    if (messagesBox.scrollHeight - messagesBox.clientHeight - messagesBox.scrollTop - (lastMessage?.scrollHeight || 0) < 5) {
      lastMessage?.scrollIntoView();
    }
  }, [messages, firstRender]);

  return (
    <div className="grow scroll-auto overflow-y-scroll  max-[600px]:scrollbar-none messagesBox relative" style={{ pointerEvents: "auto" }}>
      <div className="flex flex-col justify-end min-h-full px-1 pb-3 pointer-events-auto min-w-[250px] messagesContainer">
        {limit > (messages?.length || 0) && (
          <div className="flex flex-col items-center gap-2 mt-6">
            {receiver?.picture ? (
              <div className="relative w-[125px] aspect-square rounded-[50%] border overflow-hidden">
                <Image src={`/api/photo?path=/uploads/profile-pictures/${receiver?.picture}`} alt="Profile picture" className="object-cover" fill />
              </div>
            ) : (
              // <UserCircleIcon className="w-[125px] aspect-square" />
              <FontAwesomeIcon icon={faCircleUser} className="text-[125px] aspect-square text-slate-400" />
            )}
            <h1 className="font-rubik font-bold text-slate-900 text-xl capitalize break-anywhere">{receiver?.username}</h1>
          </div>
        )}
        <div className={`${false ? "flex" : "hidden"} flex-col gap-2 items-center loading`}>
          <RingLoader width={30} height={30} color="#999" />
        </div>
        <div className="flex flex-col-reverse gap-[2px] mt-4">
          {messages?.map((message, index) => {
            if (
              (index === messages.length - 1 || new Date(message?.createdAt).getTime() - new Date(messages[index + 1]?.createdAt).getTime() > 600000) &&
              new Date(message.createdAt).getDate() !== new Date().getDate()
            ) {
              return (
                <div key={message.id} className="message-container">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">{formatDate(message.createdAt)}</p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else if (index === messages.length - 1 || new Date(message?.createdAt).getTime() - new Date(messages[index + 1]?.createdAt).getTime() > 600000) {
              return (
                <div key={message.id} className="message-container">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">{formatDate(message.createdAt, "time")}</p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else
              return (
                <div key={message.id} className="message-container">
                  <MessageCard message={message} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
