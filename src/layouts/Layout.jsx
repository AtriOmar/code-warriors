import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mt-[60px]">{children}</main>
      <Footer />
    </>
  );
}
