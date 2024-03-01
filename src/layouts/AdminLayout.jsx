import AdminNavbar from "@/components/Admin/AdminNavbar";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { useRouter } from "next/router";

const styles = {
  main: "scr1000:ml-[200px]",
  main: "scr800:ml-[200px]",
};

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = router?.pathname;

  let scr;
  if (pathname === "/admin/articles") scr = "scr1000";
  else if (pathname === "/admin/questions") scr = "scr1000";
  else scr = "scr800";

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <main className={`mt-[60px] ${scr}:ml-[200px] duration-300`}>{children}</main>
    </>
  );
}
