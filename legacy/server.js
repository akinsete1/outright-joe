const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const CONTENT_TYPES = new Set(['properties', 'posts', 'testimonials', 'investments', 'enquiries']);
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon'};
const ADMIN_KEY = process.env.ADMIN_API_KEY;
const PAGE_MOBILE_NAV = '@media(max-width:780px){.site-header{height:auto;min-height:70px;flex-wrap:wrap;gap:12px;padding-top:14px}.site-header nav{display:flex;order:3;width:100%;padding:6px 0 14px;gap:14px;overflow-x:auto}.site-header nav a{font-size:10px;white-space:nowrap}.site-header .button{margin-left:auto;padding:11px 12px;font-size:9px}}';
function applySharedChrome(page, homepage) {
  if (page === homepage) return page;
  const header = homepage.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0];
  const footer = homepage.match(/<footer>[\s\S]*?<\/footer>/)?.[0];
  if (!header || !footer) return page;
  const withChrome = page.replace(/<header class="site-header">[\s\S]*?<\/header>/, header).replace(/<footer>[\s\S]*?<\/footer>/, footer);
  return withChrome.includes('src="script.js"') ? withChrome : withChrome.replace('</body>', '<script src="script.js"></script></body>');
}

const send = (res, status, body, headers = {}) => res.writeHead(status, {'Content-Type':'application/json; charset=utf-8', ...headers}).end(JSON.stringify(body));
const error = (res, status, message) => send(res, status, {error: message});
const safe = name => name.replace(/[^a-z-]/g, '');
async function readCollection(name) { try { return JSON.parse(await fs.readFile(path.join(DATA_DIR, `${safe(name)}.json`), 'utf8')); } catch { return []; } }
async function writeCollection(name, data) { await fs.mkdir(DATA_DIR, {recursive:true}); await fs.writeFile(path.join(DATA_DIR, `${safe(name)}.json`), JSON.stringify(data, null, 2)); }
async function readBody(req) { let raw=''; for await (const chunk of req) { raw += chunk; if (raw.length > 1_000_000) throw new Error('Request body is too large'); } try { return JSON.parse(raw || '{}'); } catch { throw new Error('Request body must be valid JSON'); } }
function canWrite(req) { return !ADMIN_KEY || req.headers['x-admin-key'] === ADMIN_KEY; }
function publicRecord(record) { const {internalNotes, ...publicData} = record; return publicData; }

async function api(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean); // /api/properties/:id
  const collection = parts[1]; const id = parts[2];
  if (!CONTENT_TYPES.has(collection)) return error(res, 404, 'Unknown content collection');
  let items = await readCollection(collection);
  if (req.method === 'GET') {
    if (id) { const item = items.find(x => x.id === id); return item ? send(res, 200, publicRecord(item)) : error(res, 404, 'Record not found'); }
    const published = url.searchParams.get('all') === 'true' && canWrite(req) ? items : items.filter(x => x.published !== false);
    return send(res, 200, published.map(publicRecord));
  }
  // Enquiries are the only public write endpoint. Editorial content requires an admin key.
  if (!(collection === 'enquiries' && req.method === 'POST') && !canWrite(req)) return error(res, 401, 'Unauthorized');
  if (req.method === 'POST') { const data = await readBody(req); const record = {id:crypto.randomUUID(), createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), published:true, ...data}; items.unshift(record); await writeCollection(collection, items); return send(res, 201, record); }
  if (req.method === 'PUT' && id) { const data = await readBody(req); const index = items.findIndex(x => x.id === id); if (index < 0) return error(res, 404, 'Record not found'); items[index] = {...items[index], ...data, id, updatedAt:new Date().toISOString()}; await writeCollection(collection, items); return send(res, 200, items[index]); }
  if (req.method === 'DELETE' && id) { const count = items.length; items = items.filter(x => x.id !== id); if (items.length === count) return error(res, 404, 'Record not found'); await writeCollection(collection, items); return send(res, 204, {}); }
  return error(res, 405, 'Method not allowed');
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    const requested = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const file = path.resolve(ROOT, requested);
    if (!file.startsWith(ROOT + path.sep)) return error(res, 403, 'Forbidden');
    let content = await fs.readFile(file); const type = MIME[path.extname(file)] || 'application/octet-stream';
    // The secondary pages share a compact mobile navigation override.
    if (requested === 'pages.css') content = Buffer.concat([content, Buffer.from(PAGE_MOBILE_NAV)]);
    if (path.extname(file) === '.html' && requested !== 'index.html') {
      const homepage = await fs.readFile(path.join(ROOT, 'index.html'), 'utf8');
      content = Buffer.from(applySharedChrome(content.toString('utf8'), homepage));
    }
    res.writeHead(200, {'Content-Type':type, 'X-Content-Type-Options':'nosniff'}).end(content);
  } catch (err) { if (err.code === 'ENOENT') return error(res, 404, 'Not found'); error(res, 400, err.message || 'Bad request'); }
}).listen(process.env.PORT || 3000, () => console.log(`Outright Joe website running at http://localhost:${process.env.PORT || 3000}`));
