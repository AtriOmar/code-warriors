import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import ChatSidebar from "@/components/ChatSidebar";
import Navbar from "@/components/Navbar";

export default function ChatLayout({ children }) {
  return (
    <>
      <ChatSidebar />
      <main className="mt-[60px] scr800:ml-[300px] duration-300 h-[calc(100vh_-_60px)]">{children}</main>
    </>
  );
}
