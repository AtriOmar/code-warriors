const formidable = require("formidable");

export default async function parseForm(req) {
  return new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
}
