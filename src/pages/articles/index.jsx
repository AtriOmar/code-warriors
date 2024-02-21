import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import AllArticles from "@/components/articles/AllArticles";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function articles({ articles }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        <AllArticles articles={articles} />
      </div>
    </div>
  );
}

articles.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const Article = require("@/models/Article");
  const Category = require("@/models/Category");

  const session = await getServerSession(context.req, context.res, authOptions);
  const articles = await Article.findAll({ include: { model: Category } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}
