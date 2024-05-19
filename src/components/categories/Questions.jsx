import QuestionsSidebar from "@/components/QuestionsSidebar";
import QuestionsList from "./QuestionsList";

export default function Questions({ questions }) {
  return (
    <div className={`py-4`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        <QuestionsList questions={questions} />
      </div>
    </div>
  );
}
