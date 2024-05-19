import QuestionsSidebar from "@/components/QuestionsSidebar";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function index({ question, categories }) {
  return (
    <div className={`${jakarta.className} py-4 px-4`}>
      <section className="flex gap-14 max-w">
        <QuestionsSidebar categories={categories} />
        <Question question={question} />
      </section>
    </div>
  );
}

index.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Question from "@/components/questions/Question";

export async function getServerSideProps(context) {
  const Question = require("@/models/Question");
  const Answer = require("@/models/Answer");
  const User = require("@/models/User");
  const Category = require("@/models/Category");
  const Setting = require("@/models/Setting");
  // const View = require("@/models/View");

  const session = await getServerSession(context.req, context.res, authOptions);

  const question = await Question.findByPk(context.params.id, {
    attributes: ["id", "title", "content", "createdAt", "views", "userId"],
    include: [
      { model: User, attributes: ["id", "username", "picture"] },
      { model: Category, attributes: ["id", "name"] },
      {
        model: Answer,
        include: {
          model: User,
          attributes: ["id", "username", "picture"],
        },
      },
    ],
  });

  if (!question) {
    return {
      redirect: {
        permanent: false,
        destination: "/questions",
      },
      props: {},
    };
  }

  if (question) {
    await Question.increment("views", { by: 1, where: { id: question.id } });
  }

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({ attributes: ["id", "name"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      question: JSON.parse(JSON.stringify(question)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
