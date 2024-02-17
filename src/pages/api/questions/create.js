import Question from "@/models/Question";

export default async function create(req, res) {
  const body = req.body;

  try {
    const data = {
      title: body.title,
      content: body.content,
      userId: body.userId,
      categoryId: body.categoryId,
    };

    const result = await Question.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
