import { sequelize } from "@/lib/sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { removeFile, uploadFile } from "@/lib/manageFiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

const User = require("@/models/User");
const formidable = require("formidable");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user } = session || {};

  var form = new formidable.IncomingForm({ multiples: true });

  const [fields, files] = await parseForm(req);

  try {
    const cover = files.cover?.[0] || null;
    const picture = files.picture?.[0] || null;

    if (files.hasOwnProperty("picture") || fields.hasOwnProperty("picture")) {
      if (user.picture) {
        console.log("-------------------- deleting user picture --------------------");
        await removeFile("./public/uploads/profile-pictures/" + user.picture);
      }

      var pictureName = picture ? await uploadFile("./public/uploads/profile-pictures/", picture) : null;
    }
    if (files.hasOwnProperty("cover") || fields.hasOwnProperty("cover")) {
      if (user.cover) {
        await removeFile("./public/uploads/profile-covers/" + user.cover);
      }

      var coverName = cover ? await uploadFile("./public/uploads/profile-covers/", cover, 1000) : null;
    }

    const options = {};

    if (files.hasOwnProperty("cover") || fields.hasOwnProperty("cover")) options.cover = coverName;
    if (files.hasOwnProperty("picture") || fields.hasOwnProperty("picture")) options.picture = pictureName;

    console.log("-------------------- options --------------------");
    console.log(options);

    await User.update(options, {
      where: {
        id: user.id,
      },
    });

    // const userData = (await User.findByPk(user.id)).toJSON();

    res.status(200).send("hey");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

const parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
