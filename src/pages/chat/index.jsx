import React, { useState, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import { RingLoader } from "@/components/Loading";
import MessagesBox from "@/components/chat/MessagesBox";
import SendMessageInput from "@/components/chat/SendMessageInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "@/contexts/ChatProvider";
import ChatLayout from "@/layouts/ChatLayout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/layouts/Layout";
import { useUIContext } from "@/contexts/UIProvider";

let currentBoxHeight;

export default function Chat() {
  const { data: session } = useSession();
  const { user } = session || {};

  const router = useRouter();
  const { id } = router?.query;
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [limit, setLimit] = useState(30);
  const { setChatSidebarOpen } = useUIContext();

  return (
    <div className="h-full flex pb-2  rounded-lg bg-whit shadow-md">
      <div className="relative w-full grid place-items-center">
        <button
          className="absolute top-4 left-4 scr800:hidden"
          onClick={() => {
            setChatSidebarOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
        <div className="flex flex-col items-center gap-1">
          <div className="relative size-[200px]">
            <Image src={"/chat.svg"} fill className="object-contain" alt="" />
          </div>
          <h2 className="font-bold text-2xl">No chat selected</h2>
        </div>
      </div>
    </div>
  );
}

Chat.getLayout = function getLayout(page) {
  return (
    <Layout showFooter={false}>
      <ChatLayout>{page}</ChatLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const Article = require("@/models/Article");
  const Category = require("@/models/Category");

  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
