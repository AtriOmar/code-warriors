import Question from "@/models/Question";
import Category from "@/models/Category";
import User from "@/models/User";
const { Op } = require("sequelize");
const sequelize = require("@/lib/sequelize").sequelize;

export default async function handler(req, res) {
  const { page, limit = 20, search, categoryId, sort, includeUser = false } = req.query;

  console.log("-------------------- req.query from getAll questions --------------------");
  console.log(req.query);

  const options = {
    where: {},
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
  };

  if (Number(limit) > 0) {
    options.limit = Number(limit);
  } else {
    options.limit = 20;
  }

  if (Number(page) > 0) {
    options.offset = (Number(page) - 1) * options.limit;
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

  if (includeUser) {
    options.include.push({
      model: User,
      attributes: ["id", "username", "picture"],
    });
  }

  try {
    const result = await Question.findAll({
      ...options,
      attributes: [
        "id",
        "title",
        "createdAt",
        [sequelize.literal("(SELECT COUNT(*) FROM `answers` WHERE `answers`.`questionId` = `Question`.`id`)"), "answerCount"],
      ],
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
