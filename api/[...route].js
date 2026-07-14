const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const COLLECTIONS = new Set(['properties', 'posts', 'testimonials', 'investments', 'enquiries']);
const DATA_DIR = path.join(process.cwd(), 'data');
const ADMIN_KEY = process.env.ADMIN_API_KEY;
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function json(res, status, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', status === 200 ? 'public, s-maxage=60, stale-while-revalidate=300' : 'no-store');
  return res.status(status).json(data);
}
function authorized(req) { return Boolean(ADMIN_KEY) && req.headers['x-admin-key'] === ADMIN_KEY; }
function recordKey(collection) { return `outright-joe:${collection}`; }
async function kv(command) {
  if (!KV_URL || !KV_TOKEN) throw new Error('Vercel KV is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN.');
  const response = await fetch(KV_URL, {method:'POST', headers:{Authorization:`Bearer ${KV_TOKEN}`, 'Content-Type':'application/json'}, body:JSON.stringify(command)});
  if (!response.ok) throw new Error('Unable to reach Vercel KV.');
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}
async function fallback(collection) {
  try { return JSON.parse(await fs.readFile(path.join(DATA_DIR, `${collection}.json`), 'utf8')); } catch { return []; }
}
async function getItems(collection) {
  const stored = await kv(['GET', recordKey(collection)]);
  return stored ? JSON.parse(stored) : fallback(collection);
}
async function saveItems(collection, items) { await kv(['SET', recordKey(collection), JSON.stringify(items)]); }
async function body(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (!req.body) return {};
  try { return JSON.parse(req.body); } catch { throw new Error('Request body must be valid JSON.'); }
}
function visible(item) { const {internalNotes, ...safe} = item; return safe; }

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') { res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS'); return res.status(204).end(); }
  try {
    const route = Array.isArray(req.query.route) ? req.query.route : [req.query.route].filter(Boolean);
    const [collection, id] = route;
    if (!COLLECTIONS.has(collection)) return json(res, 404, {error:'Unknown content collection.'});
    const isEnquiry = collection === 'enquiries';
    if (isEnquiry && req.method !== 'POST' && !authorized(req)) return json(res, 401, {error:'Unauthorized.'});
    const items = await getItems(collection);
    if (req.method === 'GET') {
      if (id) { const item = items.find(item => item.id === id); return item ? json(res, 200, visible(item)) : json(res, 404, {error:'Record not found.'}); }
      if (isEnquiry || req.query.all === 'true') { if (!authorized(req)) return json(res, 401, {error:'Unauthorized.'}); return json(res, 200, items.map(visible)); }
      return json(res, 200, items.filter(item => item.published !== false).map(visible));
    }
    const publicEnquiry = isEnquiry && req.method === 'POST';
    if (!publicEnquiry && !authorized(req)) return json(res, 401, {error:'Unauthorized.'});
    if (req.method === 'POST') {
      const input = await body(req);
      if (publicEnquiry && (!input.email || !input.fullName)) return json(res, 422, {error:'Full name and email are required.'});
      const item = {id:crypto.randomUUID(), createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(), published: !isEnquiry, ...input};
      items.unshift(item); await saveItems(collection, items); return json(res, 201, visible(item));
    }
    if (req.method === 'PUT' && id) {
      const index = items.findIndex(item => item.id === id); if (index < 0) return json(res, 404, {error:'Record not found.'});
      items[index] = {...items[index], ...await body(req), id, updatedAt:new Date().toISOString()}; await saveItems(collection, items); return json(res, 200, visible(items[index]));
    }
    if (req.method === 'DELETE' && id) {
      const next = items.filter(item => item.id !== id); if (next.length === items.length) return json(res, 404, {error:'Record not found.'});
      await saveItems(collection, next); return res.status(204).end();
    }
    return json(res, 405, {error:'Method not allowed.'});
  } catch (error) { return json(res, 500, {error:error.message || 'Server error.'}); }
};
