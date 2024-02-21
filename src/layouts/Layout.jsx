import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="mt-[60px]">{children}</main>
      {router.pathname !== "/faq" && <Footer />}
    </>
  );
}
