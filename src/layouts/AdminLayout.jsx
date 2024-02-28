import AdminNavbar from "@/components/Admin/AdminNavbar";
import MobileSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <MobileSidebar />
      <main className="mt-[60px] scr800:ml-[200px] duration-300">{children}</main>
    </>
  );
}
