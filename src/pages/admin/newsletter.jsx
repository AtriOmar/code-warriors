import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Articles from "@/components/Admin/articles/Articles";
import Link from "next/link";
import SendEmailForm from "@/components/Admin/newsletter/SendEmailForm";
import SubscribedAccounts from "@/components/Admin/newsletter/SubscribedAccounts";

export default function newsletter({ subs }) {
  return (
    <div className="max-w-[1100px] px-8 scr1100:px-20 pt-12 pb-20">
      <SendEmailForm />
      <div className="mt-20"></div>
      <SubscribedAccounts subs={subs} />
    </div>
  );
}

newsletter.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Subscription = require("@/models/Subscription");

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

  const subs = await Subscription.findAll({
    where: {
      active: true,
    },
    limit: 20,
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      subs: JSON.parse(JSON.stringify(subs)),
    },
  };
}
