export default parseForm = async (req) =>
  new Promise((resolve, reject) => new formidable.IncomingForm().parse(req, (err, fields, files) => (err ? reject(err) : resolve([fields, files]))));
