import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import axios from "axios";
import { RingLoader } from "@/components/Loading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Select from "@/components/questions/CategorySelect";

export default function AddTip({ categories }) {
  const { data: session } = useSession();
  const { user } = session || {};
  const [input, setInput] = useState({
    title: "",
    content: "",
    category: { value: categories[0]?.id, label: categories[0]?.name },
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  async function handleSubmit() {
    if (sending) return;

    const data = {
      title: input.title,
      content: input.content,
      categoryId: input.category.value,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/tips/create", data);

      toast.success("Tip added successfully");
      router.push("/admin/best-practices");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
    setSending(false);
  }

  return (
    <article className="">
      <h1 className="font-bold text-xl">Add a tip</h1>
      <p className="mt-4 font-bold">Title</p>
      <input
        value={input.title}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, title: e.target.value }));
        }}
        type="text"
        className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple"
        placeholder="Tip"
      />
      <p className="mt-4 font-bold">Content:</p>
      <textarea
        placeholder="New tip for the community ? share it here..."
        value={input.content}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, content: e.target.value }));
        }}
        className="w-full mt-3 px-4 py-3 rounded-md border border-slate-300 outline-purple resize-none"
        rows={8}
      />
      <h1 className="mt-4 font-bold">Category</h1>
      <Select
        options={categoriesOptions}
        value={input.category}
        onChange={(option) => {
          setInput((prev) => ({ ...prev, category: option }));
        }}
        formatSelectedOption={({ Button, buttonProps, option }) => (
          <Button
            {...buttonProps}
            className="flex items-center justify-between w-full mt-3 px-4 py-2 outline-purple rounded-md border border-slate-300 text-left"
          >
            {option.label}
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          </Button>
        )}
      />

      <button
        onClick={handleSubmit}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Add tip
        {sending ? (
          <i className="absolute right-1 top-1/2 -translate-y-1/2">
            <RingLoader color="white" />
          </i>
        ) : (
          ""
        )}
      </button>
    </article>
  );
}
