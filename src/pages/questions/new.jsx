import QuestionsSidebar from "@/components/QuestionsSidebar";
import Layout from "@/layouts/Layout";
import { getServerSession } from "next-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]";
import AddQuestionForm from "@/components/questions/AddQuestionForm";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about({ categories }) {
  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <section className="flex gap-14 max-w">
        <QuestionsSidebar />
        <AddQuestionForm categories={categories} />
      </section>
    </div>
  );
}

about.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

import Category from "@/models/Category";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Setting = require("@/models/Setting");

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }

  const categories = await Category.findAll();

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
      settings: JSON.parse(JSON.stringify(settings)),
    },
  };
}
