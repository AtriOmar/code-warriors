import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { formatDate } from "@/lib/formatDate";
import { faCircleUser, faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CreateAnswer from "@/components/questions/CreateAnswer";
import Answers from "./Answers";
import { Fragment, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { RingLoader } from "@/components/Loading";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function Question({ question: initialQuestion }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answers, setAnswers] = useState(question.Answers);
  const author = question.User;

  const { data: session } = useSession();
  const { user: authUser } = session || {};
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    title: question.title,
    content: question.content,
  });
  const [sending, setSending] = useState(false);

  async function updateQuestion() {
    if (sending) return;

    const data = {
      id: question.id,
      title: input.title,
      content: input.content,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/questions/update", data);

      setEdit(false);
      setQuestion((prev) => ({ ...prev, ...res.data }));
      toast.success("Changes saved");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  async function refetchAnswers() {
    try {
      const res = await axios.get(`/api/answers/getAll`, {
        params: {
          questionId: question.id,
        },
      });

      console.log("-------------------- answers --------------------");
      console.log(answers);

      setAnswers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="mt-10 grow">
      <div className="px-8 py-6 rounded-xl bg-slate-100">
        {edit ? (
          <input
            value={input.title}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, title: e.target.value }));
            }}
            type="text"
            className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 font-bold outline-purple"
            placeholder="Title"
          />
        ) : (
          <h1 className="font-bold text-2xl text-slate-900">{question.title}</h1>
        )}
        <div className="flex scr600:items-center justify-between flex-col scr600:flex-row mt-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-700">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
            <p className="w-fit px-3 py-1 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
              {question.Category?.name}
            </p>
          </div>
          <Link href={"/profile/" + author?.id} className="flex gap-2 items-center">
            {author?.picture ? (
              <div className="relative w-8 aspect-square rounded-full overflow-hidden">
                <Image src={`/api/photo?path=/uploads/profile-pictures/${author?.picture}`} fill alt="Profile Image" className="object-cover" priority />
              </div>
            ) : (
              <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
            )}
            <p className="font-medium capitalize">{author?.username}</p>
          </Link>
        </div>

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
          <div className="pl-2 py-4">
            <Markdown source={question.content} style={{ background: "transparent" }} />
          </div>
        )}
        <div className="mt-8 flex justify-between gap-2 items-center">
          <Link
            href="#create-answer"
            className="relative block w-fit px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
          >
            Answer
          </Link>
          {authUser.id === question.userId && !edit ? (
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className=" flex gap-2 items-center relative block w-fit px-3 py-1 rounded-md bg-purple hover:bg-purple-700 text-white text-[13px] shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
              >
                <span>Edit</span>
                <FontAwesomeIcon icon={faPenToSquare} className="text-white text-sm" />
              </button>
              <DeleteMenu question={question} setQuestion={setQuestion} />
            </div>
          ) : authUser.id === question.userId && edit ? (
            <div className="flex gap-2">
              <button
                onClick={updateQuestion}
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
      <Answers answers={answers} setAnswers={setAnswers} />
      <CreateAnswer question={question} refetchAnswers={refetchAnswers} />
    </article>
  );
}

function DeleteMenu({ question, setQuestion }) {
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/questions/deleteById", { params: { id: question.id } });

      toast.success("Question deleted");
      router.push("/questions");
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
