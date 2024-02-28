import Questions from "@/components/profile/Questions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";
import UserInfo from "@/components/profile/UserInfo";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function profile({ questions, user }) {
  console.log("-------------------- user --------------------");
  console.log(user);

  return (
    <div className={jakarta.className}>
      <section className="flex flex-col-reverse scr800:flex-row max-w">
        <article className="grow">
          <Questions questions={questions} />
        </article>
        <article className="shrink-0 w-full scr800:max-w-[450px] mx-auto pb-20 border-x border-slate-300">
          <UserInfo user={user} />
        </article>
      </section>
    </div>
  );
}

profile.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const Question = require("@/models/Question");
  const Friendship = require("@/models/Friendship");
  const User = require("@/models/User");
  const db = require("@/lib/sequelize"),
    sequelize = db.sequelize;
  const { Op } = require("sequelize");

  const session = await getServerSession(context.req, context.res, authOptions);
  const { user: authUser } = session || {};
  const Setting = require("@/models/Setting");

  const userId = context.params.id;

  const user = (await User.findOne({ where: { id: userId }, attributes: ["id", "username", "cover", "picture", "email", "bio", "address"] })).toJSON();

  if (authUser) {
    const friendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { userId1: authUser?.id, userId2: userId },
          { userId1: userId, userId2: authUser?.id },
        ],
      },
    });

    user.friendship = friendship;
  }

  const questions = await Question.findAll({ where: { userId: userId } });

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
      user: JSON.parse(JSON.stringify(user)),
      settings: JSON.parse(JSON.stringify(settings)),
    },
  };
}
