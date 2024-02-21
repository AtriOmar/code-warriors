import Answer from "@/models/Answer";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function create(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user } = session || {};

  console.log("-------------------- user from create answer --------------------");
  console.log(session);

  const body = req.body;

  try {
    const data = {
      content: body.content,
      questionId: body.questionId,
      userId: user?.id,
    };

    const result = await Answer.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
