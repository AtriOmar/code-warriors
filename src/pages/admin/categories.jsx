import CategorySection from "@/components/Admin/categories/CategorySection";
import AdminLayout from "@/layouts/AdminLayout";
import { faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function categories({ categories: ssrCategories }) {
  const [categories, setCategories] = useState(ssrCategories);

  async function fetchCategories() {
    try {
      const res = await axios("/api/categories/getAll");

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="px-20 pt-2 pb-20">
      <CategorySection name="Articles Categories" categories={categories} type="articles" setCategories={setCategories} />
      <CategorySection name="Questions Categories" categories={categories} type="questions" setCategories={setCategories} />
      <CategorySection name="Best Practices Categories" categories={categories} type="practices" setCategories={setCategories} />
    </div>
  );
}

categories.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Category = require("@/models/Category");
  const User = require("@/models/User");

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

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
