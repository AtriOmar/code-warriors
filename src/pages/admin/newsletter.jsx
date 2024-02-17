import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

export default function newsletter() {
  return <div>categories</div>;
}

newsletter.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
