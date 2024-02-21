import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function accounts({ accounts }) {
  const userAccounts = accounts.filter((account) => account.accessId === 1);
  const adminAccounts = accounts.filter((account) => account.accessId > 1);

  return (
    <div className="px-8 scr1100:px-20 pt-12 pb-20">
      <UsersAccounts accounts={userAccounts} />
      <div className="mt-10"></div>
      <AdminAccounts accounts={adminAccounts} />
    </div>
  );
}

accounts.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Question = require("@/models/Question");
  const User = require("@/models/User");
  const Answer = require("@/models/Answer");

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

  const users = await User.findAll();

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      accounts: JSON.parse(JSON.stringify(users)),
    },
  };
}
