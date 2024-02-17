import { NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = require("@/models/User");

export default async function handler(req, res) {
  const body = req.body;

  const data = {
    username: body.username,
    bio: body.bio,
    address: body.address,
  };

  try {
    const result = await User.update(data, {
      where: {
        id: body.id,
      },
    });

    console.log(result);

    res.status(200).end();
  } catch (err) {
    res.status(400).send(err);
  }
}
