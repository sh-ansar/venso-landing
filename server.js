const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 3010);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'venso-admin';
const SESSION_TTL_HOURS = Number(process.env.SESSION_TTL_HOURS || 12);
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const STORE_PATH = path.join(ROOT, 'data', 'store.json');
const sessions = new Map();

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function readStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch (error) {
    return { tariffs: [], leads: [] };
  }
}

function writeStore(store) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function send(res, status, body, headers = {}) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': typeof body === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(payload);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function createToken() {
  return crypto.randomBytes(32).toString('hex');
}

function authorize(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

function sanitizeTariff(input) {
  return {
    id: String(input.id || crypto.randomUUID()).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-') || crypto.randomUUID(),
    name: String(input.name || '').trim().slice(0, 60),
    badge: String(input.badge || '').trim().slice(0, 80),
    price: String(input.price || '').trim().slice(0, 40),
    period: String(input.period || '').trim().slice(0, 30),
    description: String(input.description || '').trim().slice(0, 220),
    features: Array.isArray(input.features) ? input.features.map(item => String(item || '').trim().slice(0, 140)).filter(Boolean).slice(0, 12) : [],
    highlighted: Boolean(input.highlighted)
  };
}

async function handleApi(req, res, url) {
  try {
    if (req.method === 'GET' && url.pathname === '/api/site') {
      const store = readStore();
      return send(res, 200, { tariffs: store.tariffs || [] });
    }

    if (req.method === 'GET' && url.pathname === '/api/tariffs') {
      const store = readStore();
      return send(res, 200, { tariffs: store.tariffs || [] });
    }

    if (req.method === 'POST' && url.pathname === '/api/leads') {
      const body = await parseBody(req);
      const lead = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: String(body.name || '').trim().slice(0, 120),
        phone: String(body.phone || '').trim().slice(0, 80),
        email: String(body.email || '').trim().slice(0, 140),
        company: String(body.company || '').trim().slice(0, 160),
        plan: String(body.plan || '').trim().slice(0, 80),
        lang: String(body.lang || '').trim().slice(0, 8),
        message: String(body.message || '').trim().slice(0, 1000),
        page: String(body.page || '').trim().slice(0, 250),
        utm: body.utm && typeof body.utm === 'object' ? body.utm : {},
        userAgent: String(req.headers['user-agent'] || '').slice(0, 250)
      };
      if (!lead.name || !lead.phone) return send(res, 400, { error: 'name_and_phone_required' });
      const store = readStore();
      store.leads = store.leads || [];
      store.leads.unshift(lead);
      store.leads = store.leads.slice(0, 1000);
      writeStore(store);
      return send(res, 201, { ok: true, leadId: lead.id });
    }

    if (req.method === 'POST' && url.pathname === '/api/admin/login') {
      const body = await parseBody(req);
      if (String(body.password || '') !== ADMIN_PASSWORD) return send(res, 401, { error: 'invalid_password' });
      const token = createToken();
      sessions.set(token, { expiresAt: Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000 });
      return send(res, 200, { token, expiresInHours: SESSION_TTL_HOURS });
    }

    if (url.pathname.startsWith('/api/admin/')) {
      if (!authorize(req)) return send(res, 401, { error: 'unauthorized' });

      if (req.method === 'GET' && url.pathname === '/api/admin/tariffs') {
        const store = readStore();
        return send(res, 200, { tariffs: store.tariffs || [] });
      }

      if (req.method === 'PUT' && url.pathname === '/api/admin/tariffs') {
        const body = await parseBody(req);
        const tariffs = Array.isArray(body.tariffs) ? body.tariffs.map(sanitizeTariff).filter(item => item.name && item.price) : [];
        if (!tariffs.length) return send(res, 400, { error: 'tariffs_required' });
        const store = readStore();
        store.tariffs = tariffs;
        writeStore(store);
        return send(res, 200, { ok: true, tariffs });
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/leads') {
        const store = readStore();
        return send(res, 200, { leads: store.leads || [] });
      }
    }

    return send(res, 404, { error: 'not_found' });
  } catch (error) {
    return send(res, 500, { error: error.message || 'server_error' });
  }
}

function serveStatic(req, res, url) {
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  if (filePath === '/admin') filePath = '/admin.html';
  const safePath = path.normalize(decodeURIComponent(filePath)).replace(/^([/\\]*\.\.[/\\]*)+/, '');
  const absolutePath = path.join(PUBLIC_DIR, safePath);
  if (!absolutePath.startsWith(PUBLIC_DIR)) return send(res, 403, 'Forbidden');

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      if (!path.extname(absolutePath)) {
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackErr, fallbackData) => {
          if (fallbackErr) return send(res, 404, 'Not found');
          res.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'public, max-age=60' });
          res.end(fallbackData);
        });
        return;
      }
      return send(res, 404, 'Not found');
    }
    const ext = path.extname(absolutePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=86400' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url);
  return serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log(`VENSO landing is running: http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`Default admin password: ${ADMIN_PASSWORD === 'venso-admin' ? 'venso-admin (change via ADMIN_PASSWORD)' : '[from env]'}`);
});
