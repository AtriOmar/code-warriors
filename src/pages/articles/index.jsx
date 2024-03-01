import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import ArticlesList from "@/components/articles/ArticlesList";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function articles({ articles }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`${jakarta.className} py-4 px-4`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        <ArticlesList articles={articles} />
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
  const articles = await Article.findAll({ include: { model: Category } });
  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      articles: JSON.parse(JSON.stringify(articles)),
      settings: JSON.parse(JSON.stringify(settings)),
    },
  };
}
