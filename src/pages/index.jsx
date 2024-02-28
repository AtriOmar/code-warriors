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

export default function Home({ team, fields, feedbacks }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <>
      <div className={` ${jakarta.className}`}>
        {/* <HomePage /> */}
        <Hero />
        <Services fields={fields} />
        <About />
        <About2 />
        <Team team={team} />
        <Testimonial feedbacks={feedbacks} />
        <Contact />
        <Newsletter />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Team = require("@/models/Team");
  const Field = require("@/models/Field");
  const Feedback = require("@/models/Feedback");

  const team = await Team.findAll({ attributes: ["id", "name", "role", "picture"] });
  const fields = await Field.findAll({ attributes: ["id", "title", "content", "icon"] });
  const feedbacks = await Feedback.findAll({ attributes: ["id", "name", "role", "feedback", "picture"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      team: JSON.parse(JSON.stringify(team)),
      fields: JSON.parse(JSON.stringify(fields)),
      feedbacks: JSON.parse(JSON.stringify(feedbacks)),
    },
  };
}
