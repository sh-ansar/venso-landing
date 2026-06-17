module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const body = req.body || {};
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  if (!name || !phone) return res.status(400).json({ error: 'name_and_phone_required' });
  // Для Vercel без базы заявка подтверждается, но постоянное хранение нужно подключить через Postgres/Supabase.
  return res.status(201).json({ ok: true, note: 'lead_received_static_vercel' });
};
