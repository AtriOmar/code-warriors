import Info from "@/components/profile/Info";
import Questions from "@/components/profile/Questions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function profile({ questions }) {
  return (
    <div className={jakarta.className}>
      <section className="flex flex-col-reverse scr800:flex-row max-w">
        <article className="grow">
          <Questions questions={questions} />
        </article>
        <article className="shrink-0 w-full scr800:max-w-[450px] mx-auto pb-20 border-x border-slate-300">
          <Info />
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

export async function getServerSideProps(context) {
  const Question = require("@/models/Question");

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

  console.log("-------------------- session from get server side --------------------");
  console.log(session);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}
