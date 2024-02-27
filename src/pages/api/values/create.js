import Value from "@/models/Value";

export default async function create(req, res) {
  const body = req.body;

  try {
    const data = {
      title: body.title,
      content: body.content,
    };

    const result = await Value.create(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}
