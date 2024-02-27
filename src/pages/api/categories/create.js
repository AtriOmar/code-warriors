import Category from "@/models/Category";

export default async function create(req, res) {
  const body = req.body;

  try {
    const data = {
      name: body.name,
    };

    const result = await Category.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
