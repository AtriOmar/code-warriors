import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

export default function index() {
  return <div>categories</div>;
}

index.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
