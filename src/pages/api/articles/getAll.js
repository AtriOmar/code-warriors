import Article from "@/models/Article";
import Category from "@/models/Category";
const { Op } = require("sequelize");

export default async function handler(req, res) {
  const { page, limit = 20, search, categoryId, sort } = req.query;

  const options = {
    where: {},
  };

  if (!isNaN(limit)) {
    options.limit = Number(limit);
  } else {
    options.limit = 20;
  }

  if (search) {
    options.where = {
      title: {
        [Op.like]: `%${search}%`,
      },
    };
  }

  console.log("-------------------- categoryId --------------------");
  console.log(categoryId);

  if (Number(categoryId) > 0) {
    options.where.categoryId = categoryId;
  }

  if (sort === "newest") {
    options.order = [["createdAt", "DESC"]];
  } else if (sort === "oldest") {
    options.order = [["createdAt", "ASC"]];
  } else if (sort === "title-asc") {
    options.order = [["title", "ASC"]];
  } else if (sort === "title-desc") {
    options.order = [["title", "DESC"]];
  }

  try {
    const result = await Article.findAll({
      ...options,
      include: {
        model: Category,
        attributes: ["id", "name"],
      },
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
