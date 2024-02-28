import { sequelize } from "@/lib/sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { removeFile, uploadFile } from "@/lib/manageFiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Field = require("@/models/Field");
const formidable = require("formidable");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user: authUser } = session || {};

  var form = new formidable.IncomingForm({ multiples: true });

  try {
    const [fields, files] = await parseForm(req);

    const fieldId = fields.id[0];

    const field = await Field.findByPk(fieldId);

    if (!field) return res.status(400).send("field not found");

    const icon = Object.values(files)[0]?.[0];

    console.log("-------------------- picture --------------------");
    console.log(icon);

    if (field.icon) {
      await removeFile("./public/uploads/fields/" + field.icon);
    }

    var iconName = icon ? await uploadFile("./public/uploads/fields/", icon, 600) : null;

    // console.log("-------------------- pictureName --------------------");
    // console.log(pictureName);

    await Field.update(
      { icon: iconName },
      {
        where: {
          id: fieldId,
        },
      }
    );

    const fieldData = await Field.findByPk(fieldId);

    res.status(200).send(fieldData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

const parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
