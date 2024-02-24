import User from "@/models/User";
import { Op } from "sequelize";

export default async function handler(req, res) {
  const allowedAttributes = new Set(["id", "username", "email", "picture", "createdAt", "updatedAt"]);

  const { search, limit } = req.query;

  const options = {
    where: {},
    limit: Number(limit) >= 1 ? Number(limit) : undefined,
    attributes: {
      exclude: ["password"],
    },
  };

  if (Array.isArray(req.query["attr[]"])) {
    const arr = req.query["attr[]"].filter((attr) => allowedAttributes.has(attr));

    options.attributes = arr.length ? arr : options.attributes;
  }

  if (search) {
    options.where.username = {
      [Op.like]: `%${search}%`,
    };
  }

  console.log("-------------------- req.query --------------------");
  console.log(req.query);

  try {
    const result = await User.findAll(options);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
