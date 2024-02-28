import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import { RingLoader } from "@/components/Loading";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhotoSelect from "@/components/Admin/management/PhotoSelect";
import FieldsList from "@/components/Admin/management/FieldsList";

export default function Fields({ fields: initialFields }) {
  const [fields, setFields] = useState(initialFields);

  return (
    <div className="max-w-[800px]">
      <FieldsList fields={fields} setFields={setFields} />
      <AddField setFields={setFields} />
    </div>
  );
}

function AddField({ setFields }) {
  const [input, setInput] = useState({
    title: "",
    content: "",
    icon: null,
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

  async function addField(e) {
    e.preventDefault();

    if (sending) return;

    if (!input.icon || !input.title || !input.content) return;

    const formData = new FormData();

    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append("icon", input.icon);

    setSending(true);
    try {
      const res = await axios.post("/api/fields/create", formData, config);

      console.log(res.data);
      setFields((prev) => [...prev, res.data]);
      setProgress(-1);
      setInput({
        title: "",
        content: "",
        icon: null,
      });
      toast.success("Field added");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div>
      <h2 className="mt-4 font-bold">Icon</h2>
      <PhotoSelect
        picture={input.icon}
        setPicture={(icon) => {
          setInput((prev) => ({ ...prev, icon }));
        }}
      />
      {progress > -1 && (
        <div className="relative w-full max-w-[200px] rounded-full border border-green-500 overflow-hidden mt-2">
          <div className="bg-green-500 h-4" style={{ width: progress + "%" }}></div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">{progress}%</p>
        </div>
      )}
      <form onSubmit={addField}>
        <h2 className="mt-4 font-bold">Title</h2>
        <input
          value={input.title}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, title: e.target.value }));
          }}
          type="text"
          className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
          placeholder="Title"
        />
        <h2 className="mt-2 font-bold">Content</h2>
        <input
          value={input.content}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, content: e.target.value }));
          }}
          type="text"
          className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
          placeholder="Content"
        />
        <button className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          Add Field
          {sending ? (
            <i className="absolute right-1 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </button>
      </form>
    </div>
  );
}
