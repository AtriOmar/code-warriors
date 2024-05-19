import Footer from "@/components/Footer";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import AllQuestions from "@/components/questions/AllQuestions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function index({ categories }) {
  return (
    <div className={`${jakarta.className} py-4 px-4 `}>
      <div className=" max-w">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}

index.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import CategoriesList from "@/components/categories/CategoriesList";

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

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({
    attributes: ["id", "name", [sequelize.literal("(SELECT COUNT(*) FROM `questions` WHERE `questions`.`categoryId` = `Category`.`id`)"), "questionsCount"]],
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
