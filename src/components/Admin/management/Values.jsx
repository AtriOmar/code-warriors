import ValuesList from "@/components/Admin/management/ValuesList";
import { RingLoader } from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Values({ values: initialValues }) {
  const [values, setValues] = useState(initialValues);

  return (
    <div className="max-w-[800px]">
      <ValuesList values={values} setValues={setValues} />
      <AddValue setValues={setValues} />
    </div>
  );
}

function AddValue({ setValues }) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function createValue() {
    if (sending) return;

    if (!input.title || !input.content) return toast.error("All fields are required");

    const data = {
      title: input.title,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/values/create", data);

      setValues((prev) => [...prev, res.data]);
      setInput({ title: "", content: "" });

      toast.success("Value added");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div>
      <h1 className="mt-4 font-bold text-sm">Title</h1>
      <input
        value={input.title}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, title: e.target.value }));
        }}
        type="text"
        className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
        placeholder="Title"
      />
      <h1 className="mt-2 font-bold text-sm">Content</h1>
      <textarea
        value={input.content}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, content: e.target.value }));
        }}
        className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm resize-none"
        rows={4}
        placeholder="Content"
      />
      <button
        onClick={createValue}
        className="relative block mt-2 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Add Value
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
