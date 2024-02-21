import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

import * as commands from "@uiw/react-md-editor/commands";
import axios from "axios";
import { RingLoader } from "../Loading";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function CreateAnswer({ question, refetchAnswers }) {
  const [value, setValue] = useState("**Hello world!!!**");
  const [sending, setSending] = useState(false);

  async function createAnswer() {
    if (sending) return;

    setSending(true);
    try {
      const data = {
        content: value,
        questionId: question.id,
      };
      const res = await axios.post("/api/answers/create", data);

      console.log(res.data);
      setValue("**Hello world!!!**");
      refetchAnswers();
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="mt-20">
      <h2 className="mb-2 font-bold text-xl" id="create-answer">
        Write an answer
      </h2>
      <MDEditor value={value} onChange={setValue} preview="edit" extraCommands={[]} />
      <h3 className="mt-4 mb-2 font-bold">Preview</h3>

      {/* <MDEditor value={value} onChange={setValue} preview="preview" hideToolbar visibleDragbar={false} /> */}
      <div className="px-2 py-4 rounded border border-slate-300">
        <Markdown source={value} />
      </div>
      <button
        onClick={createAnswer}
        className="relative block mt-8 px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Post Answer
        {sending ? (
          <i className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <RingLoader color="white" />
          </i>
        ) : (
          ""
        )}
      </button>
    </div>
  );
}
