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
import EditTip from "@/components/Admin/tips/EditTip";

export default function index({ categories, tip }) {
  return (
    <div className="max-w-[1100px] px-8 scr1100:px-20 pt-12 pb-20">
      <EditTip categories={categories} tip={tip} />
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
  const Category = require("@/models/Category");
  const Tip = require("@/models/Tip");

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

  const categories = await Category.findAll();

  const tip = await Tip.findByPk(context.params.id, {
    include: { model: Category, attributes: ["id", "name"] },
  });

  if (!tip) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/best-practices",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
      tip: JSON.parse(JSON.stringify(tip)),
    },
  };
}
