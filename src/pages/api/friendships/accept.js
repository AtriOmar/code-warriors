const Friendship = require("@/models/Friendship");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    active: true,
  };

  try {
    await Friendship.update(data, {
      where: {
        id: body.id,
      },
    });

    const result = await Friendship.findByPk(body.id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
