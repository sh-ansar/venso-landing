const state = {
  lang: localStorage.getItem('venso_lang') || 'ru',
  tariffs: [],
  scenario: 'flowers'
};

const t = {
  ru: {
    nav: { features: 'Возможности', how: 'Как это работает', demo: 'Демо', integrations: 'Интеграции', pricing: 'Тарифы', investors: 'Инвесторам', login: 'Войти', cta: 'Начать бесплатно' },
    hero: {
      eyebrow: 'AI SaaS для продаж, склада и сервиса',
      title: 'AI-продавец, который продаёт, учитывает и закрывает заявки',
      subtitle: 'VENSO объединяет диалогового ассистента, электронный склад, аналитику продаж и интеграции с бухгалтерией, CRM и банками.',
      demo: 'Запросить демо', try: 'Посмотреть в действии', signalStock: 'Склад', signalBank: 'Банк',
      card1Label: 'Клиент', card1Title: 'Нужен букет сегодня', card1Text: 'VENSO уже подбирает варианты',
      card2Label: 'Заказ', card2Title: 'Оплата готова', card2Text: 'Склад, CRM и банк синхронизированы'
    },
    what: {
      kicker: 'Что это такое', title: 'VENSO — не просто чат-бот. Это операционный контур продаж.',
      text: 'Ассистент отвечает клиентам, знает ассортимент, видит остатки, создаёт заявки и передаёт данные в нужные системы.'
    },
    hands: {
      kicker: 'Человек + AI', title: 'Вы управляете стратегией. VENSO забирает рутину.',
      text: 'Менеджер видит важные сделки, владелец — цифры, клиент — быстрый и понятный сервис. AI работает между ними как точный операционный слой.'
    },
    platform: { kicker: 'Платформа', title: 'В одном интерфейсе: продажи, склад, интеграции и аналитика' },
    how: { kicker: 'Как это работает', title: 'От первого сообщения до закрытой заявки' },
    demo: { kicker: 'Живой сценарий', title: 'Анимированный AI-диалог с выбором ниши', placeholder: 'Напишите сообщение...', panelTitle: 'Что делает VENSO параллельно' },
    verticals: { kicker: 'Для каких бизнесов', title: 'Запускается под конкретную нишу, а не “для всех”' },
    integrations: {
      kicker: 'Интеграции', title: 'VENSO подключается к каналам продаж и системам учета',
      text: 'Ассистент не висит отдельно: он передаёт заявки в CRM, резервирует товары на складе, готовит документы и помогает закрывать оплату через банковские сценарии.'
    },
    pricing: { kicker: 'Тарифы', title: 'Прозрачная модель для запуска и масштабирования', text: 'Данные тарифов редактируются в админке без изменения кода.' },
    investor: {
      kicker: 'Для инвесторов', title: 'VENSO строится как масштабируемый AI SaaS, а не разовая автоматизация',
      text: 'Продуктовая модель сочетает подписку, отраслевые шаблоны, интеграционный слой и накопление знаний о продажах в разных вертикалях.',
      caption: 'Классический сервис + новая интеллектуальная инфраструктура'
    },
    proof: { kicker: 'Социальное доверие', title: 'Понятный продукт для бизнеса, убедительный — для партнёров' },
    lead: { kicker: 'Запуск', title: 'Покажем, как VENSO может продавать в вашем бизнесе', text: 'Оставьте заявку — подготовим демонстрационный сценарий под вашу нишу, ассортимент и каналы коммуникаций.' },
    form: { name: 'Имя', phone: 'Телефон', company: 'Компания', plan: 'Интересующий тариф', message: 'Что хотите автоматизировать?', submit: 'Получить бесплатный запуск', note: 'Нажимая кнопку, вы отправляете заявку команде VENSO.', success: 'Заявка отправлена. Мы свяжемся с вами и подготовим демо-сценарий.', error: 'Не удалось отправить заявку. Проверьте имя и телефон.' },
    footer: { text: 'AI-продавец нового поколения для продаж, учета и клиентского сервиса.', product: 'Продукт', company: 'Компания', admin: 'Админка', contact: 'Контакты', support: 'Связь', city: 'Астана, Казахстан', rights: 'Все права защищены.' }
  },
  kk: {
    nav: { features: 'Мүмкіндіктер', how: 'Қалай жұмыс істейді', demo: 'Демо', integrations: 'Интеграциялар', pricing: 'Тарифтер', investors: 'Инвесторларға', login: 'Кіру', cta: 'Тегін бастау' },
    hero: {
      eyebrow: 'Сату, қойма және сервиске арналған AI SaaS',
      title: 'Сататын, есепке алатын және өтінімді жабатын AI-сатушы',
      subtitle: 'VENSO диалогтық ассистентті, электрондық қойманы, сатылым аналитикасын және бухгалтерия, CRM, банк интеграцияларын біріктіреді.',
      demo: 'Демо сұрау', try: 'Іс жүзінде көру', signalStock: 'Қойма', signalBank: 'Банк',
      card1Label: 'Клиент', card1Title: 'Бүгін гүл шоғы керек', card1Text: 'VENSO нұсқаларды таңдап жатыр',
      card2Label: 'Тапсырыс', card2Title: 'Төлем дайын', card2Text: 'Қойма, CRM және банк синхрондалды'
    },
    what: { kicker: 'Бұл не', title: 'VENSO — жай чат-бот емес. Бұл сату операцияларының контуры.', text: 'Ассистент клиенттерге жауап береді, ассортиментті біледі, қалдықтарды көреді, өтінім жасайды және деректерді қажетті жүйелерге жібереді.' },
    hands: { kicker: 'Адам + AI', title: 'Сіз стратегияны басқарасыз. VENSO күнделікті жұмысты алады.', text: 'Менеджер маңызды мәмілелерді, иесі көрсеткіштерді, клиент жылдам әрі түсінікті сервисті көреді. AI олардың арасында нақты операциялық қабат ретінде жұмыс істейді.' },
    platform: { kicker: 'Платформа', title: 'Бір интерфейсте: сату, қойма, интеграциялар және аналитика' },
    how: { kicker: 'Қалай жұмыс істейді', title: 'Бірінші хабарламадан жабылған өтінімге дейін' },
    demo: { kicker: 'Тірі сценарий', title: 'Саланы таңдайтын анимациялық AI-диалог', placeholder: 'Хабарлама жазыңыз...', panelTitle: 'VENSO қатар не істейді' },
    verticals: { kicker: 'Қандай бизнеске', title: '“Барлығына” емес, нақты салаға бейімделеді' },
    integrations: { kicker: 'Интеграциялар', title: 'VENSO сату арналары мен есеп жүйелеріне қосылады', text: 'Ассистент бөлек тұрмайды: CRM-ге өтінім жібереді, қоймада тауарды резервтейді, құжат дайындайды және банк сценарийлері арқылы төлемді жабуға көмектеседі.' },
    pricing: { kicker: 'Тарифтер', title: 'Іске қосу және масштабтау үшін түсінікті модель', text: 'Тариф деректері кодты өзгертпей админкада өңделеді.' },
    investor: { kicker: 'Инвесторларға', title: 'VENSO бір реттік автоматтандыру емес, масштабталатын AI SaaS ретінде құрылады', text: 'Өнімдік модель жазылымды, салалық шаблондарды, интеграциялық қабатты және әр вертикаль бойынша сату білімін біріктіреді.', caption: 'Классикалық сервис + жаңа интеллектуалды инфрақұрылым' },
    proof: { kicker: 'Сенім', title: 'Бизнеске түсінікті, серіктестерге сенімді өнім' },
    lead: { kicker: 'Іске қосу', title: 'VENSO сіздің бизнесіңізде қалай сата алатынын көрсетеміз', text: 'Өтінім қалдырыңыз — салаңызға, ассортиментіңізге және арналарыңызға бейімделген демо сценарий дайындаймыз.' },
    form: { name: 'Атыңыз', phone: 'Телефон', company: 'Компания', plan: 'Қызықтыратын тариф', message: 'Нені автоматтандырғыңыз келеді?', submit: 'Тегін іске қосу алу', note: 'Батырманы басу арқылы сіз VENSO командасына өтінім жібересіз.', success: 'Өтінім жіберілді. Біз сізбен байланысып, демо-сценарий дайындаймыз.', error: 'Өтінімді жіберу мүмкін болмады. Атыңыз бен телефоныңызды тексеріңіз.' },
    footer: { text: 'Сату, есеп және клиенттік сервиске арналған жаңа буын AI-сатушы.', product: 'Өнім', company: 'Компания', admin: 'Админка', contact: 'Байланыс', support: 'Байланыс', city: 'Астана, Қазақстан', rights: 'Барлық құқықтар қорғалған.' }
  },
  en: {
    nav: { features: 'Features', how: 'How it works', demo: 'Demo', integrations: 'Integrations', pricing: 'Pricing', investors: 'Investors', login: 'Login', cta: 'Start free' },
    hero: {
      eyebrow: 'AI SaaS for sales, inventory and service',
      title: 'An AI sales operator that sells, tracks and closes requests',
      subtitle: 'VENSO combines a conversational assistant, digital inventory, sales analytics and integrations with accounting, CRM and banking workflows.',
      demo: 'Request demo', try: 'See it live', signalStock: 'Inventory', signalBank: 'Bank',
      card1Label: 'Client', card1Title: 'Need flowers today', card1Text: 'VENSO is selecting options',
      card2Label: 'Order', card2Title: 'Payment ready', card2Text: 'Inventory, CRM and bank are synced'
    },
    what: { kicker: 'What it is', title: 'VENSO is not just a chatbot. It is an operating layer for sales.', text: 'The assistant answers customers, knows your catalog, sees stock, creates requests and sends data to the right systems.' },
    hands: { kicker: 'Human + AI', title: 'You manage the strategy. VENSO handles the routine.', text: 'Managers see important deals, owners see numbers, customers get fast clear service. AI works between them as a precise operating layer.' },
    platform: { kicker: 'Platform', title: 'Sales, inventory, integrations and analytics in one interface' },
    how: { kicker: 'How it works', title: 'From first message to closed request' },
    demo: { kicker: 'Live scenario', title: 'Animated AI dialog with industry selection', placeholder: 'Type a message...', panelTitle: 'What VENSO does in parallel' },
    verticals: { kicker: 'Industries', title: 'Launched for a specific niche, not “for everyone”' },
    integrations: { kicker: 'Integrations', title: 'VENSO connects to sales channels and accounting systems', text: 'The assistant is not isolated: it sends requests to CRM, reserves stock, prepares documents and supports closing payments through bank workflows.' },
    pricing: { kicker: 'Pricing', title: 'A clear model for launch and scale', text: 'Pricing data is editable in the admin panel without code changes.' },
    investor: { kicker: 'For investors', title: 'VENSO is designed as scalable AI SaaS, not a one-off automation', text: 'The product model combines subscriptions, vertical templates, integration layers and accumulated sales knowledge across industries.', caption: 'Classic service + new intelligent infrastructure' },
    proof: { kicker: 'Social proof', title: 'Clear for businesses, convincing for partners' },
    lead: { kicker: 'Launch', title: 'We will show how VENSO can sell in your business', text: 'Leave a request — we will prepare a demo scenario for your industry, catalog and communication channels.' },
    form: { name: 'Name', phone: 'Phone', company: 'Company', plan: 'Plan of interest', message: 'What do you want to automate?', submit: 'Get free launch', note: 'By clicking the button, you send a request to the VENSO team.', success: 'Request sent. We will contact you and prepare a demo scenario.', error: 'Could not send the request. Check name and phone.' },
    footer: { text: 'Next-generation AI sales operator for sales, accounting and customer service.', product: 'Product', company: 'Company', admin: 'Admin', contact: 'Contacts', support: 'Contact', city: 'Astana, Kazakhstan', rights: 'All rights reserved.' }
  }
};

