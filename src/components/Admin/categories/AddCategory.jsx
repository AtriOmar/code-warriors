import { RingLoader } from "@/components/Loading";
import axios from "axios";
import { useState } from "react";

export default function AddCategory({ setCategories }) {
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });

  async function addCategory(e) {
    e.preventDefault();

    if (!input.name) return;

    if (sending) return;

    const data = {
      name: input.name,
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
    <form className="mt-8" onSubmit={addCategory}>
      <input
        value={input.name}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, name: e.target.value }));
        }}
        type="text"
        placeholder="Name"
        className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 outline-purple"
      />
      <div className="flex gap-4 mt-4">
        <input
          type="submit"
          value="Add"
          className="relative block ml-auto px-6 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300 cursor-pointer"
        />
        <button
          type="button"
          onClick={() => {
            setAddCategoryOpen(false);
          }}
          className="relative block px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Cancel
        </button>
        {sending && <div>{<RingLoader />}</div>}
      </div>
    </form>
  );
}
