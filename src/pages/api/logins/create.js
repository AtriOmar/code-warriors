import Login from "@/models/Login";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
const { Op } = require("sequelize");

export default async function create(req, res) {
  const { fingerprint } = req.body;

  if (!fingerprint) {
    return res.status(400).send("invalid data");
  }

  const data = {
    fingerprint,
  };

  // const todayStart = new Date();
  // todayStart.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  // const todayEnd = new Date();
  // todayEnd.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setSeconds(0, 0); // Set seconds and milliseconds to 0

  const end = new Date();
  end.setSeconds(59, 999);

  try {
    const login = await Login.findOne({
      where: {
        fingerprint,
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    });

    let result;

    if (!login) {
      result = await Login.create({
        fingerprint,
      });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
