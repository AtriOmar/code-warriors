import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import MobileSidebar from "@/components/Admin/MobileSidebar";

export default function Layout({ children, settings, showFooter = true }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="mt-[60px]">{children}</main>
      <MobileSidebar />
      {showFooter && <Footer settings={settings} />}
    </>
  );
}
