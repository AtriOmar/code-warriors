import Footer from "@/components/Footer";
import QuestionsSidebar from "@/components/QuestionsSidebar";
import AllQuestions from "@/components/questions/AllQuestions";
import Layout from "@/layouts/Layout";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function index({ questions }) {
  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <div className="flex gap-14 max-w">
        <QuestionsSidebar />
        <AllQuestions questions={questions} />
      </div>
    </div>
  );
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  var db = require("@/lib/sequelize"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
  const Question = require("@/models/Question");
  const User = require("@/models/User");
  const Answer = require("@/models/Answer");

  const session = await getServerSession(context.req, context.res, authOptions);
  const questions = await Question.findAll({
    attributes: [
      "id",
      "title",
      "createdAt",
      [sequelize.literal("(SELECT COUNT(*) FROM `Answers` WHERE `Answers`.`questionId` = `Question`.`id`)"), "answerCount"],
    ],
    include: [{ model: User, attributes: ["id", "username", "picture"] }],
  });

  console.log(questions[1]?.toJSON());

  console.log("-------------------- questions --------------------");
  console.log(questions);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}
