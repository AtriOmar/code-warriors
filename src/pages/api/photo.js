import fs from "fs-extra";
import path from "path";

const imagesDirectory = path.join(process.cwd(), "public");

export default async function handler(req, res) {
  const {
    query: { path: imagePath },
  } = req;

  const filePath = path.join(imagesDirectory, imagePath);

  try {
    // Check if the file exists
    await fs.access(filePath, fs.constants.R_OK);
    // Read the file and serve it
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(404).json({ error: "Image not found" });
  }
}
