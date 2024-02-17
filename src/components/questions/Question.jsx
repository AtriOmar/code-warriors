import { formatDate } from "@/lib/formatDate";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Question({ question }) {
  const author = question.User;

  return (
    <article className="mt-10 grow">
      <div className="px-8 py-6 rounded-xl bg-slate-100">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-700">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
          <Link href="/profile" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
            <p className="font-medium capitalize">{author.username}</p>
          </Link>
        </div>
        <h1 className="font-bold text-2xl text-slate-900">{question.title}</h1>

        <div className="mt-4 " dangerouslySetInnerHTML={{ __html: question.content }}></div>
      </div>
    </article>
  );
}
