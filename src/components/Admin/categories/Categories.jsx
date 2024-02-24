import { RingLoader } from "@/components/Loading";
import { formatDate } from "@/lib/formatDate";
import axios from "axios";
import Image from "next/image";

const { faSort, faPlus, faCircleUser, faImage } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect } = require("react");

export default function Tips({ tips }) {
  const [sending, setSending] = useState(false);

  return (
    <section className=" max-w-[1000px] py-4 rounded-lg shadow-md ">
      <h2 className="font-medium text-xl text-slate-900 px-4">Tips</h2>
      <div className="grid grid-cols-[1fr_125px_75px_100px_100px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">Name</div>
        <div className=" py-3 text-slate-900">Category</div>
        <div className=" py-3 text-slate-900">Date</div>
        <div className=" py-3 text-slate-900"></div>
        <div className=" py-3 text-slate-900"></div>
      </div>
      {tips?.map((tip, index) => (
        <TipItem key={index} tip={tip} />
      ))}

      {!tips?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no Tips</p>
        </div>
      )}
    </section>
  );
}

function TipItem({ tip }) {
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
    <div key={tip.id} className="grid grid-cols-[1fr_125px_75px_100px_100px] px-4 font-bold text-sm">
      <div className="flex items-center gap-3  py-2 text-slate-900 capitalize">
        <div href="/profile" className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <p className="font-medium capitalize">{tip.title || "Best Jobs"}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900 text-xs font-semibold">
        <p suppressHydrationWarning>{tip.Category?.name}</p>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900">
        <p>{formatDate(tip.createdAt, "day-month")}</p>
      </div>
      <div className="relative w-fit">
        <button
          onClick={() => {
            setShowDelete((prev) => (prev === tip.id ? -1 : tip.id));
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
