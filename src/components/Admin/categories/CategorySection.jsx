import { RingLoader } from "@/components/Loading";
import axios from "axios";

import DeleteCategory from "./DeleteCategory";

const { faSort, faPlus } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect } = require("react");

export default function CategorySection({ name, categories, type, setCategories }) {
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
  });
  const [sending, setSending] = useState(false);
  const [showDelete, setShowDelete] = useState(-1);

  const sectionCategories = categories?.filter((category) => category.type === type);

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
    <section className=" max-w-[1000px] mt-14">
      <h2 className="font-bold text-2xl text-blue-900">{name}</h2>
      <div className="grid grid-cols-[1fr_125px_125px_100px_100px] mt-4 mb-2 px-4 border-b border-slate-300 font-medium text-sm">
        <div className="flex items-center gap-3 py-3 text-[#A3AED0]">
          <p>Title</p>
          <FontAwesomeIcon icon={faSort} className="" />
        </div>
        <div className="flex items-center gap-3 py-3 text-[#A3AED0]">
          <p>Popularity</p>
          <FontAwesomeIcon icon={faSort} className="" />
        </div>
        <div className="flex items-center gap-3 py-3 text-[#A3AED0]">
          <p>Numbers</p>
          <FontAwesomeIcon icon={faSort} className="" />
        </div>
        <div className=" py-3 text-red-500">Delete</div>
        <div className=" py-3 text-purple-800">Update</div>
      </div>
      {sectionCategories?.map((category, index) => (
        <CategoryItem key={index} category={category} showDelete={showDelete} setShowDelete={setShowDelete} setCategories={setCategories} />
      ))}

      {!sectionCategories?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no categories</p>
        </div>
      )}

      {addCategoryOpen ? (
        <form className="mt-8" onSubmit={addCategory}>
          <input
            value={input.name}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, name: e.target.value }));
            }}
            type="text"
            placeholder="Title"
            className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_0px_10px_5px_#4461F22C]"
          />
          <div className="flex gap-4 mt-4">
            <input type="submit" value="Add" className="px-2 py-1 rounded-lg bg-purple hover:bg-purple-700 text-white font-bold cursor-pointer duration-300" />
            <button
              type="button"
              onClick={() => {
                setAddCategoryOpen(false);
              }}
              className="px-2 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold cursor-pointer duration-300"
            >
              Cancel
            </button>
            {sending && <div>{<RingLoader />}</div>}
          </div>
        </form>
      ) : (
        <button
          className="flex items-center gap-2 mt-6 px-2 py-1 rounded-lg bg-gray-200 text-blue-900 font-bold"
          onClick={() => {
            setAddCategoryOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="" />
          <p>Add Category</p>
        </button>
      )}
    </section>
  );
}

function CategoryItem({ category, showDelete, setShowDelete, setCategories }) {
  const [sending, setSending] = useState(false);

  async function deleteCategory() {
    setSending(true);

    try {
      const res = await axios.delete("/api/categories/deleteById", {
        params: {
          id: category.id,
        },
      });

      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div key={category.id} className="grid grid-cols-[1fr_125px_125px_100px_100px] px-4 font-bold text-sm">
      <div className="flex items-center gap-3  py-2 text-blue-900">
        <p>{category.name || "Web development"}</p>
      </div>
      <div className="flex items-center gap-3  py-2 text-blue-900">
        <p>{category.popularity || "10%"}</p>
      </div>
      <div className="flex items-center gap-3  py-2 text-blue-900">
        <p>{category.numbers || "123"}</p>
      </div>
      <div className="relative w-fit">
        <button
          onClick={() => {
            setShowDelete((prev) => (prev === category.id ? -1 : category.id));
          }}
          className="w-fit py-2 text-red-500"
        >
          Delete
        </button>
        <div
          className={`absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 gap-2 bg-red-400 py-1 px-1 rounded-lg shadow-[0_0_5px_rgb(0,0,0,.2)] flex duration-150 ${
            showDelete === category.id ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {sending ? (
            <RingLoader />
          ) : (
            <>
              <button onClick={deleteCategory} className="px-2 py-1 rounded-lg bg-red-600 text-white">
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowDelete(-1);
                }}
                className="px-2 py-1 rounded-lg bg-slate-300 text-slate-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className=" py-2 text-purple-800">Update</div>
      {/* <DeleteCategory
        category={category}
        show={showDelete}
        hide={() => {
          setShowDelete(false);
        }}
      /> */}
    </div>
  );
}
