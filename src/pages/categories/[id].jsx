import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import TipsLayout from "@/layouts/TipsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AllTips from "@/components/tips/AllTips";
import TipsCategories from "@/components/tips/TipsCategories";
import Articles from "@/components/categories/Articles";
import Questions from "@/components/categories/Questions";
import Tips from "@/components/categories/Tips";
import Categories from "@/components/categories/Categories";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function categories({ tips, categories, category, articles, questions }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`px-6 scr1100:px- pt-12 pb-20 ${jakarta.className}`}>
      <div className="max-w">
        <p className="w-fit mx-auto px-8 py-2 rounded-lg bg-purple hover:bg-purple-700 text-white text-lg  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {category.name}
        </p>
        <div className="flex max-w-[800px] mx-auto pl-4 pr-8 py-4 mt-4 rounded-full bg-slate-100">
          <input type="text" placeholder="Looking for a something ?" className="grow outline-none bg-transparent" />
          <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
        </div>
        <Categories categories={categories} />
      </div>
      {articles.length ? <Articles articles={articles} category={category} /> : ""}
      <div className="mt-8"></div>
      {questions?.length ? <Questions questions={questions} /> : ""}
      <div className="mt-8"></div>
      {tips.length ? <Tips tips={tips} categories={categories} category={category} /> : ""}
      {!articles?.length && !questions?.length && !tips?.length ? (
        <div className="flex flex-col justify-center items-center mt-20 gap-8">
          <div className="relative w-full max-w-[250px] aspect-square">
            <Image src="/coding.png" alt="no content" className="object-contain" fill />
          </div>
          <p className="text-xl text-slate-500">No content available for this category yet</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

categories.getLayout = function getLayout(page, { categories }) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Tip = require("@/models/Tip");
  const Category = require("@/models/Category");
  const Article = require("@/models/Article");
  const Question = require("@/models/Question");
  const User = require("@/models/User");
  const db = require("@/lib/sequelize"),
    sequelize = db.sequelize;

  const category = await Category.findByPk(context.params.id);

  const articles = await Article.findAll({
    where: { categoryId: context.params.id },
  });

  const tips = await Tip.findAll({
    where: { categoryId: context.params.id },
  });

  const categories = await Category.findAll();

  const questions = await Question.findAll({
    where: { categoryId: context.params.id },
    attributes: [
      "id",
      "title",
      "createdAt",
      [sequelize.literal("(SELECT COUNT(*) FROM `answers` WHERE `answers`.`questionId` = `Question`.`id`)"), "answerCount"],
    ],
    include: {
      model: User,
      attributes: ["id", "username", "picture"],
    },
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      tips: JSON.parse(JSON.stringify(tips)),
      categories: JSON.parse(JSON.stringify(categories)),
      category: JSON.parse(JSON.stringify(category)),
      articles: JSON.parse(JSON.stringify(articles)),
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}
