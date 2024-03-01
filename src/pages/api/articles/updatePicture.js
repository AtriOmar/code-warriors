import { sequelize } from "@/lib/sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { removeFile, uploadFile } from "@/lib/manageFiles";
import parseForm from "@/lib/parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

const Article = require("@/models/Article");

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user: authUser } = session || {};

  try {
    const [fields, files] = await parseForm(req);

    const articleId = fields.id[0];

    const article = await Article.findByPk(articleId);

    if (!article) return res.status(400).send("article not found");

    const poster = Object.values(files)[0]?.[0];

    console.log("-------------------- picture --------------------");
    console.log(poster);

    if (article.picture) {
      await removeFile("./public/uploads/articles/" + article.picture);
    }

    var posterName = poster ? await uploadFile("./public/uploads/articles/", poster, 600) : null;

    // console.log("-------------------- pictureName --------------------");
    // console.log(pictureName);

    await Article.update(
      { poster: posterName },
      {
        where: {
          id: articleId,
        },
      }
    );

    const articleData = await Article.findByPk(articleId);

    res.status(200).send(articleData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
