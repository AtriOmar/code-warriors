import { RingLoader } from "@/components/Loading";
import { formatDate } from "@/lib/formatDate";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

const { faSort, faPlus, faCircleUser, faImage } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { useState, useEffect, Fragment } = require("react");

export default function Categories({ categories, setCategories }) {
  return (
    <section className=" py-4 rounded-lg shadow-md ">
      <h2 className="font-medium text-xl text-slate-900 px-4">Categories</h2>
      <div className="grid grid-cols-[1fr_180px] bg-slate-100 mt-4 mb-2 px-4 border-y border-slate-200 font-medium text-sm">
        <div className=" py-3 text-slate-900">Name</div>
        <div className=" py-3 text-slate-900"></div>
      </div>
      {categories?.map((category, index) => (
        <CategoryItem key={index} category={category} setCategories={setCategories} />
      ))}

      {!categories?.length && (
        <div className="flex items-center px-4 py-3 font-medium text-slate-500">
          <p>There are no categories</p>
        </div>
      )}
    </section>
  );
}

function CategoryItem({ category, setCategories }) {
  const [sending, setSending] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({ title: category.name });

  async function updateCategory() {
    if (sending) return;

    const data = {
      id: category.id,
      name: input.name,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/categories/update", data);

      toast.success("Changes saved");
      setCategories((prev) => prev.map((cat) => (cat.id === res.data.id ? res.data : cat)));
      setEdit(false);
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div key={category.id} className="grid grid-cols-[1fr_180px] items-center px-4 even:bg-slate-100/90 hover:bg-slate-200/75 font-bold text-sm duration-200">
      <div className="flex items-center gap-3  py-2 text-slate-900 capitalize">
        <div href="/profile" className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            {edit ? (
              <input
                value={input.name}
                onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md"
              />
            ) : (
              <p className="font-medium capitalize">{category.name}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {edit ? (
          <>
            <button
              onClick={updateCategory}
              className="w-fit px-3 border border-purple-800 rounded-full hover:bg-violet-100 text-purple-800 text-sm font-semibold duration-300"
            >
              Save
            </button>
            <button
              onClick={() => {
                setInput({ title: category.name });
                setEdit(false);
              }}
              className="w-fit px-3 border border-red-600 rounded-full hover:bg-violet-100 text-red-600 text-sm font-semibold duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEdit(true);
              }}
              className="w-fit px-3 border border-purple-800 rounded-full hover:bg-violet-100 text-purple-800 text-sm font-semibold duration-300"
            >
              Update
            </button>
            <DeleteCategoryMenu category={category} setCategories={setCategories} />
          </>
        )}
        {sending ? (
          <i className="flex items-center">
            <RingLoader color="black" />
          </i>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function DeleteCategoryMenu({ category, setCategories }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/categories/deleteById", { params: { id: category.id } });

      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      toast.success("Category deleted");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <Menu as="div" className="relative self-center">
      <div>
        <Menu.Button className="self-center px-3 border border-red-500 rounded-full hover:bg-red-100 text-red-500 text-sm font-semibold duration-300">
          Delete
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="z-10"
      >
        <Menu.Items className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  rounded-md bg-white shadow-lg ring-1 ring-red-500 focus:outline-none">
          <div className="flex gap-2 p-1">
            {sending ? (
              <i className="flex items-center">
                <RingLoader color="red" />
              </i>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${active ? "bg-red-600" : "bg-red-500"} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-slate-300" : "bg-slate-200"} text-slate-700 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Cancel
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
