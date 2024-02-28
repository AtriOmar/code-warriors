import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import { RingLoader } from "@/components/Loading";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhotoSelect from "@/components/Admin/management/PhotoSelect";
import TeamList from "@/components/Admin/management/TeamList";

export default function Team({ team: initialTeam }) {
  const [team, setTeam] = useState(initialTeam);

  return (
    <div className="max-w-[800px]">
      <TeamList team={team} setTeam={setTeam} />
      <AddMember setTeam={setTeam} />
    </div>
  );
}

function AddMember({ setTeam }) {
  const [input, setInput] = useState({
    name: "",
    role: "",
    photo: null,
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState(-1);

  const config = {
    onUploadProgress: (e) => {
      const prog = Math.round((e.loaded * 100) / e.total);
      setProgress(prog);
    },
  };

  async function addMember() {
    if (sending) return;

    if (!input.photo || !input.name || !input.role) return;

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("role", input.role);
    formData.append("picture", input.photo);

    setSending(true);
    try {
      const res = await axios.post("/api/team/create", formData, config);

      console.log(res.data);
      setTeam((prev) => [...prev, res.data]);
      setProgress(-1);
      setInput({
        name: "",
        role: "",
        photo: null,
      });
      toast.success("Member added");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div>
      <h2 className="mt-4 font-bold">Photo</h2>
      <PhotoSelect
        picture={input.photo}
        setPicture={(photo) => {
          setInput((prev) => ({ ...prev, photo }));
        }}
      />
      {progress > -1 && (
        <div className="relative w-full max-w-[200px] rounded-full border border-green-500 overflow-hidden mt-2">
          <div className="bg-green-500 h-4" style={{ width: progress + "%" }}></div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">{progress}%</p>
        </div>
      )}
      <h2 className="mt-4 font-bold">Name</h2>
      <input
        value={input.name}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, name: e.target.value }));
        }}
        type="text"
        className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
        placeholder="Name"
      />
      <h2 className="mt-2 font-bold">Role</h2>
      <input
        value={input.role}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, role: e.target.value }));
        }}
        type="text"
        className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
        placeholder="Role"
      />
      <button
        onClick={addMember}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Add Member
        {sending ? (
          <i className="absolute right-1 top-1/2 -translate-y-1/2">
            <RingLoader color="white" />
          </i>
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
