import Category from "@/models/Category";

export default async function handler(req, res) {
  const body = req.query;

  try {
    await Category.destroy({ where: { id: body.id } });

    res.status(200).send("success");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
}
