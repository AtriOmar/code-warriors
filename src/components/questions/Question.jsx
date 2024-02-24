import { formatDate } from "@/lib/formatDate";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CreateAnswer from "@/components/questions/CreateAnswer";
import Answers from "./Answers";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Question({ question }) {
  const author = question.User;
  const [answers, setAnswers] = useState(question.Answers);

  async function refetchAnswers() {
    try {
      const res = await axios.get(`/api/answers/getAll`, {
        params: {
          questionId: question.id,
        },
      });

      console.log("-------------------- answers --------------------");
      console.log(answers);

      setAnswers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="mt-10 grow">
      <div className="px-8 py-6 rounded-xl bg-slate-100">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-700">Posted on {formatDate(new Date(question.createdAt), "date")}</p>
          <Link href={"/profile/" + author.id} className="flex gap-2 items-center">
            {author.picture ? (
              <div className="relative w-8 aspect-square rounded-full overflow-hidden">
                <Image src={`/api/photo?path=/uploads/profile-pictures/${author.picture}`} fill alt="Profile Image" className="object-cover" priority />
              </div>
            ) : (
              <FontAwesomeIcon icon={faCircleUser} className="text-3xl text-slate-500" />
            )}
            <p className="font-medium capitalize">{author.username}</p>
          </Link>
        </div>
        <h1 className="font-bold text-2xl text-slate-900">{question.title}</h1>

        <div className="mt-4 " dangerouslySetInnerHTML={{ __html: question.content }}></div>
        <Link
          href="#create-answer"
          className="relative block w-fit mt-8 px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Answer
        </Link>
      </div>
      <Answers answers={answers} />
      <CreateAnswer question={question} refetchAnswers={refetchAnswers} />
    </article>
  );
}
