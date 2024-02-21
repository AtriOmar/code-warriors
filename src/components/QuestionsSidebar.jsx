import Link from "next/link";
import { useRouter } from "next/router";

export default function QuestionsSidebar() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="shrink-0 w-[200px] rounded-lg px-6 py-4 bg-slate-100">
      <div className="sticky top-20">
        <h2 className="font-bold text-purple">Questions</h2>
        <ul className="mt-2 flex flex-col gap-2 list-disc font-bold text-sm">
          <li className={`ml-7 hover:text-purple duration-200 ${router.pathname === "/questions/new" ? "text-purple" : ""}`}>
            <Link href="/questions/new">Ask question</Link>
          </li>
          <li className={`ml-7 hover:text-purple duration-200 ${router.pathname === "/questions" ? "text-purple" : ""}`}>
            <Link href="/questions">All questions</Link>
          </li>
        </ul>
        <h2 className="mt-6 font-bold text-purple">Conversations</h2>
      </div>
    </div>
  );
}
