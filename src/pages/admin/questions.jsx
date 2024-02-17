import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

export default function questions() {
  return <div>categories</div>;
}

questions.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
