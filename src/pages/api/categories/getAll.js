import Category from "@/models/Category";

export default async function handler(req, res) {
  try {
    const result = await Category.findAll();

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
