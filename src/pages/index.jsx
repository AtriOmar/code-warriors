import Image from "next/image";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/layouts/Layout";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return <div className={`flex flex-col items-center justify-between p-24 ${jakarta.className}`}>Home</div>;
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
