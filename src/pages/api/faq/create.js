import FAQ from "@/models/FAQ";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function create(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { user } = session || {};
  const body = req.body;

  try {
    const data = {
      title: body.title,
      content: body.content,
      userId: user?.id,
    };

    const result = await FAQ.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
