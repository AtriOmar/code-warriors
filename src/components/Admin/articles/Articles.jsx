import { RingLoader } from "@/components/Loading";
import axios from "axios";
import Image from "next/image";

const { faSort, faPlus, faCircleUser, faImage } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect } = require("react");

export default function Articles({ articles }) {
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
      <h2 className="font-medium text-xl text-slate-900 px-4">Articles</h2>
      <div className="grid grid-cols-[1fr_100px_100px_100px_100px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">Name</div>
        <div className=" py-3 text-slate-900">Likes</div>
        <div className=" py-3 text-slate-900">Pub. date</div>
        <div className=" py-3 text-slate-900">Remove</div>
        <div className=" py-3 text-slate-900">Update</div>
      </div>
      {articles?.map((article, index) => (
        <ArticleItem key={index} article={article} />
      ))}

      {!articles?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no Articles</p>
        </div>
      )}
    </section>
  );
}

function ArticleItem({ article }) {
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
    <div key={article.id} className="grid grid-cols-[1fr_100px_100px_100px_100px] px-4 font-bold text-sm">
      <div className="flex items-center gap-3  py-2 text-slate-900 capitalize">
        <div href="/profile" className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            {article.poster ? (
              <div className="relative w-8 aspect-square rounded-lg overflow-hidden">
                <Image src={`/api/photo?path=/uploads/articles/${article.poster}`} fill alt="Article Poster" className="object-cover" priority />
              </div>
            ) : (
              <FontAwesomeIcon icon={faImage} className="text-3xl text-slate-500" />
            )}
            <p className="font-medium capitalize">{article.title || "Best Jobs"}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900">
        <p suppressHydrationWarning>{article.likes || Math.floor(Math.random() * 1000)}</p>
      </div>
      <div className="flex items-center gap-3  py-2 text-slate-900">
        <p>{article.numbers || "123"}</p>
      </div>
      <div className="relative w-fit">
        <button
          onClick={() => {
            setShowDelete((prev) => (prev === article.id ? -1 : article.id));
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
