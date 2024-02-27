import Answer from "@/models/Answer";
import User from "@/models/User";

export default async function handler(req, res) {
  const { questionId } = req.query;

  console.log(questionId);

  try {
    const result = await Answer.findAll({
      where: {
        questionId,
      },
      include: {
        model: User,
        attributes: ["id", "username", "picture"],
      },
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
