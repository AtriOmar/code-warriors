import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

export default function Questions({ questions }) {
  return (
    <div className="flex flex-col gap-2 px-8 pt-10 pb-20">
      <h2 className="font-bold text-slate-900 text-2xl">Questions</h2>
      {questions.map((question) => (
        <Question question={question} />
      ))}
    </div>
  );
}

function Question({ question }) {
  return (
    <Link href={`/questions/${question.id}`} className="p-4 border border-slate-200 hover:bg-slate-100 rounded-lg duration-200">
      <p className="text-xs text-slate-400">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
      <h2 className="mt-1 font-bold text-slate-900 line-clamp-2">{question.title}</h2>
      <div className="mt-2 text-slate-400 line-clamp-4" dangerouslySetInnerHTML={{ __html: question.content }}></div>
    </Link>
  );
}
