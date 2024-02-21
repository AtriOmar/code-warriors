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

  await new Promise((resolve) => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
        res.end(String(err));
        return;
      }
      try {
        const picture = Object.values(files)[0]?.[0];

        console.log("-------------------- picture --------------------");
        console.log(picture);

        if (user.picture) {
          await removeFile("./public/uploads/profile-pictures/" + user.picture);
        }

        var pictureName = picture ? await uploadFile("./public/uploads/profile-pictures/", picture) : null;

        // console.log("-------------------- pictureName --------------------");
        // console.log(pictureName);

        await User.update(
          { picture: pictureName },
          {
            where: {
              id: user.id,
            },
          }
        );

        // const userData = (await User.findByPk(user.id)).toJSON();

        resolve(res.status(200).send("hey"));
      } catch (err) {
        res.status(400).send(err);
        console.log(err);
      }
    });
  });
}

const parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
