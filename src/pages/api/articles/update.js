const Article = require("@/models/Article");

export default async function handler(req, res) {
  const { id, title, content, categoryId } = req.body;

  const data = {
    title,
    content,
    categoryId,
  };

  console.log("-------------------- data --------------------");
  console.log(data);

  try {
    await Article.update(data, {
      where: {
        id,
      },
    });

    const result = await Article.findByPk(id);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
