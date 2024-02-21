import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import CategorySelect from "./CategorySelect";
import axios from "axios";
import { RingLoader } from "../Loading";
import { useRouter } from "next/router";

export default function AddQuestionForm({ categories = [] }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { data: session } = useSession();
  const { user } = session || {};
  const editor = useRef(null);
  const [input, setInput] = useState({
    title: "",
    tags: [],
    category: { value: categories[0]?.id, label: categories[0]?.name },
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSave = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    console.log(markup);
  };

  async function handleSubmit() {
    if (sending) return;

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    const data = {
      title: input.title,
      content: markup,
      categoryId: input.category.value,
      userId: user.id,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/questions/create", data);

      console.log(res.data);
      router.push(`/questions/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <article className="mt-10">
      <h1 className="font-bold text-xl">Ask a question</h1>
      <div href="/profile" className="flex gap-2 items-center mt-8">
        <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        <p className="font-medium capitalize">{user.username}</p>
      </div>
      <h1 className="mt-4 font-bold">Title</h1>
      <input
        value={input.title}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, title: e.target.value }));
        }}
        type="text"
        className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple"
        placeholder="Title"
      />
      <div className="mt-8 px-4 pt-4 pb-20 rounded-md border border-slate-300 focus-within:ring-1 ring-purple">
        <Editor
          ref={editor}
          placeholder="Write your question here..."
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ["colorPicker", "inline", "fontSize", "list", "textAlign", "link", "emoji", "image"],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
          }}
        />
      </div>
      <h1 className="mt-8 font-bold">Mention tags</h1>
      <input type="text" className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple" placeholder="tags..." />
      <h1 className="mt-8 font-bold">Category</h1>
      {/* <input type="text" className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple" placeholder="Category" /> */}
      <CategorySelect
        options={categoriesOptions}
        value={input.category}
        onChange={(option) => {
          setInput((prev) => ({ ...prev, category: option }));
        }}
        formatSelectedOption={({ Button, buttonProps, option }) => (
          <Button
            {...buttonProps}
            className="flex items-center justify-between w-full mt-3 px-4 py-2 outline-purple rounded-md border border-slate-300 text-left"
          >
            {option.label}
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          </Button>
        )}
      />

      <button
        onClick={handleSubmit}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Post Question
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
