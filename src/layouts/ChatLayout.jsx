import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import ChatSidebar from "@/components/ChatSidebar";
import Navbar from "@/components/Navbar";

export default function ChatLayout({ children }) {
  return (
    <>
      <Navbar />
      <ChatSidebar />
      <main className="mt-[60px] ml-[300px] h-[calc(100vh_-_60px)]">{children}</main>
    </>
  );
}
