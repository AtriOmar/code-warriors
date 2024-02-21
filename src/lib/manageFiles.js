const uuidv4 = require("uuid").v4;
const fse = require("fs-extra");
const sharp = require("sharp");

export function removeFile(filePath) {
  return fse.remove(filePath);
}

export async function uploadFile(path, file) {
  console.log("-------------------- file from upload file --------------------");
  console.log(file);
  const oldPath = file.filepath;
  const ext = file.originalFilename.slice(file.originalFilename.lastIndexOf("."));
  const newName = uuidv4().replaceAll("-", "").toString() + ext;
  const newPath = path + newName;
  try {
    console.log("-------------------- file.mimetype --------------------");
    console.log(file.mimetype);
    if (file.mimetype.endsWith("gif") || file.mimetype.includes("svg")) {
      await fse.move(oldPath, newPath);
    } else if (file.mimetype.endsWith("png")) {
      await sharp(oldPath)
        .resize({
          width: 300,
        })
        .flatten({ background: "white" })
        .jpeg({ mozjpeg: true, force: true })
        .toFile(newPath);
    } else {
      await sharp(oldPath)
        .resize({
          width: 300,
        })
        .jpeg({ mozjpeg: true, force: true })
        .toFile(newPath);
    }
    console.log(newName);
    return newName;
  } catch (err) {
    throw err;
  }
}
