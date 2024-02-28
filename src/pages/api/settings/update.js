const Setting = require("@/models/Setting");

export default async function handler(req, res) {
  const body = req.body;

  if (!body.id || !body.value) return res.status(400).send("Invalid input");

  const data = {
    value: body.value,
  };

  try {
    await Setting.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Setting.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
