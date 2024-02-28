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

    const picture = Object.values(files)[0]?.[0];

    var pictureName = picture ? await uploadFile("./public/uploads/team/", picture, 600) : null;

    console.log("-------------------- posterName --------------------");
    console.log(pictureName);

    const data = {
      name: fields.name[0],
      role: fields.role[0],
      picture: pictureName,
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
