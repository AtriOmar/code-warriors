import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import HomePage from "@/components/home/HomePage";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home({ directory }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <>
      <div className={`p-24 ${jakarta.className}`}>
        <HomePage />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Category = require("@/models/Category");

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
