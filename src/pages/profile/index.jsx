import Info from "@/components/profile/Info";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function profile() {
  return (
    <div className={jakarta.className}>
      <div className="flex max-w">
        <section className="grow"></section>
        <section className="w-full max-w-[450px] pb-20 border-x border-slate-300">
          <Info />
        </section>
      </div>
    </div>
  );
}

profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
