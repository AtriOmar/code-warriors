import { RingLoader } from "@/components/Loading";
import axios from "axios";

import { faSort, faPlus, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function AdminAccounts({ accounts }) {
  const [sending, setSending] = useState(false);

  async function addCategory(e) {
    e.preventDefault();

    if (sending) return;

    const data = {
      name: input.name,
      type,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/categories/create", data);

      setCategories((prev) => [...prev, res.data]);
      setInput({ name: "" });
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <section className=" max-w-[1000px] py-4 rounded-lg shadow-md ">
      <h2 className="font-medium text-xl text-slate-900 px-4">Admin Accounts</h2>
      <div className="grid grid-cols-[1fr_100px_100px_100px_100px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">User</div>
        <div className=" py-3 text-slate-900">Likes</div>
        <div className=" py-3 text-slate-900">Member since</div>
        <div className=" py-3 text-slate-900">Friends</div>
        <div className=" py-3 text-slate-900">Remove</div>
      </div>
      {accounts?.map((user, index) => (
        <UserItem key={index} user={user} />
      ))}

      {!accounts?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no admins</p>
        </div>
      )}
    </section>
  );
}

function UserItem({ user }) {
  const [sending, setSending] = useState(false);

  async function deleteCategory() {
    setSending(true);

    try {
      const res = await axios.delete("/api/categories/deleteById", {
        params: {
          id: user.id,
        },
      });

      setCategories((prev) => prev.filter((cat) => cat.id !== user.id));
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div key={user.id} className="grid grid-cols-[1fr_100px_100px_100px_100px] px-4 font-bold text-sm">
      <div className="flex items-center gap-3  py-2 text-slate-900 capitalize">
        <p href="/profile" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
          <p className="font-medium capitalize">{user.username || "Jon Doe"}</p>
        </p>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900">
        <p>{user.likes || Math.floor(Math.random() * 1000)}</p>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900">
        <p>{user.numbers || "123"}</p>
      </div>
      <div className="relative w-fit">
        <button
          onClick={() => {
            setShowDelete((prev) => (prev === user.id ? -1 : user.id));
          }}
          className="w-fit py-2 text-red-500"
        >
          Delete
        </button>
      </div>
      <div className=" py-2 text-purple-800">Update</div>
    </div>
  );
}
