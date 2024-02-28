import { removeFile } from "@/lib/manageFiles";

const Feedback = require("@/models/Feedback");

export default async function handler(req, res) {
  const body = req.query;

  try {
    const feedback = await Feedback.findByPk(body.id, { raw: true });

    if (!feedback) return res.status(400).send("not found");

    if (feedback.picture) await removeFile("./public/uploads/feedbacks/" + feedback.picture);

    await Feedback.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
