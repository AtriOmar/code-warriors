import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import { RingLoader } from "@/components/Loading";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AllFAQ from "@/components/Admin/management/FAQList";
import { toast } from "react-toastify";

export default function FAQ({ faqs, setFaqs }) {
  return (
    <div className="max-w-[800px]">
      <AllFAQ faqs={faqs} setFaqs={setFaqs} />
      <AddFAQ setFaqs={setFaqs} />
    </div>
  );
}

function AddFAQ({ setFaqs }) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function createFAQ() {
    if (sending) return;

    const data = {
      title: input.title,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/faq/create", data);

      setFaqs((prev) => [...prev, res.data]);
      setInput({ title: "", content: "" });

      toast.success("FAQ added");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div>
      <h1 className="mt-4 font-bold">Title</h1>
      <input
        value={input.title}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, title: e.target.value }));
        }}
        type="text"
        className="w-full mt-1 px-2 py-1 rounded-md border border-slate-300 outline-purple text-sm"
        placeholder="Title"
      />
      <h1 className="mt-2 font-bold">Content</h1>
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
        onClick={createFAQ}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Add FAQ
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
