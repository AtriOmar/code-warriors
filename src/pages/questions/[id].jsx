import QuestionsSidebar from "@/components/QuestionsSidebar";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function index({ question }) {
  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <section className="flex gap-20 max-w">
        <QuestionsSidebar />
        <Question question={question} />
      </section>
    </div>
  );
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Question from "@/components/questions/Question";

export async function getServerSideProps(context) {
  const Question = require("@/models/Question");
  const Comment = require("@/models/Comment");
  const User = require("@/models/User");

  const session = await getServerSession(context.req, context.res, authOptions);

  const user = session?.user;
  const question = await Question.findByPk(context.params.id, { include: { model: User, attributes: ["id", "username"] } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      question: JSON.parse(JSON.stringify(question)),
    },
  };
}
