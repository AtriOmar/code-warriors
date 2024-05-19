const Tip = require("@/models/Tip");

export default async function handler(req, res) {
  const tips = await Tip.findAll({ raw: true });

  tips.forEach(async (question) => {
    const { id, createdAt, updatedAt, ...data } = question;

    await Tip.create(data);
  });

  res.send("done");
}
