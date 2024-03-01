const Question = require("@/models/Question");

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await Question.destroy({
      where: {
        id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
