const adminState = {
  token: localStorage.getItem('venso_admin_token') || '',
  tariffs: []
};

const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
  return String(str || '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[ch]));
}

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminState.token}` };
}

async function api(path, options = {}) {
  const res = await fetch(path, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'request_failed');
  return json;
}

function showDashboard(show) {
  $('loginView').hidden = show;
  $('dashboardView').hidden = !show;
}

async function login(password) {
  const json = await api('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  adminState.token = json.token;
  localStorage.setItem('venso_admin_token', adminState.token);
  showDashboard(true);
  await loadAdminData();
}

async function loadAdminData() {
  try {
    const tariffs = await api('/api/admin/tariffs', { headers: authHeaders() });
    adminState.tariffs = tariffs.tariffs || [];
    renderTariffsEditor();
    await loadLeads();
  } catch (error) {
    localStorage.removeItem('venso_admin_token');
    adminState.token = '';
    showDashboard(false);
  }
}

async function loadLeads() {
  const root = $('leadsList');
  root.innerHTML = '<div class="lead-item"><span>Загружаем заявки...</span></div>';
  try {
    const json = await api('/api/admin/leads', { headers: authHeaders() });
    const leads = json.leads || [];
    if (!leads.length) {
      root.innerHTML = '<div class="lead-item"><span>Заявок пока нет.</span></div>';
      return;
    }
    root.innerHTML = leads.map(lead => `
      <article class="lead-item">
        <strong>${escapeHtml(lead.name)} · ${escapeHtml(lead.phone)}</strong>
        <span>${escapeHtml(lead.company || 'Компания не указана')}</span>
        <span>Тариф: ${escapeHtml(lead.plan || 'не выбран')}</span>
        <span>${escapeHtml(lead.message || '')}</span>
        <small>${new Date(lead.createdAt).toLocaleString('ru-RU')} · ${escapeHtml(lead.lang || '')}</small>
      </article>
    `).join('');
  } catch (error) {
    root.innerHTML = '<div class="lead-item"><span>Не удалось загрузить заявки.</span></div>';
  }
}

function renderTariffsEditor() {
  const root = $('tariffsEditor');
  root.innerHTML = '';
  adminState.tariffs.forEach((tariff, index) => {
    const div = document.createElement('section');
    div.className = 'tariff-editor';
    div.dataset.index = String(index);
    div.innerHTML = `
      <h3>${escapeHtml(tariff.name || 'Новый тариф')}</h3>
      <label>ID<input name="id" value="${escapeHtml(tariff.id || '')}" /></label>
      <label>Название<input name="name" value="${escapeHtml(tariff.name || '')}" /></label>
      <label>Бейдж<input name="badge" value="${escapeHtml(tariff.badge || '')}" /></label>
      <label>Цена<input name="price" value="${escapeHtml(tariff.price || '')}" /></label>
      <label>Период<input name="period" value="${escapeHtml(tariff.period || '')}" /></label>
      <label class="features-field">Описание<textarea name="description">${escapeHtml(tariff.description || '')}</textarea></label>
      <label class="features-field">Функции тарифа — каждая с новой строки<textarea name="features">${escapeHtml((tariff.features || []).join('\n'))}</textarea></label>
      <div class="tariff-actions">
        <label class="toggle-row"><input type="checkbox" name="highlighted" ${tariff.highlighted ? 'checked' : ''} /> Выделить тариф</label>
        <button class="remove-btn" type="button" data-remove="${index}">Удалить тариф</button>
      </div>
    `;
    root.appendChild(div);
  });
  root.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    adminState.tariffs.splice(Number(btn.dataset.remove), 1);
    renderTariffsEditor();
  }));
}

function collectTariffs() {
  return Array.from(document.querySelectorAll('.tariff-editor')).map((section, index) => {
    const get = (name) => section.querySelector(`[name="${name}"]`);
    return {
      id: get('id').value.trim() || `tariff-${index + 1}`,
      name: get('name').value.trim(),
      badge: get('badge').value.trim(),
      price: get('price').value.trim(),
      period: get('period').value.trim(),
      description: get('description').value.trim(),
      features: get('features').value.split('\n').map(x => x.trim()).filter(Boolean),
      highlighted: get('highlighted').checked
    };
  });
}

async function saveTariffs() {
  const alert = $('saveAlert');
  alert.className = 'admin-alert';
  alert.textContent = 'Сохраняем тарифы...';
  try {
    const tariffs = collectTariffs();
    if (!tariffs.length) throw new Error('Нужен хотя бы один тариф');
    const json = await api('/api/admin/tariffs', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ tariffs })
    });
    adminState.tariffs = json.tariffs || tariffs;
    renderTariffsEditor();
    alert.textContent = 'Тарифы сохранены. Лендинг уже показывает новые данные.';
  } catch (error) {
    alert.className = 'admin-alert error';
    alert.textContent = `Ошибка сохранения: ${error.message}`;
  }
}

function bindEvents() {
  $('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const alert = $('loginAlert');
    alert.className = 'admin-alert';
    alert.textContent = 'Проверяем пароль...';
    try {
      await login(new FormData(e.target).get('password'));
      alert.textContent = '';
    } catch (error) {
      alert.className = 'admin-alert error';
      alert.textContent = 'Неверный пароль.';
    }
  });

  $('logoutBtn').addEventListener('click', () => {
    adminState.token = '';
    localStorage.removeItem('venso_admin_token');
    showDashboard(false);
  });

  $('addTariffBtn').addEventListener('click', () => {
    adminState.tariffs.push({ id: `custom-${Date.now()}`, name: 'New', badge: 'Новый', price: '0 ₸', period: '/ мес', description: 'Описание тарифа', features: ['Функция 1'], highlighted: false });
    renderTariffsEditor();
  });

  $('tariffsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveTariffs();
  });

  $('refreshLeadsBtn').addEventListener('click', loadLeads);
}

bindEvents();
if (adminState.token) {
  showDashboard(true);
  loadAdminData();
} else {
  showDashboard(false);
}
