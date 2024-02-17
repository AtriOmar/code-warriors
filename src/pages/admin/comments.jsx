import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

export default function comments() {
  return <div>categories</div>;
}

comments.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
