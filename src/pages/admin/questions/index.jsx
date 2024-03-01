import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import Questions from "@/components/Admin/questions/Questions";

export default function questions({ questions, categories }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debouncedUpdateSearch = useDebouncedCallback(() => {
    setDebouncedSearch(search);
  }, 500);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  return (
    <div className="max-w-[1100px] px-4 scr1100:px-20 pt-12 pb-20">
      <div className="flex pl-4 pr-8 py-4 mb-10 rounded-full bg-slate-100">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="What are you looking for ?"
          className="grow outline-none bg-transparent"
        />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <Questions questions={questions} search={debouncedSearch} categories={categories} />
    </div>
  );
}

questions.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Question = require("@/models/Question");
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

  const questions = await Question.findAll({
    limit: 20,
    attributes: ["id", "title", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: { model: Category, attributes: ["name"] },
  });
  const categories = await Category.findAll({ attributes: ["id", "name"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
