import AdminLayout from "@/layouts/AdminLayout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import QuestionsChart from "@/components/Admin/dashboard/QuestionsChart";
import TopCategoriesChart from "@/components/Admin/dashboard/TopCategoriesChart";
import LoginsChart from "@/components/Admin/dashboard/LoginsChart";

export default function index({ questions, categories, logins }) {
  console.log("-------------------- logins --------------------");
  console.log(logins);
  return (
    <div className="max-w-[1100px] px-4 scr1100:px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">Dashboard</h1>
      <h1 className="mt-4 font-bold text-sm">Logins</h1>
      <LoginsChart logins={logins} />
      <h1 className="mt-4 font-bold text-sm">Top Viewed Questions</h1>
      <QuestionsChart questions={questions} />
      <h1 className="mt-4 font-bold text-sm">Top Categories</h1>
      <TopCategoriesChart categories={categories} />
    </div>
  );
}

index.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Question = require("@/models/Question");
  const Category = require("@/models/Category");
  const sequelize = require("@/lib/sequelize").sequelize;
  const Login = require("@/models/Login");

  if (!(session?.user?.accessId > 1)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const questions = await Question.findAll({
    order: [["views", "DESC"]],
    limit: 10,
    attributes: ["id", "title", "views"],
  });

  const categories = await Category.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.literal("(SELECT COUNT(*) FROM `questions` WHERE `questions`.`categoryId` = `Category`.`id`)"), "questionsCount"],
      [
        sequelize.literal(
          "(SELECT SUM(`answers`.`id` IS NOT NULL) FROM `questions` LEFT JOIN `answers` ON `questions`.`id` = `answers`.`questionId` WHERE `questions`.`categoryId` = `Category`.`id`)"
        ),
        "answersCount",
      ],
    ],
    order: [[sequelize.literal("`questionsCount` + `answersCount`"), "DESC"]],

    limit: 10,
  });

  const logins = await Login.findAll({
    attributes: [
      [sequelize.literal('DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i")'), "minute"],
      [sequelize.fn("COUNT", sequelize.col("id")), "count"],
    ],
    group: ["minute"],
    limit: 20,
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
      categories: JSON.parse(JSON.stringify(categories)),
      logins: JSON.parse(JSON.stringify(logins.reverse())),
    },
  };
}
