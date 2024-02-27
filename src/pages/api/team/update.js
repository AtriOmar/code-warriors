const Team = require("@/models/Team");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    name: body.name,
    role: body.role,
  };

  try {
    await Team.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Team.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
