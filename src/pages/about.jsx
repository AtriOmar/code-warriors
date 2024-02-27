import AboutPage from "@/components/about/AboutPage";
import Layout from "@/layouts/Layout";
import { getServerSession } from "next-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about({ values }) {
  return (
    <div className={`px-4 ${jakarta.className}`}>
      <AboutPage values={values} />
    </div>
  );
}

about.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const Value = require("@/models/Value");

  const session = await getServerSession(context.req, context.res, authOptions);
  const values = await Value.findAll();

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      values: JSON.parse(JSON.stringify(values)),
    },
  };
}
