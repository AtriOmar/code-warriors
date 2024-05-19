const Question = require("@/models/Question");
const Category = require("@/models/Category");

export default async function handler(req, res) {
  const { id, title, content, categoryId } = req.body;

  const data = {
    title,
    content,
  };

  if (categoryId) data.categoryId = categoryId;

  try {
    await Question.update(data, {
      where: {
        id,
      },
    });

    const result = await Question.findByPk(id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
