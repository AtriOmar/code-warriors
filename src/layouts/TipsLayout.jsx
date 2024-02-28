import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import TipsSidebar from "@/components/TipsSidebar";

export default function TipsLayout({ children, categories }) {
  const router = useRouter();

  return (
    <div className="relative scr900:px-4 py-4">
      <div className="flex gap-14 max-w">
        <TipsSidebar categories={categories} />
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
