const Value = require("@/models/Value");

export default async function handler(req, res) {
  const body = req.query;

  try {
    await Value.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
