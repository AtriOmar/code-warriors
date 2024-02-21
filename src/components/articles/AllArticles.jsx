import { formatDate } from "@/lib/formatDate";
import { faCircleUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function AllArticles({ articles }) {
  return (
    <article className="mt-10 mb-20">
      <div className="flex pl-4 pr-8 py-4 mb-10 rounded-full bg-slate-100">
        <input type="text" placeholder="What are you looking for ?" className="grow outline-none bg-transparent" />
        <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-500" />
      </div>
      <h1 className="font-bold text-xl">Articles</h1>
      <div className="mt-6 grid grid-cols-2 scr900:grid-cols-3 scr1200:grid-cols-4 gap-4">
        {articles?.map((article) => {
          return <QuestionCard article={article} key={article.id} />;
        })}
      </div>
    </article>
  );
}

function QuestionCard({ article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex flex-col bg-white hover:bg-slate-100 rounded-lg overflow-hidden shadow-md hover:shadow-[2px_2px_10px_rgb(0,0,0,.3)] duration-200"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image src={`/api/photo?path=/uploads/articles/${article.poster}`} fill alt="Article Poster" className="object-cover" priority />
      </div>
      <div className="flex flex-col grow px-4 pt-2 pb-4">
        <p className="text-xs text-slate-700">Posted on {formatDate(new Date(article.createdAt), "date")}</p>
        <h2 className="mt-2 mb-2 font-semibold text-base line-clamp-2">{article.title}</h2>
        <div className="mt-2 mb-2 font-medium text-sm text-slate-500 line-clamp-2 white-space-pre">{article.content.replace(/<[^>]+>/g, "")}</div>
        <p className="w-fit mt-auto px-3 py-2 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {article.Category.name}
        </p>
      </div>
    </Link>
  );
}
