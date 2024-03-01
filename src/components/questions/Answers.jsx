import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { formatDate } from "@/lib/formatDate";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { RingLoader } from "@/components/Loading";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function Answers({ answers, setAnswers }) {
  return (
    <div className="">
      <h2 className="mt-10 mb-2 font-bold text-xl">{answers.length} &nbsp; Answers</h2>
      {answers.map((answer) => (
        <Answer key={answer.id} answer={answer} setAnswers={setAnswers} />
      ))}
    </div>
  );
}

function Answer({ answer, setAnswers }) {
  const author = answer.User;
  const { data: session } = useSession();
  const { user: authUser } = session || {};

  const [input, setInput] = useState({
    content: answer.content,
  });
  const [sending, setSending] = useState(false);
  const [edit, setEdit] = useState(false);

  async function updateAnswer() {
    if (sending) return;

    const data = {
      id: answer.id,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/answers/update", data);

      setEdit(false);
      setAnswers((prev) => prev.map((ans) => (ans.id === res.data.id ? res.data : ans)));
      toast.success("Changes saved");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="px-4 py-10 border-b border-purple-400">
      <Link href={"/profile/" + author?.id} className="flex gap-2 items-center w-fit">
        {author?.picture ? (
          <div className="relative w-8 aspect-square rounded-full overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${author?.picture}`} fill alt="Profile Image" className="object-cover" priority />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        )}
        <p className="font-medium capitalize">{author?.username}</p>
      </Link>
      <p className="mt-2 text-xs text-slate-700">Posted on {formatDate(new Date(answer.createdAt), "date")}</p>
      {edit ? (
        <div className="pl-2 py-4">
          <MDEditor
            value={input.content}
            onChange={(value) => {
              setInput((prev) => ({ ...prev, content: value }));
            }}
            preview="edit"
            extraCommands={[]}
          />
          <div className="mt-4 px-2 py-4 rounded border border-slate-300 bg-white">
            <Markdown source={input.content} style={{ background: "transparent" }} />
          </div>
        </div>
      ) : (
        <div className="w-0 min-w-full mt-4 px-2 pt-4 pb-8">
          <Markdown source={answer.content} style={{ background: "transparent" }} />
        </div>
      )}
      <div className="ml-auto w-fit">
        {authUser.id === answer.userId && !edit ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEdit(true);
              }}
              className=" flex gap-2 items-center relative block w-fit px-3 py-1 rounded-md bg-purple hover:bg-purple-700 text-white text-[13px] shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            >
              <span>Edit</span>
              <FontAwesomeIcon icon={faPenToSquare} className="text-white text-sm" />
            </button>
            <DeleteMenu answer={answer} setAnswers={setAnswers} />
          </div>
        ) : authUser.id === answer.userId && edit ? (
          <div className="flex gap-2">
            <button
              onClick={updateAnswer}
              className=" flex gap-2 items-center relative block w-fit px-3 py-1 rounded-md bg-purple hover:bg-purple-700 text-white text-[13px] shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            >
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setEdit(false);
              }}
              className=" flex gap-2 items-center relative block w-fit px-3 py-1 rounded-md bg-red-500 hover:bg-red-700 text-white text-[13px] shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            >
              <span>Cancel</span>
            </button>
            {sending ? (
              <i className="flex items-center">
                <RingLoader color="black" />
              </i>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function DeleteMenu({ answer, setAnswers }) {
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/answers/deleteById", { params: { id: answer.id } });

      setAnswers((prev) => prev.filter((ans) => ans.id !== answer.id));
      toast.success("Question deleted");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <Menu as="div" className="relative self-center">
      <div>
        <Menu.Button className="flex gap-2 items-center relative block w-fit px-3 py-1 rounded-md bg-red-500 hover:bg-red-700 text-white text-[13px] shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
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