const copy = {
  ru: {
    metrics: [
      ['24/7', 'На связи с клиентами без выходных'], ['+38%', 'Рост конверсии в диалогах'], ['3 языка', 'RU, KZ, EN из коробки'], ['1 день', 'Пилотный запуск без долгой разработки']
    ],
    features: [
      ['AI', 'AI-продавец', 'Ведёт диалог в стиле вашей компании, отвечает на вопросы и мягко доводит клиента до заявки.'],
      ['ST', 'Электронный склад', 'Проверяет остатки, резервирует позиции и помогает не продавать то, чего уже нет.'],
      ['1C', 'Бухгалтерия', 'Передаёт данные в учетные системы, готовит основу для документов и снижает ручной ввод.'],
      ['₸', 'Банковское закрытие', 'Формирует сценарий оплаты, фиксирует статус и помогает закрывать заявку без потери контекста.']
    ],
    bento: [
      ['large', '01', 'Диалоговый продавец', 'VENSO понимает намерение клиента, задаёт уточняющие вопросы и предлагает следующий логичный шаг.'],
      ['large', '02', 'База знаний бизнеса', 'Внутри можно хранить товары, услуги, правила доставки, акции, FAQ и скрипты общения.'],
      ['medium', '03', 'Склад и резервы', 'Ассистент видит наличие, не обещает лишнего и создаёт резерв под заявку.'],
      ['medium', '04', 'CRM и задачи', 'Каждое обращение превращается в понятную карточку с источником, статусом и историей диалога.'],
      ['small', '05', 'Бухгалтерия', 'Данные для счетов, актов и закрывающих документов уходят в учетный контур.'],
      ['small', '06', 'Банки и оплата', 'VENSO помогает формировать ссылку на оплату и отслеживает успешное закрытие.']
    ],
    steps: [
      ['1', 'Клиент пишет', 'WhatsApp, сайт, Instagram или другой канал.'], ['2', 'AI понимает запрос', 'Определяет смысл, срочность и цель обращения.'], ['3', 'Уточняет детали', 'Собирает параметры, бюджет, адрес и ограничения.'], ['4', 'Подбирает решение', 'Смотрит базу знаний, цены и остатки.'], ['5', 'Создаёт заявку', 'Передаёт данные в CRM, склад и учет.'], ['6', 'Закрывает оплату', 'Фиксирует статус и показывает аналитику.']
    ],
    verticals: [
      ['✦', 'Цветы', 'Подбор букета, доставка, резерв и оплата.'], ['◒', 'Рестораны', 'Бронирования, меню, банкеты и предзаказы.'], ['✧', 'Beauty', 'Запись, услуги, мастера и повторные визиты.'], ['□', 'E-commerce', 'Каталог, наличие, рекомендации и доставка.'], ['+', 'Медицина', 'Запись, первичная консультация и напоминания.'], ['◈', 'Сервисы', 'Заявки, диагностика, статусы и документы.']
    ],
    integrations: [
      ['WA', 'WhatsApp', 'Канал заявок и быстрых ответов'], ['TG', 'Telegram', 'Уведомления и диалоги'], ['IG', 'Instagram', 'Лиды из Direct'], ['WEB', 'Сайт', 'Виджет продаж'], ['CRM', 'CRM', 'Сделки, задачи и статусы'], ['ST', 'Склад', 'Остатки и резервы'], ['1C', 'Бухгалтерия', 'Счета и документы'], ['BNK', 'Банки', 'Оплата и закрытие']
    ],
    investors: [
      ['AI SaaS', 'Подписочная модель с высокой повторяемостью и понятной экономикой.'], ['Вертикальные шаблоны', 'Один движок адаптируется под цветы, рестораны, e-commerce и сервисы.'], ['Интеграционный слой', 'Чем больше подключений к CRM, складам и банкам, тем выше ценность продукта.'], ['Данные продаж', 'Накопление сценариев, возражений и лучших ответов усиливает продукт со временем.']
    ],
    proofs: [
      ['Алина М.', 'Студия цветов', 'VENSO сократил время ответа и помог не терять вечерние заявки.'], ['Данияр К.', 'Ресторан', 'Ассистент собирает брони и не путает условия по банкетам.'], ['Мария С.', 'Интернет-магазин', 'Стало проще объяснять клиентам наличие, оплату и доставку.'], ['Clinic Life', 'Медицина', 'Меньше пропущенных обращений и больше записей на консультации.']
    ],
    scenarios: {
      flowers: { tab: 'Цветы', title: 'Цветочный магазин', messages: [['client', 'Здравствуйте. Нужен нежный букет до 25 000 ₸ с доставкой сегодня.'], ['ai', 'Здравствуйте. Подберу варианты в пастельных тонах. Подскажите район доставки и желаемое время?'], ['client', 'Левый берег, желательно до 18:00.'], ['ai', 'Есть три подходящих букета. Самый точный вариант — “Лавандовое облако”, в наличии 4 шт., доставка успевает к 17:30.']], recs: [['✿', 'Нежность утра', 'Пионовидные розы, эвкалипт', '22 900 ₸'], ['✺', 'Лавандовое облако', 'Гортензия, розы, лаванда', '24 900 ₸'], ['✸', 'Розовый закат', 'Розы и ранункулюсы', '23 500 ₸']], stack: [['Склад', 'Зарезервировал букет на 25 минут'], ['CRM', 'Создал заявку с источником WhatsApp'], ['Банк', 'Подготовил ссылку на оплату'], ['Аналитика', 'Записал спрос на пастельные букеты']] },
      restaurant: { tab: 'Ресторан', title: 'Ресторан и банкеты', messages: [['client', 'Добрый день. Хотим забронировать стол на 8 человек в пятницу.'], ['ai', 'Добрый день. Проверяю свободные слоты. Вам нужен общий зал или отдельная зона?'], ['client', 'Лучше отдельная зона, будет день рождения.'], ['ai', 'Есть VIP-зона на 19:30. Могу зафиксировать бронь и отправить условия депозита.']], recs: [['◒', 'VIP-зона', '8 гостей, депозит', '50 000 ₸'], ['◐', 'Основной зал', 'У окна, без депозита', '0 ₸'], ['◓', 'Банкетный сет', 'Меню на компанию', '9 500 ₸/гость']], stack: [['CRM', 'Создана бронь и карточка клиента'], ['Календарь', 'Занято окно 19:30'], ['Банк', 'Сформирован депозит'], ['Персонал', 'Отправлена задача администратору']] },
      ecommerce: { tab: 'E-commerce', title: 'Интернет-магазин', messages: [['client', 'Есть ли черная сумка из новой коллекции?'], ['ai', 'Да, осталось 3 штуки. Могу показать размеры, фото и варианты доставки.'], ['client', 'Нужна доставка сегодня и оплата картой.'], ['ai', 'Подходит модель Nova Black. Доставка сегодня доступна, оплату можно закрыть по ссылке.']], recs: [['▣', 'Nova Black', 'В наличии 3 шт.', '31 000 ₸'], ['▤', 'Mini Graphite', 'Компактная версия', '27 000 ₸'], ['▥', 'Premium Set', 'Сумка + аксессуар', '39 000 ₸']], stack: [['Склад', 'Списал резерв на 30 минут'], ['CRM', 'Создал заказ с UTM-метками'], ['Банк', 'Ссылка на оплату создана'], ['Доставка', 'Передал адрес в службу доставки']] },
      service: { tab: 'Сервис', title: 'Сервисная компания', messages: [['client', 'Нужно подключить обслуживание кондиционера. Когда можно?'], ['ai', 'Проверяю свободные окна мастеров. Уточните район и модель кондиционера.'], ['client', 'Есиль, Samsung, 2 внутренних блока.'], ['ai', 'Есть окно завтра с 11:00 до 13:00. Я создам заявку и отправлю предварительную стоимость.']], recs: [['◇', 'Диагностика', 'Выезд мастера', '7 000 ₸'], ['◆', 'Обслуживание', '2 внутренних блока', '18 000 ₸'], ['◈', 'Пакет Premium', 'Чистка + гарантия', '29 000 ₸']], stack: [['CRM', 'Создана заявка на выезд'], ['Календарь', 'Забронирован мастер'], ['Бухгалтерия', 'Подготовлены данные для счета'], ['Аналитика', 'Отмечен повторный клиент']] }
    }
  }
};

