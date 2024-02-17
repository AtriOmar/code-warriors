import CategorySection from "@/components/Admin/categories/CategorySection";
import AdminLayout from "@/layouts/AdminLayout";
import { faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function categories() {
  const [categories, setCategories] = useState([]);

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
