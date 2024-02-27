const Value = require("@/models/Value");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    title: body.title,
    content: body.content,
  };

  try {
    await Value.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Value.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
