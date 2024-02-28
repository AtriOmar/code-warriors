import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import FAQ from "@/components/Admin/management/FAQ";
import AllFAQ from "@/components/Admin/management/FAQList";
import Values from "@/components/Admin/management/Values";
import Team from "@/components/Admin/management/Team";
import Fields from "@/components/Admin/management/Fields";
import { Scrollspy } from "@makotot/ghostui";
import TOCNav from "@/components/Admin/management/TOCNav";

const SIZE = 5;
const list = new Array(SIZE).fill(0);
export default function index({ faqs: ssrFaqs, values, team, fields }) {
  const [faqs, setFaqs] = useState(ssrFaqs);
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <div className="px-20 pt-12 pb-20">
      <div data-cy="section-wrapper">
        <Scrollspy sectionRefs={sectionRefs}>
          {({ currentElementIndexInViewport }) => (
            <>
              <TOCNav currentElementIndexInViewport={currentElementIndexInViewport} />

              <div id={`values`} data-cy={`section-item`} ref={sectionRefs[0]} className={currentElementIndexInViewport === 0 ? "active" : ""}>
                <h1 className="font-bold text-xl">Values</h1>
                <Values values={values} />
              </div>
              <div className="max-w-[800px] h-px my-8 bg-slate-400"></div>
              <div id={`faq`} data-cy={`section-item`} ref={sectionRefs[1]} className={currentElementIndexInViewport === 1 ? "active" : ""}>
                <h1 className="font-bold text-xl">FAQ</h1>
                <FAQ faqs={faqs} setFaqs={setFaqs} />
              </div>
              <div className="max-w-[800px] h-px my-8 bg-slate-400"></div>
              <div id={`team`} data-cy={`section-item`} ref={sectionRefs[2]} className={currentElementIndexInViewport === 2 ? "active" : ""}>
                <h1 className="font-bold text-xl">Team</h1>
                <Team team={team} />
              </div>
              <div className="max-w-[800px] h-px my-8 bg-slate-400"></div>
              <div id={`fields`} data-cy={`section-item`} ref={sectionRefs[3]} className={currentElementIndexInViewport === 3 ? "active" : ""}>
                <h1 className="font-bold text-xl">Fields</h1>
                <Fields fields={fields} />
              </div>
            </>
          )}
        </Scrollspy>
      </div>
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
  const Field = require("@/models/Field");

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
  const fields = await Field.findAll({
    attributes: ["id", "title", "content", "icon"],
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      faqs: JSON.parse(JSON.stringify(faqs)),
      values: JSON.parse(JSON.stringify(values)),
      team: JSON.parse(JSON.stringify(team)),
      fields: JSON.parse(JSON.stringify(fields)),
    },
  };
}
