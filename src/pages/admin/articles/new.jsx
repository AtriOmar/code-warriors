import AdminAccounts from "@/components/Admin/accounts/AdminAccounts";
import UsersAccounts from "@/components/Admin/accounts/UsersAccounts";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Articles from "@/components/Admin/articles/Articles";
import Link from "next/link";
import dynamic from "next/dynamic";

import { EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RingLoader } from "@/components/Loading";
import Select from "@/components/questions/CategorySelect";
import PosterSelect from "@/components/Admin/articles/PosterSelect";

export default function articles({ categories = [] }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { data: session } = useSession();
  const { user } = session || {};
  const [input, setInput] = useState({
    title: "",
    category: { value: categories[0]?.id, label: categories[0]?.name },
  });
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState(-1);

  const config = {
    onUploadProgress: (e) => {
      const prog = Math.round((e.loaded * 100) / e.total);
      setProgress(prog);
    },
  };

  const categoriesOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  async function handleSubmit() {
    if (sending) return;

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    // const data = {
    //   title: input.title,
    //   content: markup,
    //   categoryId: input.category.value,
    // };

    const formData = new FormData();

    formData.append("photo", input.photo);
    formData.append("title", input.title);
    formData.append("content", markup);
    formData.append("categoryId", input.category.value);

    setSending(true);
    try {
      const res = await axios.post("/api/articles/create", formData, config);

      console.log(res.data);
      router.push(`/admin/articles`);
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">Add a new article</h1>
      <h1 className="mt-4 font-bold">Poster</h1>
      <PosterSelect input={input} setInput={setInput} />
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
      <div className="mt-8 px-4 pt-4 pb-20 rounded-md border border-slate-300 focus-within:ring-1 ring-purple">
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
      <button
        onClick={handleSubmit}
        className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
      >
        Post Article
        {sending ? (
          <i className="absolute right-1 top-1/2 -translate-y-1/2">
            <RingLoader color="white" />
          </i>
        ) : (
          ""
        )}
      </button>
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

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
