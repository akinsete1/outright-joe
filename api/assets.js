const fs = require('node:fs/promises');
const path = require('node:path');

const ASSETS = {
  'styles.css': 'text/css; charset=utf-8',
  'pages.css': 'text/css; charset=utf-8',
  'script.js': 'text/javascript; charset=utf-8'
};

module.exports = async (req, res) => {
  const file = req.query.file;
  if (!Object.hasOwn(ASSETS, file)) return res.status(404).end('Asset not found');
  try {
    const content = await fs.readFile(path.join(process.cwd(), file));
    res.setHeader('Content-Type', ASSETS[file]);
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(content);
  } catch { return res.status(404).end('Asset not found'); }
};
