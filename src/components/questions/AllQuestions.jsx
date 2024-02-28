import { formatDate } from "@/lib/formatDate";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function AllQuestions({ questions }) {
  return (
    <article className="mt-10 mb-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Questions</h1>
        <Link
          href="/questions/new"
          className="relative block mt-8 ml-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Ask Question
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {questions?.map((question) => {
          return <QuestionCard question={question} key={question.id} />;
        })}
      </div>
    </article>
  );
}

function QuestionCard({ question }) {
  const author = question?.User;

  return (
    <Link href={`/questions/${question.id}`} className="flex flex-col bg-white hover:bg-slate-100 rounded-lg p-4 shadow-md duration-200">
      <div href="/profile" className="flex gap-2 items-center">
        {author.picture ? (
          <div className="relative w-8 aspect-square rounded-full overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${author.picture}`} fill alt="Profile Image" className="object-cover" priority />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        )}
        <p className="font-medium capitalize">{author?.username}</p>
      </div>
      <p className="text-xs text-slate-700">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
      <h2 className="mt-2 mb-2 font-semibold text-base">{question.title}</h2>
      <p className="mt-auto text-xs text-slate-700">{question?.answerCount} Answers</p>
    </Link>
  );
}
