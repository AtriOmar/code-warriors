import { sequelize } from "@/lib/sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { removeFile, uploadFile } from "@/lib/manageFiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Team = require("@/models/Team");
const formidable = require("formidable");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user: authUser } = session || {};

  var form = new formidable.IncomingForm({ multiples: true });

  try {
    const [fields, files] = await parseForm(req);

    const memberId = fields.id[0];

    const member = await Team.findByPk(memberId);

    if (!member) return res.status(400).send("member not found");

    const picture = Object.values(files)[0]?.[0];

    console.log("-------------------- picture --------------------");
    console.log(picture);

    if (member.picture) {
      await removeFile("./public/uploads/team/" + member.picture);
    }

    var pictureName = picture ? await uploadFile("./public/uploads/team/", picture) : null;

    // console.log("-------------------- pictureName --------------------");
    // console.log(pictureName);

    await Team.update(
      { picture: pictureName },
      {
        where: {
          id: memberId,
        },
      }
    );

    const memberData = await Team.findByPk(memberId);

    res.status(200).send(memberData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

const parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
