const Answer = require("@/models/Answer");
const User = require("@/models/User");

export default async function handler(req, res) {
  const { id, content } = req.body;

  const data = {
    content,
  };

  try {
    await Answer.update(data, {
      where: {
        id,
      },
    });

    const result = await Answer.findByPk(id, {
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
