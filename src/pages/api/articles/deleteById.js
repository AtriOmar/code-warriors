import { removeFile } from "@/lib/manageFiles";

const Article = require("@/models/Article");

export default async function handler(req, res) {
  const body = req.query;

  try {
    const article = await Article.findByPk(body.id, { raw: true });

    if (!article) return res.status(400).send("not found");

    if (article.poster) await removeFile("./public/uploads/articles/" + article.poster);

    await Article.destroy({
      where: {
        id: body.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}
