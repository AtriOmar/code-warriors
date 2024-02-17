import Layout from "@/layouts/Layout";

export default function about() {
  return <div>about</div>;
}

about.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
