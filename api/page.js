const fs = require('node:fs/promises');
const path = require('node:path');

const ALLOWED_PAGES = new Set(['about.html', 'properties.html', 'investments.html', 'verification.html', 'blog.html', 'testimonials.html', 'contact.html']);
function sharedChrome(page, homepage) {
  const header = homepage.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
  const footer = homepage.match(/<footer>[\s\S]*?<\/footer>/)?.[0];
  if (!header || !footer) return page;
  const result = page.replace(/<header class="site-header">[\s\S]*?<\/header>/, header).replace(/<footer>[\s\S]*?<\/footer>/, footer);
  return result.includes('src="script.js"') ? result : result.replace('</body>', '<script src="script.js"></script></body>');
}

module.exports = async (req, res) => {
  const file = req.query.file;
  if (!ALLOWED_PAGES.has(file)) return res.status(404).send('Page not found');
  try {
    const root = process.cwd();
    const [page, homepage] = await Promise.all([fs.readFile(path.join(root, file), 'utf8'), fs.readFile(path.join(root, 'index.html'), 'utf8')]);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(sharedChrome(page, homepage));
  } catch { return res.status(500).send('Unable to render page'); }
};
