import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

export default function articles() {
  return <div>categories</div>;
}

articles.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