copy.kk = copy.ru;
copy.en = copy.ru;

function tr(path) {
  const parts = path.split('.');
  let current = t[state.lang] || t.ru;
  for (const part of parts) current = current && current[part];
  return current || path;
}

function activeCopy() {
  return copy[state.lang] || copy.ru;
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('venso_lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  renderStaticSections();
  renderScenarios();
  renderPricing();
}

function card(className, html) {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = html;
  return div;
}

function renderStaticSections() {
  const data = activeCopy();
  fill('metricsGrid', data.metrics.map(([value, text]) => card('metric-card reveal', `<span>${value}</span><span>${text}</span>`)));
  fill('featureGrid', data.features.map(([icon, title, text]) => card('feature-card reveal', `<div class="icon-box">${icon}</div><h3>${title}</h3><p>${text}</p>`)));
  fill('bentoGrid', data.bento.map(([size, num, title, text]) => card(`bento-card ${size} reveal`, `<span class="bento-value">${num}</span><h3>${title}</h3><p>${text}</p>`)));
  fill('timeline', data.steps.map(([num, title, text]) => card('step-card reveal', `<div class="step-num">${num}</div><h3>${title}</h3><p>${text}</p>`)));
  fill('verticalGrid', data.verticals.map(([icon, title, text]) => card('vertical-card reveal', `<div class="visual-dot">${icon}</div><h3>${title}</h3><p>${text}</p>`)));
  fill('integrationGrid', data.integrations.map(([icon, title, text]) => card('integration-card reveal', `<div class="visual-dot">${icon}</div><h3>${title}</h3><p>${text}</p>`)));
  fill('investorCards', data.investors.map(([title, text]) => card('investor-mini reveal', `<strong>${title}</strong><span>${text}</span>`)));
  fill('proofGrid', data.proofs.map(([name, role, quote]) => card('proof-card reveal', `<strong>${name}</strong><small>${role}</small><div class="stars-rating">★★★★★</div><p>“${quote}”</p>`)));
  observeReveal();
}

function fill(id, nodes) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = '';
  nodes.forEach(node => root.appendChild(node));
}

