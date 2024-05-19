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

const htmlToDraft = typeof window !== "undefined" ? require("html-to-draftjs").default : null;
export default function articles({ categories = [], article }) {
  const blocksFromHtml = htmlToDraft?.(article.content);
  const { contentBlocks, entityMap } = blocksFromHtml || {};
  const contentState = typeof window !== "undefined" && ContentState.createFromBlockArray(contentBlocks, entityMap);
  const [editorState, setEditorState] = useState(typeof window !== "undefined" ? EditorState.createWithContent(contentState) : null);

  const { data: session } = useSession();
  const { user } = session || {};
  const [input, setInput] = useState({
    title: article.title,
    poster: article.poster,
    category: { value: article?.Category?.id, label: article?.Category?.name },
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

  async function updatePicture() {
    const formData = new FormData();

    formData.append("id", article.id);
    formData.append("poster", input.poster);

    setSending(true);
    try {
      const res = await axios.post("/api/articles/updatePicture", formData, config);
    } catch (err) {}
    setSending(false);
    setProgress(-1);
  }

  async function updateArticle() {
    if (sending) return;

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    if (input.poster !== article.poster) await updatePicture();

    if (!input.title || !input.category?.value) return;

    if (input.title === article.title && input.category?.value === article.Category?.id) return router.push("/admin/articles");

    const data = {
      id: article.id,
      title: input.title,
      content: markup,
      categoryId: input.category.value,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/articles/update", data);
      router.push(`/admin/articles`);
      toast.success("Changes saved");
    } catch (err) {
      toast.error("An error occurred");

      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="px-4 scr1100:px-20 pt-12 pb-20">
      <h1 className="font-bold text-xl">Article</h1>
      <h1 className="mt-4 font-bold">Poster</h1>
      {/* <PosterSelect input={input} setInput={setInput} /> */}
      <PhotoSelect
        picture={input.poster}
        picturePath="/api/photo?path=/uploads/articles/"
        setPicture={(photo) => setInput((prev) => ({ ...prev, poster: photo }))}
        aspectRatio={"2 / 1"}
        maxWidth="400px"
      />
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
      <div className="flex gap-2 w-fit mt-8 ml-auto">
        <Link
          href="/admin/articles"
          className="block px-8 py-2 rounded-md bg-white hover:bg-slate-100 text-purple text-sm text-center shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Back
        </Link>
        <button
          onClick={updateArticle}
          className="relative block px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Update Article
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
  const Article = require("@/models/Article");

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
  const article = await Article.findByPk(context.params.id, { include: { model: Category } });

  if (!article) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/articles",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      categories: JSON.parse(JSON.stringify(categories)),
      article: JSON.parse(JSON.stringify(article)),
    },
  };
}
