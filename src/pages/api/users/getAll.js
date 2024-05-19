import User from "@/models/User";
import { Op } from "sequelize";

export default async function handler(req, res) {
  const allowedAttributes = new Set(["id", "username", "email", "picture", "createdAt", "updatedAt"]);

  const { search, limit, sort, accessId } = req.query;

  const options = {
    where: {},
    attributes: {
      exclude: ["password"],
    },
  };

  if (Number(limit) > 0) {
    options.limit = Number(limit);
  } else {
    options.limit = 20;
  }

  if (sort === "newest") {
    options.order = [["createdAt", "DESC"]];
  } else if (sort === "oldest") {
    options.order = [["createdAt", "ASC"]];
  } else if (sort === "name-asc") {
    options.order = [["username", "ASC"]];
  } else if (sort === "name-desc") {
    options.order = [["username", "DESC"]];
  }

  if (Number(accessId) > 0) {
    options.where.accessId = accessId;
  }

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
