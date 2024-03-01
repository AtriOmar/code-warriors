import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import ArticlesList from "@/components/articles/ArticlesList";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function articles({ article }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        {/* <AllArticles articles={articles} /> */}
        <div className="mt-10 mb-20">
          <p className="w-fit mt-auto px-3 py-2 rounded-lg bg-purple hover:bg-purple-700 text-white text-lg  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
            {article.title}
          </p>
          <div className="mt-10" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
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

  const session = await getServerSession(context.req, context.res, authOptions);
  const article = await Article.findByPk(context.params.id, { include: { model: Category } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      article: JSON.parse(JSON.stringify(article)),
    },
  };
}
