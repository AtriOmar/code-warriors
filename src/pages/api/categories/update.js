const Category = require("@/models/Category");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    name: body.name,
  };

  try {
    await Category.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Category.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
