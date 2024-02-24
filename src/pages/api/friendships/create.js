import Friendship from "@/models/Friendship";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
const { Op } = require("sequelize");

export default async function create(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user } = session || {};

  const body = req.body;

  const data = {
    userId1: user?.id,
    userId2: body.receiverId,
  };

  try {
    const [result, created] = await Friendship.findOrCreate({
      where: {
        [Op.or]: [
          {
            userId1: user?.id,
            userId2: body.receiverId,
          },
          {
            userId1: body.receiverId,
            userId2: user?.id,
          },
        ],
      },
      defaults: data,
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
