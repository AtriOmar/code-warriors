import AboutPage from "@/components/about/AboutPage";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about({ values }) {
  return (
    <div className={`px-4 ${jakarta.className}`}>
      <AboutPage values={values} />
    </div>
  );
}

about.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const Value = require("@/models/Value");
  const Setting = require("@/models/Setting");
  const Category = require("@/models/Category");

  const session = await getServerSession(context.req, context.res, authOptions);
  const values = await Value.findAll();

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({ attributes: ["id", "name"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      values: JSON.parse(JSON.stringify(values)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
