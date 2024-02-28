import QuestionsSidebar from "@/components/QuestionsSidebar";
import AllQuestions from "@/components/questions/AllQuestions";

export default function Questions({ questions }) {
  return (
    <div className={`py-4`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        <AllQuestions questions={questions} />
      </div>
    </div>
  );
}
