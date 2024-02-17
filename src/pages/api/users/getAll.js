import User from "@/models/User";

export default async function handler(req, res) {
  try {
    const result = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
