const Feedback = require("@/models/Feedback");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    name: body.name,
    role: body.role,
    feedback: body.feedback,
  };

  try {
    await Feedback.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Feedback.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
