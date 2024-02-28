import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function faq({ faqs }) {
  const { data: session } = useSession();

  console.log("session from home", session);

  return (
    <div
      className={`min-h-[calc(100vh_-_60px)] py-24 px-4 scr700:px-24 bg-black bg-[url(../../public/faq.png)] bg-contain bg-no-repeat bg-right-bottom bg-fixed ${jakarta.className}`}
    >
      <div className="flex flex-col gap-4 max-w-[700px]">
        {faqs?.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg">
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="w-full flex justify-between items-center text-xl font-bold text-left"
      >
        {faq.title}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <div className={`${open ? "mt-3" : ""}`} style={{ transition: ".3s", gridTemplateRows: open ? "1fr" : "0fr", display: "grid" }}>
        <div className={` overflow-hidden text- text-slate-500`}>{faq.content}</div>
      </div>
    </div>
  );
}

faq.getLayout = function getLayout(page, pageProps) {
  return (
    <Layout showFooter={false} {...pageProps}>
      {page}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const FAQ = require("@/models/FAQ");

  const session = await getServerSession(context.req, context.res, authOptions);
  const faqs = await FAQ.findAll();

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      faqs: JSON.parse(JSON.stringify(faqs)),
    },
  };
}
