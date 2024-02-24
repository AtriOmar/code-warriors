import { formatDate } from "@/lib/formatDate";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function Answers({ answers }) {
  return (
    <div className="">
      <h2 className="mt-10 mb-2 font-bold text-xl">{answers.length} &nbsp; Answers</h2>
      {answers.map((answer) => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </div>
  );
}

function Answer({ answer }) {
  const author = answer.User;

  return (
    <div className="mt-10 px-4 border-b border-purple-400">
      <Link href={"/profile/" + author.id} className="flex gap-2 items-center w-fit">
        {author.picture ? (
          <div className="relative w-8 aspect-square rounded-full overflow-hidden">
            <Image src={`/api/photo?path=/uploads/profile-pictures/${author.picture}`} fill alt="Profile Image" className="object-cover" priority />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
        )}
        <p className="font-medium capitalize">{author.username}</p>
      </Link>
      <p className="mt-2 text-xs text-slate-700">Posted on {formatDate(new Date(answer.createdAt), "date")}</p>
      <div className="mt-4 px-2 pt-4 pb-8">
        <Markdown source={answer.content} />
      </div>
    </div>
  );
}
