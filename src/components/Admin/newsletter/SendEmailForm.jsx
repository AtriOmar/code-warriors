import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import axios from "axios";
import { RingLoader } from "@/components/Loading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function SendEmailForm({}) {
  const { data: session } = useSession();
  const { user } = session || {};
  const [input, setInput] = useState({
    subject: "New Letter From Code Warriors",
    body: "",
    target: "subs",
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (sending) return;

    const data = {
      subject: input.subject,
      body: input.body,
      target: input.target,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/newsletter/sendLetter", data);

      toast.success("Letter sent successfully");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  function sanitizeHtml(html) {
    const sanitizedInput = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    return sanitizedInput;
  }

  return (
    <article className="">
      <h1 className="font-bold text-xl">Send a letter</h1>
      <p className="mt-4 font-bold">Subject</p>
      <input
        value={input.subject}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, subject: e.target.value }));
        }}
        type="text"
        className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple"
        placeholder="Subject"
      />
      <p className="mt-4 font-bold">
        Body: <span className="text-slate-400">(HTML)</span>
      </p>
      <textarea
        placeholder="Keep your users updated with the latest news and updates."
        value={input.body}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, body: e.target.value }));
        }}
        className="w-full mt-4 px-4 py-3 rounded-md border border-slate-300 outline-purple resize-none"
        rows={8}
      />
      <p className="mt-4 font-bold">Preview</p>
      {input.body ? <iframe title="Custom Iframe" srcDoc={sanitizeHtml(input.body)} className="w-full h-[300px] rounded-md border border-slate-300" /> : ""}
      <p className="mt-4 font-bold">Target</p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setInput((prev) => ({ ...prev, target: "subs" }))}
          className={`px-3 py-2 rounded text-sm ${
            input.target === "subs" ? "bg-green-500 text-white ring-2 ring-green-600" : "bg-slate-100 text-slate-400 ring-1 ring-slate-300"
          }`}
        >
          Subscribers
        </button>
        <button
          onClick={() => setInput((prev) => ({ ...prev, target: "all" }))}
          className={`px-3 py-2 rounded text-sm ${
            input.target === "all" ? "bg-green-500 text-white ring-2 ring-green-600" : "bg-slate-100 text-slate-400 ring-1 ring-slate-300"
          }`}
        >
          All Users
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Send letter
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
