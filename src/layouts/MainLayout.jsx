import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function MainLayout({ children }) {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <main className="mt-[60px]"> */}
      {children}
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  );
}
