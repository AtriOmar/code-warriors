import React, { useState, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ChatContext = React.createContext();

function playNotification() {
  const audio = new Audio("/notification.mp3");
  audio.play();
}

function ChatProvider({ children }) {
  const { data: session } = useSession();
  const { user } = session || {};

  const [conversations, setConversations] = useState([]);
  const [chatSettings, setChatSettings] = useState({ conversationsLoading: true });
  const [isConnected, setIsConnected] = useState(false);
  const [openConversations, setOpenConversations] = useState([]);
  const [preTitle, setPreTitle] = useState("");

  const unread = useMemo(() => {
    if (conversations) {
      return conversations.reduce((total, conv) => (conv.seen === "both" || conv?.seen === user?.id + "" ? total : total + 1), 0);
    }
    return 0;
  }, [conversations, user]);
  useEffect(() => {}, [conversations]);

  async function onConversation(value) {
    if (!["both", user?.id + ""].includes(value.seen)) playNotification();

    setOpenConversations((prev) => {
      let found = false;
      // If the conversation is already open, we replace it with the new one
      const newConv = prev.map((el) => {
        if (el.id === value.id) {
          found = true;
          return value;
        } else {
          return el;
        }
      });

      // If the conversation is not open, we add it to the list
      if (!found) {
        newConv.push(value);
      }

      return newConv.slice(-5);
    });
    setConversations((prev) =>
      [value, ...prev.filter((conv) => conv.id !== value.id)].sort((a, b) => new Date(b.Messages[0].createdAt) - new Date(a.Messages[0].createdAt))
    );
  }

  useEffect(() => {
    socket.on("conversation", onConversation);

    return () => {
      socket.off("conversation", onConversation);
    };
  }, [conversations]);

  function onFriendRequest(value) {
    console.log("friend", value);

    // toast.info(`${value.sender.username} sent you a friend request`);
    toast(<FriendRequest user={value.sender} />, { containerId: "top-right", autoClose: 5000 });
  }

  useEffect(() => {
    if (!user) {
      setOpenConversations([]);
      return;
    }

    async function onConversations(value) {
      setChatSettings((prev) => ({ ...prev, conversationsLoading: false }));
      setConversations(value);

      socket.off("conversations", onConversations);
    }

    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("conversations", onConversations);

    socket.on("friendRequest", onFriendRequest);

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("friendRequest");

      setConversations([]);
    };
  }, [session]);

  const value = {
    conversations,
    setConversations,
    isConnected,
    openConversations,
    setOpenConversations,
    unread,
    preTitle,
    setPreTitle,
    chatSettings,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;

export function useChatContext() {
  return useContext(ChatContext);
}

function FriendRequest({ user }) {
  return (
    <Link
      onClick={() => {
        toast.dismiss({ containerId: "top-right" });
      }}
      href="/profile"
      className="flex gap-3 items-center text-black"
    >
      {/* <div className="relative w-10 aspect-square rounded-full overflow-hidden">
        <Image src={`/api/photo?path=/uploads/profile-pictures/${user.picture}`} fill alt="Profile Image" className="object-cover" />
      </div> */}
      {user?.picture ? (
        <div className="shrink-0 relative size-[40px] rounded-[50%] border bg-white overflow-hidden">
          <Image src={`/api/photo?path=/uploads/profile-pictures/${user?.picture}`} alt="Profile picture" className="object-cover" fill />
        </div>
      ) : (
        <FontAwesomeIcon icon={faCircleUser} className="text-[40px] aspect-square text-slate-400" />
      )}
      <div>
        <p className="font-bold text-sm">
          <span className="capitalize">{user.username}</span> wants to be your friend
        </p>
      </div>
    </Link>
  );
}
