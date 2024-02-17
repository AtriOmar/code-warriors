export default function QuestionsSidebar() {
  return (
    <div className="w-[200px] rounded-lg px-6 py-4 bg-slate-100">
      <h2 className="font-bold text-purple">Questions</h2>
      <ul className="mt-2 flex flex-col gap-2 list-disc font-bold text-sm">
        <li className="ml-7 ">Ask question</li>
        <li className="ml-7 ">Read questions</li>
      </ul>
      <h2 className="mt-6 font-bold text-purple">Conversations</h2>
    </div>
  );
}