async function fetchTariffs() {
  try {
    const res = await fetch('/api/tariffs');
    const json = await res.json();
    state.tariffs = json.tariffs || [];
  } catch (error) {
    state.tariffs = [];
  }
  renderPricing();
}

function renderPricing() {
  const root = document.getElementById('pricingGrid');
  const planSelect = document.getElementById('planSelect');
  if (!root) return;
  root.innerHTML = '';
  if (planSelect) planSelect.innerHTML = '';
  state.tariffs.forEach(tariff => {
    const buttonClass = tariff.highlighted ? 'primary-btn' : 'ghost-btn';
    const el = card(`pricing-card reveal ${tariff.highlighted ? 'highlighted' : ''}`, `
      <span class="pricing-badge">${escapeHtml(tariff.badge || '')}</span>
      <h3>${escapeHtml(tariff.name)}</h3>
      <div class="price"><strong>${escapeHtml(tariff.price)}</strong><span>${escapeHtml(tariff.period || '')}</span></div>
      <p>${escapeHtml(tariff.description || '')}</p>
      <ul>${(tariff.features || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <a class="${buttonClass}" href="#lead" data-plan="${escapeHtml(tariff.name)}">${tr('nav.cta')}</a>
    `);
    root.appendChild(el);
    if (planSelect) {
      const opt = document.createElement('option');
      opt.value = tariff.name;
      opt.textContent = `${tariff.name} — ${tariff.price}`;
      planSelect.appendChild(opt);
    }
  });
  root.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => {
    if (planSelect) planSelect.value = a.dataset.plan;
  }));
  observeReveal();
}

