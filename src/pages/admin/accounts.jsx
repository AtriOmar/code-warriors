import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function accounts() {
  const [accounts, setAccounts] = useState([]);

  async function fetchAccounts() {
    try {
      const res = await axios.get("/api/users/getAll");

      setAccounts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="px-20 pt-12 pb-20">
      <UsersAccounts accounts={accounts} />
      <div className="mt-10"></div>
      <AdminAccounts accounts={accounts} />
    </div>
  );
}

accounts.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
