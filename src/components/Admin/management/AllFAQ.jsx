import { RingLoader } from "@/components/Loading";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function AllFAQ({ faqs, setFaqs }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {faqs?.map((faq) => (
        <FAQItem key={faq.id} faq={faq} setFaqs={setFaqs} />
      ))}
    </div>
  );
}

function FAQItem({ faq, setFaqs }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({ title: faq.title, content: faq.content });
  const [edit, setEdit] = useState(false);
  const [sending, setSending] = useState(false);

  async function updateFAQ() {
    if (sending) return;

    const data = {
      id: faq.id,
      title: input.title,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/faq/update", data);

      toast.success("Changes saved");
      setEdit(false);
      setFaqs((prev) => prev.map((faq) => (faq.id === res.data.id ? res.data : faq)));
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
            <>
              {faq.title}
              <FontAwesomeIcon icon={faChevronDown} />
            </>
          )}
        </button>
        <div className={`${open || edit ? "mt-2" : ""}`} style={{ transition: ".3s", gridTemplateRows: open || edit ? "1fr" : "0fr", display: "grid" }}>
          {edit ? (
            <input
              value={input.content}
              onChange={(e) => setInput((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md text-[13px]"
            />
          ) : (
            <div className={` overflow-hidden text-[13px] text-slate-500`}>{faq.content}</div>
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
          <DeleteFAQMenu faq={faq} setFaqs={setFaqs} />
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
              setInput({ title: faq.title, content: faq.content });
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

function DeleteFAQMenu({ faq, setFaqs }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/faq/deleteById", { params: { id: faq.id } });

      setFaqs((prev) => prev.filter((q) => q.id !== faq.id));
      toast.success("FAQ deleted");
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
