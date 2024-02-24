import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TipsLayout from "@/layouts/TipsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AllTips from "@/components/tips/AllTips";
import TipsCategories from "@/components/tips/TipsCategories";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function tips({ tips, categories }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`px-8 scr1100:px-20 pt-12 pb-20 ${jakarta.className}`}>
      <h1 className="font-bold text-xl">Tips</h1>
      <div className="flex max-w-[800px] mx-auto pl-4 pr-8 py-4 mt-4 rounded-full bg-slate-100">
        <input type="text" placeholder="Looking for a specific tip ?" className="grow outline-none bg-transparent" />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <TipsCategories categories={categories} />
      <div className="mt-20" />
      <AllTips tips={tips} />
    </div>
  );
}

tips.getLayout = function getLayout(page, { categories }) {
  return (
    <Layout>
      <TipsLayout categories={categories}>{page}</TipsLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Tip = require("@/models/Tip");
  const Category = require("@/models/Category");

  const tips = await Tip.findAll({
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        where: {
          type: "practices",
        },
      },
    ],
  });

  const categories = await Category.findAll({ where: { type: "practices" } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      tips: JSON.parse(JSON.stringify(tips)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
