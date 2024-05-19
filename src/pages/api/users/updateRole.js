const User = require("@/models/User");

export default async function handler(req, res) {
  const { id, accessId } = req.body;

  const data = {
    accessId,
  };

  console.log("-------------------- data --------------------");
  console.log(data);

  try {
    await User.update(data, {
      where: {
        id,
      },
    });

    const result = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
