import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Articles from "@/components/Admin/articles/Articles";
import Link from "next/link";
import Tips from "@/components/Admin/tips/Tips";

export default function articles({ tips }) {
  return (
    <div className="max-w-[1100px] px-8 scr1100:px-20 pt-12 pb-20">
      <div className="flex pl-4 pr-8 py-4 mb-10 rounded-full bg-slate-100">
        <input type="text" placeholder="What are you looking for ?" className="grow outline-none bg-transparent" />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <Link
        href="/admin/best-practices/new"
        className="block w-fit px-8 py-2 ml-auto rounded-md border border-purple bg-white hover:bg-purple-100 text-purple text-sm  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        New Tip
      </Link>
      <Tips tips={tips} />
    </div>
  );
}

articles.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Tip = require("@/models/Tip");
  const Category = require("@/models/Category");

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

  const tips = await Tip.findAll({
    include: { model: Category, attributes: ["name"] },
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      tips: JSON.parse(JSON.stringify(tips)),
    },
  };
}
