const Friendship = require("@/models/Friendship");

export default async function handler(req, res) {
  const body = req.query;

  try {
    await Friendship.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
