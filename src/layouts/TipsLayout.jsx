import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import TipsSidebar from "@/components/TipsSidebar";

export default function TipsLayout({ children, categories }) {
  const router = useRouter();

  return (
    <div className="relative max-w">
      <TipsSidebar categories={categories} />
      <div className="ml-[200px]">{children}</div>
    </div>
  );
}
