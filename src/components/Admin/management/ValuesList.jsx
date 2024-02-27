import { RingLoader } from "@/components/Loading";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function ValuesList({ values, setValues }) {
  if (!values?.length) return <p className="ml-3 mt-2 font-medium text-sm text-slate-500">There are no values</p>;

  return (
    <div className="flex flex-col gap-2 mt-2">
      {values?.map((value) => (
        <ValueItem key={value.id} value={value} setValues={setValues} />
      ))}
    </div>
  );
}

function ValueItem({ value, setValues }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({ title: value.title, content: value.content });
  const [edit, setEdit] = useState(false);
  const [sending, setSending] = useState(false);

  async function updateFAQ() {
    if (sending) return;

    const data = {
      id: value.id,
      title: input.title,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/values/update", data);

      toast.success("Changes saved");
      setEdit(false);
      setValues((prev) => prev.map((faq) => (faq.id === res.data.id ? res.data : faq)));
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="flex gap-2">
      <div className="grow px-3 py-2 bg-white  border border-slate-300 shadow rounded-lg" suppressHydrationWarning>
        <button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="w-full flex justify-between items-center  rounded-lg text-sm font-medium capitalize"
        >
          {edit ? (
            <input
              value={input.title}
              onChange={(e) => setInput((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md"
            />
          ) : (
            <>{value.title}</>
          )}
        </button>
        <div className={`mt-2`}>
          {edit ? (
            <input
              value={input.content}
              onChange={(e) => setInput((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md text-[13px]"
            />
          ) : (
            <div className={` text-[13px] text-slate-500`}>{value.content}</div>
          )}
        </div>
      </div>
      {!edit ? (
        <>
          <button
            onClick={() => {
              setEdit(true);
            }}
            className="self-center px-3 border border-purple rounded-full hover:bg-violet-100 text-purple text-sm font-semibold duration-300"
          >
            Edit
          </button>
          <DeleteValueMenu value={value} setValues={setValues} />
        </>
      ) : (
        <>
          <button
            onClick={updateFAQ}
            className="self-center px-3 border border-purple rounded-full hover:bg-violet-100 text-purple text-sm font-semibold duration-300"
          >
            Save
          </button>
          <button
            onClick={() => {
              setInput({ title: value.title, content: value.content });
              setEdit(false);
            }}
            className="self-center px-3 border border-red-500 rounded-full hover:bg-red-100 text-red-500 text-sm font-semibold duration-300"
          >
            Cancel
          </button>
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
  );
}

function DeleteValueMenu({ value, setValues }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/values/deleteById", { params: { id: value.id } });

      setValues((prev) => prev.filter((q) => q.id !== value.id));
      toast.success("Value deleted");
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
