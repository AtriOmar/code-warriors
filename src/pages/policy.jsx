import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import HomePage from "@/components/home/HomePage";
import Footer from "@/components/Footer";
import Hero from "@/components/home/components/home/Hero";
import Services from "@/components/home/components/home/Services";
import About from "@/components/home/components/home/About";
import About2 from "@/components/home/components/home/About2";
import Testimonial from "@/components/home/components/home/Testimonial";
import Newsletter from "@/components/contact/Newsletter";
import Team from "@/components/home/components/home/Team";
import Contact from "@/components/home/components/home/Contact";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

function sanitizeHtml(html) {
  const sanitizedInput = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  return sanitizedInput;
}

export default function Home({ settings }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <>
      <div className={`px-4 py-20 ${jakarta.className}`}>
        <div className="max-w">
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(settings.find((setting) => setting.name === "policy").value),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Setting = require("@/models/Setting");
  const Category = require("@/models/Category");

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });
  const categories = await Category.findAll({ attributes: ["id", "name"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
