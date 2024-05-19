import Footer from "@/components/Footer";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import AllQuestions from "@/components/questions/AllQuestions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function index({ questions, questionsCount, categories, category }) {
  return (
    <div className={`${jakarta.className} py-4 px-4 `}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar categories={categories} />
        <AllQuestions questions={questions} questionsCount={questionsCount} category={category} categories={categories} />
      </div>
    </div>
  );
}

index.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Question = require("@/models/Question");
  const User = require("@/models/User");
  const Answer = require("@/models/Answer");
  const Setting = require("@/models/Setting");
  const Category = require("@/models/Category");

  const session = await getServerSession(context.req, context.res, authOptions);
  const questions = await Question.findAll({
    attributes: [
      "id",
      "title",
      "createdAt",
      [sequelize.literal("(SELECT COUNT(*) FROM `answers` WHERE `answers`.`questionId` = `Question`.`id`)"), "answerCount"],
    ],
    include: [
      { model: User, attributes: ["id", "username", "picture"] },
      { model: Category, attributes: ["id", "name"] },
    ],
  });

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({
    attributes: ["id", "name"],
  });

  if (Number(context.query.c) > 0) {
    var questionsCount = await Question.count({
      where: {
        categoryId: context.query.c,
      },
    });
  } else {
    var questionsCount = await Question.count();
  }

  if (Number(context.query.c) > 0) {
    var category = await Category.findByPk(context.query.c);
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
      category: category ? JSON.parse(JSON.stringify(category)) : null,
      questionsCount,
    },
  };
}
