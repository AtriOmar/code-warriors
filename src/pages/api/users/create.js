import { NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = require("@/models/User");

const saltRounds = 10;

export default async function handler(req, res) {
  const body = req.body;
  console.log(body);

  const hash = await bcrypt.hash(body.password, saltRounds);
  const userData = {
    username: body.username,
    email: body.email,
    password: hash,
    accessId: 1,
    active: 2,
    picture: "avatar-" + Math.floor(Math.random() * 23 + 1) + ".png",
  };

  console.log(userData);
  const [result, created] = await User.findOrCreate({
    where: {
      email: body.email,
    },
    defaults: userData,
  });
  const user = await result.toJSON();

  if (!created) {
    res.status(400).send("email already used");
    return;
  }

  delete user.password;

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  user.token = token;

  res.send(user);
}
