import QuestionsSidebar from "@/components/QuestionsSidebar";
import Layout from "@/layouts/Layout";
import { getServerSession } from "next-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]";
import AddQuestionForm from "@/components/questions/AddQuestionForm";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about() {
  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <section className="flex gap-20 max-w">
        <QuestionsSidebar />
        <AddQuestionForm />
      </section>
    </div>
  );
}

about.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
