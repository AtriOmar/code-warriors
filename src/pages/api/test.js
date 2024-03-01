const Article = require("@/models/Article");

export default async function handler(req, res) {
  const articles = await Article.findAll({ raw: true });

  articles.forEach(async (article) => {
    const { id, ...data } = article;

    await Article.create(data);
  });

  res.send("done");
}
