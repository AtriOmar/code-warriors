import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import FAQ from "@/components/Admin/management/FAQ";
import AllFAQ from "@/components/Admin/management/AllFAQ";

export default function index({ faqs: ssrFaqs }) {
  const [faqs, setFaqs] = useState(ssrFaqs);

  return (
    <div className="px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">FAQ</h1>

      <FAQ faqs={faqs} setFaqs={setFaqs} />
    </div>
  );
}

index.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const FAQ = require("@/models/FAQ");

  const session = await getServerSession(context.req, context.res, authOptions);

  if (!(session?.user?.accessId > 1)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const faqs = await FAQ.findAll();

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      faqs: JSON.parse(JSON.stringify(faqs)),
    },
  };
}
