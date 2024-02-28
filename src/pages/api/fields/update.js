const Field = require("@/models/Field");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    title: body.title,
    content: body.content,
  };

  try {
    await Field.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Field.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
