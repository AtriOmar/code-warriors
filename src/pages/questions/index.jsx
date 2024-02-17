import QuestionsSidebar from "@/components/QuestionsSidebar";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about() {
  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <div className="flex max-w">
        <QuestionsSidebar />
      </div>
    </div>
  );
}

about.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
