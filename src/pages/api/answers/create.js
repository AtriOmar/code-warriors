import Question from "@/models/Question";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function create(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const body = req.body;

  try {
    const data = {
      content: body.content,
      userId: body.userId,
    };

    const result = await Question.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
