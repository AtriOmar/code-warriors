import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Contact from "@/components/contact/Contact";
import Newsletter from "@/components/contact/Newsletter";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function contact() {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div className={`px-4 pt-8 ${jakarta.className}`}>
      <div className="max-w">
        <Contact />
        <Newsletter />
      </div>
    </div>
  );
}

contact.getLayout = function getLayout(page) {
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
