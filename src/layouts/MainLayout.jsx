import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function MainLayout({ children }) {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <main className="mt-[60px]"> */}
      {children}
      {/* </main> */}
      {/* <Footer /> */}
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={true} theme="colored" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        containerId="top-right"
        toastClassName={() =>
          "!top-[80px] relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-[1px_1px_5px_rgb(0,0,0,.3)] bg-white"
        }
      />
    </div>
  );
}
