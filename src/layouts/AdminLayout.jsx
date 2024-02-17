import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <main className="mt-[60px] ml-[200px]">{children}</main>
    </>
  );
}
