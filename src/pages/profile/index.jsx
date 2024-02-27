import Info from "@/components/profile/Info";
import Questions from "@/components/profile/Questions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function profile({ questions, friendships }) {
  const { data: session } = useSession();
  const { user } = session || {};

  const requests = friendships.filter((friendship) => friendship.userId2 === user.id && !friendship.active);

  const friends = friendships.filter((friendship) => friendship.active);

  return (
    <div className={jakarta.className}>
      <section className="flex flex-col-reverse scr800:flex-row max-w">
        <article className="grow">
          <FriendRequests friendships={requests} />
          <Questions questions={questions} />
        </article>
        <article className="shrink-0 w-full scr800:max-w-[450px] mx-auto pb-20 border-x border-slate-300">
          <Info />
          <FriendsList friendships={friends} />
        </article>
      </section>
    </div>
  );
}

profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import FriendRequests from "@/components/profile/FriendRequests";
import { useSession } from "next-auth/react";
import FriendsList from "@/components/profile/FriendsList";

export async function getServerSideProps(context) {
  const Question = require("@/models/Question");
  const User = require("@/models/User");
  const Friendship = require("@/models/Friendship");
  const { Op } = require("sequelize");

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

  const user = session?.user;
  const questions = await Question.findAll({ where: { userId: user.id } });

  const friendships = await Friendship.findAll({
    where: {
      [Op.or]: [{ userId1: user.id }, { userId2: user.id }],
    },
    include: [
      { model: User, as: "User1", attributes: ["id", "username", "picture"] },
      { model: User, as: "User2", attributes: ["id", "username", "picture"] },
    ],
  });

  console.log("-------------------- session from get server side --------------------");
  console.log(session);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
      friendships: JSON.parse(JSON.stringify(friendships)),
    },
  };
}
