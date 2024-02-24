import React, { useState, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import { RingLoader } from "@/components/Loading";
import MessagesBox from "@/components/chat/MessagesBox";
import SendMessageInput from "@/components/chat/SendMessageInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "@/contexts/ChatProvider";
import ChatLayout from "@/layouts/ChatLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// import sad from "../../../assets/images/sad.png";

let currentBoxHeight;

export default function Chat() {
  const { data: session } = useSession();
  const { user } = session || {};

  const router = useRouter();
  const { id } = router?.query;
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setConversations, isConnected } = useChatContext();
  const [limit, setLimit] = useState(30);
  const [newLimit, setNewLimit] = useState(true);
  const [visible, setVisible] = useState(true);
  const observing = useRef(-1);
  const resizeObserver = useRef(
    typeof window !== "undefined" &&
      new ResizeObserver((entries, obs) => {
        const el = document.querySelector(".messagesBox");

        if (el?.scrollTop === 0) {
          el.scrollTo(0, el.scrollHeight - currentBoxHeight);
        }

        currentBoxHeight = el?.scrollHeight;
      })
  );
  const observer = useRef(
    typeof window !== "undefined" &&
      new IntersectionObserver((entries, obs) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setLimit((prev) => prev + 30);
          setNewLimit(true);
          obs.unobserve(entry.target);
        }
      })
  );

  useEffect(() => {
    const box2 = document.querySelector(".messagesContainer");
    if (box2) resizeObserver.current.observe(box2);

    if (!conversation?.Messages?.length || conversation?.Messages.length < 5) return;

    const elements = document.querySelectorAll(".message-container");

    const el = elements[elements.length - 4];

    const msg = conversation?.Messages[conversation?.Messages?.length - 4];

    if (observing.current === msg?.id || !msg?.id) {
      return;
    }

    observing.current = msg?.id;

    if (el) observer.current.observe(el);
  }, [conversation?.Messages]);

  // useEffect(() => {
  //   setVisible(false);

  //   setTimeout(() => {
  //     setVisible(true);
  //   }, 100);
  // }, []);

  useEffect(() => {
    setNewLimit(false);

    console.log("-------------------- isConnected, visible --------------------");
    console.log(isConnected, visible);
    if (!isConnected || !visible) return;

    function onMessages({ user: eventUser, conversation: eventConversation }) {
      console.log("-------------------- eventConversation --------------------");
      console.log(eventConversation);
      if (eventUser) setReceiver(eventUser);
      setConversation(eventConversation);

      if (loading) setLoading(false);
      if (eventConversation) socket.off("messages", onMessages);
    }

    async function onMessage(message) {
      setLimit((prev) => prev + 1);
      setConversation((prev) => {
        const newConv = JSON.parse(JSON.stringify(prev));
        if (newConv) newConv.Messages = [message, ...(newConv?.Messages || [])];
        return newConv;
      });
    }

    setTimeout(() => {
      socket.emit("watchSingle", id, limit);

      socket.on("messages", onMessages);

      socket.on("message", onMessage);
    }, 100);

    return () => {
      socket.emit("unwatchSingle", id);
      socket.off("messages");
      socket.off("message");
    };
  }, [isConnected, id, newLimit]);

  useEffect(() => {
    function handleVisibilityChange(e) {
      if (e.target.visibilityState === "visible") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    function handleBlur() {
      setVisible(false);
    }

    function handleFocus() {
      setVisible(true);
    }

    // window.addEventListener("blur", handleBlur);
    // window.addEventListener("focus", handleFocus);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // window.removeEventListener("blur", handleBlur);
      // window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <RingLoader size="40" />
      </div>
    );
  }

  if (!receiver) {
    return (
      <div className="grid place-items-center m-2 py-10 px-10 rounded-lg bg-white shadow-md">
        <div className="">
          {/* <img className="w-[150px] mx-auto " src={sad} alt="" /> */}
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas l'utilisateur demandé</h3>
          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex pb-2  rounded-lg bg-whit shadow-md">
      <div className="relative w-full flex flex-col">
        <div className="relative flex  items-center w-full py-2 px-4 bg-white shadow break-anywhere">
          {/* <button onClick={() => {}}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-white hover:scale-125 duration-300" />
          </button> */}
          <div className="flex items-center gap-2">
            {receiver?.picture ? (
              <div className="relative w-[30px] aspect-square rounded-[50%] border bg-white overflow-hidden">
                <Image src={`/api/photo?path=/uploads/profile-pictures/${receiver?.picture}`} alt="Profile picture" fill className="object-cover" />
              </div>
            ) : (
              <FontAwesomeIcon icon={faCircleUser} className="text-[30px] aspect-square text-slate-400" />
            )}

            <span className="text-sm scr700:text-base font-medium scr700:font-bold  text-black text-lg text-center  capitalize line-clamp-1">
              {receiver?.username}
            </span>
          </div>
        </div>
        <MessagesBox user={receiver} messages={conversation?.Messages} limit={limit} />
        <SendMessageInput socket={socket} user={receiver} />
      </div>
    </div>
  );
}

Chat.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};

export async function getServerSideProps(context) {
  const Article = require("@/models/Article");
  const Category = require("@/models/Category");

  const session = await getServerSession(context.req, context.res, authOptions);
  const article = await Article.findByPk(context.params.id, { include: { model: Category } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      article: JSON.parse(JSON.stringify(article)),
    },
  };
}
