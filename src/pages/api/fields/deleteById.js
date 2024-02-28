import { removeFile } from "@/lib/manageFiles";

const Field = require("@/models/Field");

export default async function handler(req, res) {
  const body = req.query;

  try {
    const field = await Field.findByPk(body.id, { raw: true });

    if (!field) return res.status(400).send("not found");

    if (field.icon) await removeFile("./public/uploads/fields/" + field.icon);

    await Field.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
