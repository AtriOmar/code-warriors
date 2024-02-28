import Field from "@/models/Field";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { uploadFile } from "@/lib/manageFiles";

const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function create(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user } = session || {};

  console.log("-------------------- hello --------------------");

  try {
    const [fields, files] = await parseForm(req);

    const icon = files.icon?.[0];

    var iconName = icon ? await uploadFile("./public/uploads/fields/", icon) : null;

    console.log("-------------------- posterName --------------------");
    console.log(iconName);

    const data = {
      title: fields.title[0],
      content: fields.content[0],
      icon: iconName,
    };

    const result = await Field.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

const parseForm = async (req) =>
  new Promise((resolve, reject) =>
    new formidable.IncomingForm({ maxFileSize: 1024 * 1024 * 1024 }).parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files])))
  );
