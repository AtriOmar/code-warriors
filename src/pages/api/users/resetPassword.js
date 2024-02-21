const User = require("@/models/User");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const saltRounds = 10;

export default async function handler(req, res) {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      res.status(400).json("invalid or expired token");
      return;
    }

    const hash = await bcrypt.hash(password, saltRounds);

    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    console.log(user);

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
    res.status(400).send(JSON.stringify(error));
  }
}
