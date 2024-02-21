import AboutPage from "@/components/about/AboutPage";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function about() {
  return (
    <div className={`p-24 ${jakarta.className}`}>
      <AboutPage />
    </div>
  );
}

about.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
