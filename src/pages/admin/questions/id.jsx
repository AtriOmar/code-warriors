import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

import { ContentState, EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RingLoader } from "@/components/Loading";
import Select from "@/components/questions/CategorySelect";
import PosterSelect from "@/components/Admin/articles/PosterSelect";
import PhotoSelect from "@/components/Admin/management/PhotoSelect";
import { toast } from "react-toastify";
import Link from "next/link";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

const htmlToDraft = typeof window !== "undefined" ? require("html-to-draftjs").default : null;
export default function articles({ categories = [], question }) {
  const blocksFromHtml = htmlToDraft?.(question.content);
  const { contentBlocks, entityMap } = blocksFromHtml || {};
  const contentState = typeof window !== "undefined" && ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(typeof window !== "undefined" ? EditorState.createWithContent(contentState) : null);

  const { data: session } = useSession();
  const { user } = session || {};
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    title: question.title,
    content: question.content,
    category: { value: question?.Category?.id, label: question?.Category?.name },
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState(-1);

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  async function updateQuestion() {
    if (sending) return;

    const data = {
      id: question.id,
      title: input.title,
      content: input.content,
      categoryId: input.category.value,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/questions/update", data);

      setEdit(false);
      // setQuestion((prev) => ({ ...prev, ...res.data }));
      router.push("/admin/questions");
      toast.success("Changes saved");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="px-4 scr1100:px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">Question</h1>
      <h1 className="mt-8 font-bold">Title</h1>
      <input
        value={input.title}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, title: e.target.value }));
        }}
        type="text"
        className="w-full mt-3 px-4 py-2 rounded-md border border-slate-300 outline-purple"
        placeholder="Title"
      />
      {/* <div className="mt-8 px-4 pt-4 pb-20 rounded-md border border-slate-300 focus-within:ring-1 ring-purple">
        <Editor
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
      </div> */}
      <h3 className="mt-8 mb-2 font-bold">Content</h3>
      <div className="">
        <MDEditor value={input.content} onChange={(value) => setInput((prev) => ({ ...prev, content: value }))} preview="edit" extraCommands={[]} />
      </div>
      <h3 className="mt-4 mb-2 font-bold">Preview</h3>
      <div className=" px-2 py-4 rounded border border-slate-300">
        <Markdown source={input.content} />
      </div>
      <h1 className="mt-8 font-bold">Category</h1>
      <Select
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
      <div className="flex gap-2 w-fit mt-8 ml-auto">
        <Link
          href="/admin/questions"
          className="block px-8 py-2 rounded-md bg-white hover:bg-slate-100 text-purple text-sm text-center shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Back
        </Link>
        <button
          onClick={updateQuestion}
          className="relative block px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Update Question
          {sending ? (
            <i className="absolute right-1 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}

articles.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Category = require("@/models/Category");
  const Question = require("@/models/Question");

  const session = await getServerSession(context.req, context.res, authOptions);

  if (!(session?.user?.accessId > 1)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const categories = await Category.findAll();
  const question = await Question.findByPk(context.params.id, { include: { model: Category, attributes: ["id", "name"] } });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
      question: JSON.parse(JSON.stringify(question)),
    },
  };
}
