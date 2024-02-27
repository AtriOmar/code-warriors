import { removeFile } from "@/lib/manageFiles";

const Team = require("@/models/Team");

export default async function handler(req, res) {
  const body = req.query;

  try {
    const member = await Team.findByPk(body.id, { raw: true });

    if (!member) return res.status(400).send("not found");

    if (member.picture) await removeFile("./public/uploads/team/" + member.picture);

    await Team.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