function renderScenarios() {
  const data = activeCopy().scenarios;
  const tabs = document.getElementById('scenarioTabs');
  if (!tabs) return;
  tabs.innerHTML = '';
  Object.entries(data).forEach(([key, scenario]) => {
    const btn = document.createElement('button');
    btn.className = `scenario-tab ${key === state.scenario ? 'active' : ''}`;
    btn.textContent = scenario.tab;
    btn.addEventListener('click', () => {
      state.scenario = key;
      renderScenarios();
    });
    tabs.appendChild(btn);
  });
  renderScenarioContent();
}

function renderScenarioContent() {
  const scenario = activeCopy().scenarios[state.scenario] || activeCopy().scenarios.flowers;
  document.getElementById('scenarioTitle').textContent = scenario.title;
  const chat = document.getElementById('chatStream');
  chat.innerHTML = '';
  scenario.messages.forEach(([type, text], index) => {
    const msg = card(`message ${type}`, `<small>${type === 'ai' ? 'VENSO' : tr('hero.card1Label')}</small>${escapeHtml(text)}`);
    msg.style.animationDelay = `${index * 170}ms`;
    chat.appendChild(msg);
  });
  const recRoot = document.getElementById('recommendations');
  recRoot.innerHTML = '';
  scenario.recs.forEach(([icon, title, text, price], index) => {
    const rec = card(`rec-card ${index === 1 ? 'highlight' : ''}`, `<div><div class="rec-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div><strong>${price}</strong>`);
    recRoot.appendChild(rec);
  });
  const stack = document.getElementById('automationStack');
  stack.innerHTML = '';
  scenario.stack.forEach(([title, text]) => stack.appendChild(card('auto-item', `<div class="check">✓</div><div><strong>${title}</strong><span>${text}</span></div>`)));
}

function startScenarioAutoPlay() {
  const keys = Object.keys(activeCopy().scenarios);
  setInterval(() => {
    if (document.hidden) return;
    const list = Object.keys(activeCopy().scenarios);
    const index = list.indexOf(state.scenario);
    state.scenario = list[(index + 1) % list.length];
    renderScenarios();
  }, 8500);
}

function initLeadForm() {
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.lang = state.lang;
    payload.page = location.href;
    payload.utm = Object.fromEntries(new URLSearchParams(location.search).entries());
    note.className = 'form-note';
    note.textContent = 'Отправляем заявку...';
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('failed');
      form.reset();
      note.className = 'form-note success';
      note.textContent = tr('form.success');
    } catch (error) {
      note.className = 'form-note error';
      note.textContent = tr('form.error');
    }
  });
}

function observeReveal() {
  const items = document.querySelectorAll('.reveal:not(.observed)');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => { item.classList.add('observed'); io.observe(item); });
}

function initHeader() {
  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[ch]));
}

initHeader();
initCursorGlow();
setLang(state.lang);
fetchTariffs();
initLeadForm();
startScenarioAutoPlay();
