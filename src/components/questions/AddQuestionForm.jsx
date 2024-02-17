import dynamic from "next/dynamic";
// const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), { ssr: false });
// const EditorState = dynamic(() => import("draft-js").then((mod) => mod.EditorState), { ssr: false });
import { useRef, useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

export default function AddQuestionForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { data: session } = useSession();
  const { user } = session || {};

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSave = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    console.log(markup);
  };

  return (
    <article className="mt-10">
      <h1 className="font-bold text-xl">Ask a question</h1>
      <div href="/profile" className="flex gap-2 items-center mt-8">
        <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        <p className="font-medium capitalize">{user.username}</p>
      </div>
      <div className="mt-6 px-4 pt-4 pb-20 rounded-md border border-slate-300 focus-within:ring-1 ring-purple">
        <Editor
          placeholder="Write your question here..."
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ["inline", "blockType", "fontSize", "list", "textAlign"],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
          }}
        />
        {/* <button
          onClick={onSave}
          className="block mt-10 ml-auto px-2 py-1 rounded-lg bg-purple hover:bg-purple-700 text-white font-bold cursor-pointer duration-300"
          >
          Save
        </button> */}
      </div>
      <h1 className="mt-8 font-bold">Mention tags</h1>
      <input type="text" className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple" placeholder="tags..." />
      <h1 className="mt-8 font-bold">Category</h1>
      <input type="text" className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple" placeholder="Category..." />
    </article>
  );
}
