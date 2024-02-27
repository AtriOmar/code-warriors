import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import FAQ from "@/components/Admin/management/FAQ";
import AllFAQ from "@/components/Admin/management/FAQList";
import Values from "@/components/Admin/management/Values";
import Team from "@/components/Admin/management/Team";

export default function index({ faqs: ssrFaqs, values, team }) {
  const [faqs, setFaqs] = useState(ssrFaqs);

  return (
    <div className="px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">Values</h1>
      <Values values={values} />
      <div className="max-w-[800px] h-px my-8 bg-slate-400"></div>
      <h1 className="font-bold text-xl">FAQ</h1>
      <FAQ faqs={faqs} setFaqs={setFaqs} />
      <div className="max-w-[800px] h-px my-8 bg-slate-400"></div>
      <h1 className="font-bold text-xl">Team</h1>
      <Team team={team} />
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
  const Value = require("@/models/Value");
  const Team = require("@/models/Team");

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

  const faqs = await FAQ.findAll({
    attributes: ["id", "title", "content"],
  });
  const values = await Value.findAll({
    attributes: ["id", "title", "content"],
  });
  const team = await Team.findAll({
    attributes: ["id", "name", "role", "picture"],
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      faqs: JSON.parse(JSON.stringify(faqs)),
      values: JSON.parse(JSON.stringify(values)),
      team: JSON.parse(JSON.stringify(team)),
    },
  };
}
