import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import ArticlesList from "@/components/articles/ArticlesList";
import TipsSidebar from "@/components/TipsSidebar";
import ArticlesSidebar from "@/components/ArticlesSidebar";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function articles({ articles, articlesCount, categories, category }) {
  const { data: session } = useSession();

  return (
    <div className={`${jakarta.className} py-4 px-4`}>
      <div className="flex gap-14 max-w">
        <ArticlesSidebar categories={categories} />
        <ArticlesList articles={articles} articlesCount={articlesCount} categories={categories} category={category} />
      </div>
    </div>
  );
}

articles.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const Article = require("@/models/Article");
  const Category = require("@/models/Category");
  const Setting = require("@/models/Setting");

  const session = await getServerSession(context.req, context.res, authOptions);
  const articles = await Article.findAll({ limit: 20, include: { model: Category } });

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({
    attributes: ["id", "name"],
  });

  if (Number(context.query.c) > 0) {
    var articlesCount = await Article.count({
      where: {
        categoryId: context.query.c,
      },
    });
  } else {
    var articlesCount = await Article.count();
  }

  if (Number(context.query.c) > 0) {
    var category = await Category.findByPk(context.query.c);
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      articles: JSON.parse(JSON.stringify(articles)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
      category: category ? JSON.parse(JSON.stringify(category)) : null,
      articlesCount,
    },
  };
}
