import { sequelize } from "@/lib/sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { removeFile, uploadFile } from "@/lib/manageFiles";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Feedback = require("@/models/Feedback");
const formidable = require("formidable");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user: authUser } = session || {};

  var form = new formidable.IncomingForm({ multiples: true });

  try {
    const [fields, files] = await parseForm(req);

    const feedbackId = fields.id[0];

    const feedback = await Feedback.findByPk(feedbackId);

    if (!feedback) return res.status(400).send("member not found");

    const picture = Object.values(files)[0]?.[0];

    console.log("-------------------- picture --------------------");
    console.log(picture);

    if (feedback.picture) {
      await removeFile("./public/uploads/feedbacks/" + feedback.picture);
    }

    var pictureName = picture ? await uploadFile("./public/uploads/feedbacks/", picture, 600) : null;

    // console.log("-------------------- pictureName --------------------");
    // console.log(pictureName);

    await Feedback.update(
      { picture: pictureName },
      {
        where: {
          id: feedbackId,
        },
      }
    );

    const feedbackData = await Feedback.findByPk(feedbackId);

    res.status(200).send(feedbackData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}

const parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
