const RANGES = [
  ["1h", "1m"],
  ["6h", "5m"],
  ["24h", "15m"],
  ["7d", "30m"],
  ["30d", "3h"],
  ["90d", "12h"],
];

const EVERY = ["30s", "1m", "5m", "15m", "30m", "1h", "3h", "6h", "12h", "1d"];
const COLORS = ["#3ddc84", "#2ad4c8", "#4c8dff", "#f5c451", "#ff9f43", "#ff5d8f", "#a78bfa", "#67e8f9", "#fb7185", "#86efac", "#60a5fa", "#fbbf24"];

const I18N = {
  de: {
    subtitle: "Zeitreihen lesen",
    connecting: "verbinde…",
    data: "Daten",
    expert: "Expert",
    expertHelp: "Serien aus beliebigen Buckets hinzufügen und im gleichen Diagramm vergleichen.",
    expertEmpty: "Noch keine Serie. Oben Bucket, Measurement und Feld wählen und hinzufügen.",
    expertAdd: "Hinzufügen",
    expertRemove: "Entfernen",
    expertSeries: "Serien",
    expertMax: "Höchstens 12 Serien.",
    expertDup: "Diese Serie ist schon dabei.",
    expertNeedField: "Bucket, Measurement und Feld wählen.",
    expertLines: "Linien",
    expertPoints: "Punkte",
    expertBoth: "Beides",
    expertLinear: "Linear",
    expertLog: "Log",
    expertShiftBack: "Zeitfenster zurück",
    expertShiftFwd: "Zeitfenster vor",
    expertZoomHint: "Fenster aufziehen zum Zoomen, Mausrad zoomt die Zeit, Doppelklick setzt zurück.",
    expertAxis: "Achse",
    field: "Feld",
    settings: "Einstellungen",
    org: "Organisation",
    logout: "Abmelden",
    search: "Measurement suchen",
    systemBuckets: "System-Buckets",
    loading: "lädt…",
    range: "Zeitraum",
    from: "von",
    to: "bis",
    applyRange: "Zeitraum",
    aggregation: "Aggregation",
    raw: "Rohdaten",
    mean: "Mittel",
    maximum: "Maximum",
    minimum: "Minimum",
    minmax: "Min–Max",
    last: "Letzter Wert",
    window: "Fenster",
    refresh: "Aktualisieren",
    chart: "Diagramm",
    fluxQuery: "Flux-Abfrage",
    run: "Ausführen",
    connection: "Verbindung",
    settingsHelp: "Der Token bleibt auf dem Server. Leer lassen, wenn er unverändert bleiben soll. Ein neues Passwort ersetzt das bisherige und braucht mindestens 8 Zeichen.",
    token: "Token",
    tokenKeep: "gespeichert",
    accessPassword: "Neues Passwort",
    passwordHint: "leer lassen, um es zu behalten",
    clearPassword: "Passwort entfernen",
    setupTitle: "Ersteinrichtung",
    setupLead: "Lege das Passwort für den Benutzer admin fest. Das geht nur aus dem privaten Netz.",
    guide1: "Diese Seite nur über eine private Adresse öffnen: localhost, 10.x, 172.16–31.x oder 192.168.x.",
    guide2: "Der Benutzername ist fest admin und kann nicht geändert werden.",
    guide3: "Ein Passwort mit mindestens 8 Zeichen wählen und es wiederholen.",
    guide4: "Danach mit admin und diesem Passwort anmelden. Die Einrichtung bleibt von öffentlichen Adressen aus gesperrt.",
    passwordMismatch: "Die Passwörter stimmen nicht überein.",
    confirm: "Passwort wiederholen",
    create: "Passwort festlegen",
    userFixed: "Benutzer",
    close: "Schließen",
    save: "Speichern",
    password: "Passwort",
    signIn: "Anmelden",
    protected: "Die Datenansicht ist mit einem Passwort geschützt.",
    totpTitle: "Zwei-Faktor-Anmeldung",
    totpHelpOff: "Optional. Ein 6-stelliger Code aus einer Authenticator-App, berechnet lokal nach RFC 6238. Der Schlüssel bleibt auf diesem Server.",
    totpHelpOn: "Die Anmeldung verlangt das Passwort und danach den aktuellen Code.",
    totpOff: "2FA ist aus.",
    totpOn: "2FA ist aktiv.",
    totpStart: "2FA einrichten",
    totpStep: "Code scannen oder den Schlüssel in die App tippen. Danach den aktuellen 6-stelligen Code bestätigen.",
    totpSecret: "Schlüssel",
    totpCode: "Code",
    totpConfirm: "Code bestätigen",
    totpDisable: "2FA abschalten",
    totpPassword: "Passwort",
    totpLead: "Gib den 6-stelligen Code aus der Authenticator-App ein.",
    totpContinue: "Weiter",
    lanOnly: "Ohne Zugangspasswort ist der Browser nur im lokalen Netz erreichbar.",
    lanHint: "Im lokalen Netz lässt sich unter Einstellungen ein Zugangspasswort setzen. Danach gilt es auch von außen.",
    noOrg: "ohne Organisation",
    readToken: "Lesetoken",
    buckets: "Buckets",
    noPassword: "ohne Zugangspasswort",
    system: "System",
    noBucket: "Kein Bucket.",
    noMeasurements: "Keine Measurements in diesem Bucket.",
    nothing: "Nichts gefunden.",
    loadingSchema: "Felder und Tags werden geladen…",
    noFields: "Keine Felder.",
    all: "alle",
    none: "keine",
    tags: "Tags",
    needStart: "Bitte einen Startzeitpunkt setzen.",
    points: "{n} Punkte",
    numeric: "{n} numerisch",
    latest: "letzter Wert",
    limitHit: "Limit erreicht",
    noData: "Keine Daten in diesem Zeitraum.",
    time: "Zeit",
    noNumeric: "Keine numerischen Werte für das Diagramm.",
    noRows: "Keine Zeilen.",
    truncated: "Anzeige gekürzt.",
    saved: "Gespeichert. {n} Buckets erreichbar.",
    badJson: "Antwort ist kein JSON.",
    zoomHint: "Abschnitte vergrößern: Trennlinie ziehen oder Mausrad darauf. In Listen Alt gedrückt halten. Doppelklick setzt die Größe zurück.",
    range1h: "1 h",
    range6h: "6 h",
    range24h: "24 h",
    range7d: "7 Tage",
    range30d: "30 Tage",
    range90d: "90 Tage",
  },
  en: {
    subtitle: "Read time series",
    connecting: "connecting…",
    data: "Data",
    expert: "Expert",
    expertHelp: "Add series from any buckets and compare them in one chart.",
    expertEmpty: "No series yet. Choose a bucket, measurement, and field above, then add it.",
    expertAdd: "Add",
    expertRemove: "Remove",
    expertSeries: "Series",
    expertMax: "At most 12 series.",
    expertDup: "That series is already on the chart.",
    expertNeedField: "Choose a bucket, measurement, and field.",
    expertLines: "Lines",
    expertPoints: "Points",
    expertBoth: "Both",
    expertLinear: "Linear",
    expertLog: "Log",
    expertShiftBack: "Shift window back",
    expertShiftFwd: "Shift window forward",
    expertZoomHint: "Drag a box to zoom, mouse wheel zooms time, double-click resets.",
    expertAxis: "Axis",
    field: "Field",
    settings: "Settings",
    org: "Organization",
    logout: "Sign out",
    search: "Search measurements",
    systemBuckets: "System buckets",
    loading: "loading…",
    range: "Range",
    from: "from",
    to: "to",
    applyRange: "Apply",
    aggregation: "Aggregation",
    raw: "Raw",
    mean: "Mean",
    maximum: "Maximum",
    minimum: "Minimum",
    minmax: "Min–Max",
    last: "Last value",
    window: "Window",
    refresh: "Refresh",
    chart: "Chart",
    fluxQuery: "Flux query",
    run: "Run",
    connection: "Connection",
    settingsHelp: "The token stays on the server. Leave it blank to keep the saved token. A new password replaces the current one and needs at least 8 characters.",
    token: "Token",
    tokenKeep: "saved",
    accessPassword: "New password",
    passwordHint: "leave blank to keep it",
    clearPassword: "Remove password",
    setupTitle: "First-time setup",
    setupLead: "Set the password for the user admin. This is only possible from the private network.",
    guide1: "Open this page only from a private address: localhost, 10.x, 172.16–31.x, or 192.168.x.",
    guide2: "The user name is fixed as admin and cannot be changed.",
    guide3: "Choose a password of at least 8 characters and repeat it.",
    guide4: "Then sign in with admin and that password. Setup stays blocked from public addresses.",
    passwordMismatch: "The passwords do not match.",
    confirm: "Repeat password",
    create: "Set password",
    userFixed: "User",
    close: "Close",
    save: "Save",
    password: "Password",
    signIn: "Sign in",
    protected: "The data view is protected by a password.",
    totpTitle: "Two-factor sign-in",
    totpHelpOff: "Optional. A 6-digit code from an authenticator app, calculated locally per RFC 6238. The key stays on this server.",
    totpHelpOn: "Sign-in asks for the password and then the current code.",
    totpOff: "2FA is off.",
    totpOn: "2FA is on.",
    totpStart: "Set up 2FA",
    totpStep: "Scan the code or type the key into the app. Then confirm the current 6-digit code.",
    totpSecret: "Key",
    totpCode: "Code",
    totpConfirm: "Confirm code",
    totpDisable: "Turn off 2FA",
    totpPassword: "Password",
    totpLead: "Enter the 6-digit code from the authenticator app.",
    totpContinue: "Continue",
    lanOnly: "Without an access password the browser is only available on the local network.",
    lanHint: "On the local network you can set an access password in Settings. It then also works from outside.",
    noOrg: "no organization",
    readToken: "read token",
    buckets: "buckets",
    noPassword: "no access password",
    system: "System",
    noBucket: "No bucket.",
    noMeasurements: "No measurements in this bucket.",
    nothing: "Nothing found.",
    loadingSchema: "Loading fields and tags…",
    noFields: "No fields.",
    all: "all",
    none: "none",
    tags: "Tags",
    needStart: "Set a start time.",
    points: "{n} points",
    numeric: "{n} numeric",
    latest: "latest value",
    limitHit: "Limit reached",
    noData: "No data in this range.",
    time: "Time",
    noNumeric: "No numeric values for the chart.",
    noRows: "No rows.",
    truncated: "Display truncated.",
    saved: "Saved. {n} buckets reachable.",
    badJson: "Response is not JSON.",
    zoomHint: "Resize a section by dragging its divider or using the mouse wheel on it. Hold Alt inside lists. Double-click resets the size.",
    range1h: "1 h",
    range6h: "6 h",
    range24h: "24 h",
    range7d: "7 days",
    range30d: "30 days",
    range90d: "90 days",
  },
};

function detectLang() {
  const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
  return list.some((lang) => String(lang).toLowerCase().startsWith("de")) ? "de" : "en";
}

function t(key, vars) {
  const text = (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? ""));
}

const defaults = { nav: 280, chart: 320, table: 420, flux: 420 };
const layoutBounds = { nav: [180, 560], chart: [160, 760], table: [140, 900], flux: [240, 820] };
const aggregates = ["none", "mean", "max", "min", "last", "minmax"];
const limits = [500, 1000, 4000, 8000];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function cleanText(value, max) {
  if (typeof value !== "string") return "";
  const text = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return text.length > max ? text.slice(0, max) : text;
}

function cleanLabel(value) {
  const text = cleanText(value, 200);
  if (!text || /[<>"]/.test(text)) return "";
  return text;
}

function cleanDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(value) ? value : "";
}

function sanitizeUi(data) {
  const out = {};
  if (!data || typeof data !== "object" || Array.isArray(data)) return out;
  if (data.lang === "de" || data.lang === "en") out.lang = data.lang;
  for (const [key, bounds] of Object.entries(layoutBounds)) {
    const number = Number(data[key]);
    if (Number.isInteger(number) && number >= bounds[0] && number <= bounds[1]) out[key] = number;
  }
  const bucket = cleanLabel(data.bucket);
  const measurement = cleanLabel(data.measurement);
  if (bucket) out.bucket = bucket;
  if (measurement) out.measurement = measurement;
  if (RANGES.some(([id]) => id === data.range)) out.range = data.range;
  if (aggregates.includes(data.aggregate)) out.aggregate = data.aggregate;
  if (EVERY.includes(data.every)) out.every = data.every;
  if (limits.includes(data.limit)) out.limit = data.limit;
  if (typeof data.useCustom === "boolean") out.useCustom = data.useCustom;
  if (typeof data.showSystem === "boolean") out.showSystem = data.showSystem;
  if (data.tab === "browse" || data.tab === "flux" || data.tab === "expert") out.tab = data.tab;
  if (data.expert && typeof data.expert === "object" && !Array.isArray(data.expert)) {
    const expert = {};
    if (RANGES.some(([id]) => id === data.expert.range)) expert.range = data.expert.range;
    if (aggregates.includes(data.expert.aggregate)) expert.aggregate = data.expert.aggregate;
    if (EVERY.includes(data.expert.every)) expert.every = data.expert.every;
    if (typeof data.expert.useCustom === "boolean") expert.useCustom = data.expert.useCustom;
    if (data.expert.draw === "line" || data.expert.draw === "point" || data.expert.draw === "both") expert.draw = data.expert.draw;
    if (data.expert.scale === "linear" || data.expert.scale === "log") expert.scale = data.expert.scale;
    const from = cleanDate(data.expert.from);
    const to = cleanDate(data.expert.to);
    if (from) expert.from = from;
    if (to) expert.to = to;
    if (Array.isArray(data.expert.series)) {
      const series = [];
      for (const item of data.expert.series) {
        if (!item || typeof item !== "object") continue;
        const bucket = cleanLabel(item.bucket);
        const measurement = cleanLabel(item.measurement);
        const field = cleanLabel(item.field);
        if (!bucket || !measurement || !field) continue;
        if (series.some((row) => row.bucket === bucket && row.measurement === measurement && row.field === field)) continue;
        const color = typeof item.color === "string" && /^#[0-9A-Fa-f]{6}$/.test(item.color)
          ? item.color.toLowerCase()
          : COLORS[series.length % COLORS.length];
        const axis = [1, 2, 3, 4].includes(Number(item.axis)) ? Number(item.axis) : 1;
        series.push({ bucket, measurement, field, color, axis });
        if (series.length === 12) break;
      }
      if (series.length) expert.series = series;
    }
    if (Object.keys(expert).length) out.expert = expert;
  }
  const search = cleanText(data.search, 80).toLowerCase();
  if (search) out.search = search;
  const from = cleanDate(data.from);
  const to = cleanDate(data.to);
  if (from) out.from = from;
  if (to) out.to = to;
  const query = typeof data.query === "string" ? data.query.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") : "";
  if (query.trim()) out.query = query.slice(0, 1500);
  if (Array.isArray(data.fields)) {
    const fields = [];
    for (const field of data.fields) {
      const name = cleanLabel(field);
      if (name && !fields.includes(name)) fields.push(name);
      if (fields.length === 40) break;
    }
    if (fields.length) out.fields = fields;
  }
  if (data.tags && typeof data.tags === "object" && !Array.isArray(data.tags)) {
    const tags = {};
    for (const [key, value] of Object.entries(data.tags)) {
      const name = cleanLabel(key);
      const picked = cleanLabel(value);
      if (name && picked) tags[name] = picked;
      if (Object.keys(tags).length === 20) break;
    }
    if (Object.keys(tags).length) out.tags = tags;
  }
  return out;
}

function uiCookiePath() {
  const path = location.pathname.replace(/[^/]*$/, "");
  return path || "/";
}

function readUiCookie() {
  const row = document.cookie.split("; ").find((part) => part.startsWith("ib-ui="));
  if (!row) return {};
  const raw = row.slice("ib-ui=".length);
  try {
    const text = raw.startsWith("%") ? decodeURIComponent(raw) : raw;
    return sanitizeUi(JSON.parse(text));
  } catch (err) {
    return {};
  }
}

function writeUiCookie(data) {
  let clean = sanitizeUi(data);
  let value = encodeURIComponent(JSON.stringify(clean));
  if (value.length > 3500) {
    delete clean.query;
    clean = sanitizeUi(clean);
    value = encodeURIComponent(JSON.stringify(clean));
  }
  if (value.length > 3500) return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `ib-ui=${value}; Max-Age=31536000; Path=${uiCookiePath()}; SameSite=Lax${secure}`;
}

function migratedUi() {
  try {
    return sanitizeUi({
      lang: localStorage.getItem("ib-lang"),
      nav: Number(localStorage.getItem("ib-nav")),
      chart: Number(localStorage.getItem("ib-chart")),
      table: Number(localStorage.getItem("ib-table")),
      flux: Number(localStorage.getItem("ib-flux")),
      bucket: localStorage.getItem("ib-bucket") || "",
      measurement: localStorage.getItem("ib-measurement") || "",
    });
  } catch (err) {
    return {};
  }
}

function savedUi() {
  const row = document.cookie.split("; ").find((part) => part.startsWith("ib-ui="));
  let data = {};
  if (!row) {
    data = migratedUi();
    if (Object.keys(data).length) writeUiCookie(data);
  } else {
    let stored = null;
    try {
      const raw = row.slice("ib-ui=".length);
      stored = JSON.parse(raw.startsWith("%") ? decodeURIComponent(raw) : raw);
    } catch (err) {
      stored = null;
    }
    data = sanitizeUi(stored);
    const dirty = !stored || typeof stored !== "object" || Array.isArray(stored)
      || Object.keys(stored).length !== Object.keys(data).length
      || Object.keys(stored).some((key) => JSON.stringify(stored[key]) !== JSON.stringify(data[key]));
    if (dirty) writeUiCookie(data);
  }
  try {
    ["ib-lang", "ib-nav", "ib-chart", "ib-table", "ib-flux", "ib-bucket", "ib-measurement"].forEach((key) => localStorage.removeItem(key));
  } catch (err) { /* private mode */ }
  return data;
}

const prefs = savedUi();
const layout = {
  nav: prefs.nav || defaults.nav,
  chart: prefs.chart || defaults.chart,
  table: prefs.table || defaults.table,
  flux: prefs.flux || defaults.flux,
};

const state = {
  session: null,
  buckets: [],
  measurements: [],
  fields: [],
  tags: [],
  selected: new Set(prefs.fields || []),
  tagFilter: prefs.tags || {},
  bucket: prefs.bucket || "",
  measurement: prefs.measurement || "",
  range: prefs.range || "24h",
  aggregate: prefs.aggregate || "mean",
  every: prefs.every || "15m",
  limit: prefs.limit || 4000,
  useCustom: prefs.useCustom === true,
  search: prefs.search || "",
  showSystem: prefs.showSystem === true,
  tab: prefs.tab || "browse",
  points: [],
  fluxText: "",
  truncated: false,
  error: "",
  loading: false,
  qColumns: [],
  qRows: [],
  qError: "",
  qTruncated: false,
  lang: prefs.lang || detectLang(),
  fluxDraft: prefs.query || "",
  from: prefs.from || "",
  to: prefs.to || "",
  expert: {
    range: prefs.expert?.range || "24h",
    aggregate: prefs.expert?.aggregate || "mean",
    every: prefs.expert?.every || "15m",
    useCustom: prefs.expert?.useCustom === true,
    from: prefs.expert?.from || "",
    to: prefs.expert?.to || "",
    draw: prefs.expert?.draw || "line",
    scale: prefs.expert?.scale || "linear",
    series: Array.isArray(prefs.expert?.series)
      ? prefs.expert.series.map((row, index) => ({
          bucket: row.bucket,
          measurement: row.measurement,
          field: row.field,
          color: /^#[0-9A-Fa-f]{6}$/.test(row.color || "") ? row.color.toLowerCase() : COLORS[index % COLORS.length],
          axis: [1, 2, 3, 4].includes(Number(row.axis)) ? Number(row.axis) : 1,
        }))
      : [],
  },
  expertPick: { bucket: "", measurement: "", field: "", measurements: [], fields: [] },
};

let expertViewZoom = null;
let expertSelectDrag = null;

function saveUi() {
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const flux = document.getElementById("fluxInput");
  const expertFrom = document.getElementById("expertFrom");
  const expertTo = document.getElementById("expertTo");
  if (from) state.from = from.value;
  if (to) state.to = to.value;
  if (flux) state.fluxDraft = flux.value;
  if (expertFrom) state.expert.from = expertFrom.value;
  if (expertTo) state.expert.to = expertTo.value;
  writeUiCookie({
    lang: state.lang,
    nav: layout.nav,
    chart: layout.chart,
    table: layout.table,
    flux: layout.flux,
    bucket: state.bucket,
    measurement: state.measurement,
    range: state.range,
    aggregate: state.aggregate,
    every: state.every,
    limit: state.limit,
    useCustom: state.useCustom,
    showSystem: state.showSystem,
    tab: state.tab,
    search: state.search,
    from: state.from,
    to: state.to,
    query: state.fluxDraft,
    fields: [...state.selected],
    tags: state.tagFilter,
    expert: {
      range: state.expert.range,
      aggregate: state.expert.aggregate,
      every: state.expert.every,
      useCustom: state.expert.useCustom,
      from: state.expert.from,
      to: state.expert.to,
      draw: state.expert.draw,
      scale: state.expert.scale,
      series: state.expert.series,
    },
  });
}

document.documentElement.lang = state.lang;

let browseCtl = null;
let expertCtl = null;
let chartSeries = [];
let expertChartSeries = [];
let chartBounds = null;
let expertChartBounds = null;

const app = document.getElementById("app");

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function api(action, { method = "GET", query = null, body = null, signal = null } = {}) {
  const url = new URL("api.php", location.href);
  url.searchParams.set("action", action);
  if (query) {
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
  }
  const headers = { "X-Influx-Browser": "1", "X-Influx-Lang": state.lang };
  if (body) headers["Content-Type"] = "application/json";
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });
  const data = await response.json().catch(() => ({ error: t("badJson") }));
  if (!response.ok) {
    const error = new Error(data.error || "HTTP " + response.status);
    error.status = response.status;
    throw error;
  }
  return data;
}

function fmtNum(value) {
  if (typeof value !== "number") return value == null ? "" : String(value);
  return new Intl.NumberFormat(state.lang === "de" ? "de-AT" : "en-GB", { maximumFractionDigits: 3 }).format(value);
}

function fmtTime(ms) {
  return new Intl.DateTimeFormat(state.lang === "de" ? "de-AT" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ms));
}

function visibleBuckets() {
  return state.buckets.filter((bucket) => state.showSystem || bucket.type === "user");
}

function suggestedEvery(range) {
  return (RANGES.find((item) => item[0] === range) || RANGES[2])[1];
}

function langButtons() {
  return `<div class="lang" role="group">
    <button type="button" class="btn tiny ${state.lang === "de" ? "active" : ""}" data-lang="de">DE</button>
    <button type="button" class="btn tiny ${state.lang === "en" ? "active" : ""}" data-lang="en">EN</button>
  </div>`;
}

async function boot() {
  try {
    state.session = await api("session");
  } catch (error) {
    app.innerHTML = `<div class="gate"><div class="card"><p class="err">${esc(error.message)}</p></div></div>`;
    return;
  }
  renderRoot();
}

function renderRoot() {
  if (!state.session.auth) {
    if (state.session.needsSetup) {
      app.innerHTML = `
        <div class="gate">
          <form class="card wide" id="setupForm">
            ${langButtons()}
            <h1>${esc(t("setupTitle"))}</h1>
            <p>${esc(t("setupLead"))}</p>
            <ol class="guide">
              <li>${esc(t("guide1"))}</li>
              <li>${esc(t("guide2"))}</li>
              <li>${esc(t("guide3"))}</li>
              <li>${esc(t("guide4"))}</li>
            </ol>
            <label for="setupUser">${esc(t("userFixed"))}</label>
            <input id="setupUser" type="text" value="admin" readonly>
            <label for="setupPassword">${esc(t("password"))}</label>
            <input id="setupPassword" type="password" autocomplete="new-password" required minlength="8">
            <label for="setupConfirm">${esc(t("confirm"))}</label>
            <input id="setupConfirm" type="password" autocomplete="new-password" required minlength="8">
            <p class="err hidden" id="setupErr"></p>
            <div class="actions"><button class="btn primary" type="submit">${esc(t("create"))}</button></div>
          </form>
        </div>`;
      document.getElementById("setupForm").addEventListener("submit", onSetup);
      bindLang(app);
      return;
    }
    if (state.session.needTotp) {
      app.innerHTML = `
        <div class="gate">
          <form class="card" id="totpForm">
            ${langButtons()}
            <p>${esc(t("totpLead"))}</p>
            <label for="totpLogin">${esc(t("totpCode"))}</label>
            <input id="totpLogin" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9 ]*" required>
            <p class="err hidden" id="loginErr"></p>
            <div class="actions"><button class="btn primary" type="submit">${esc(t("totpContinue"))}</button></div>
          </form>
        </div>`;
      document.getElementById("totpForm").addEventListener("submit", onTotp);
      bindLang(app);
      return;
    }
    app.innerHTML = `
      <div class="gate">
        <form class="card" id="loginForm">
          ${langButtons()}
          <p>${esc(t("protected"))}</p>
          <label for="loginUser">${esc(t("userFixed"))}</label>
          <input id="loginUser" type="text" value="admin" autocomplete="username" required>
          <label for="password">${esc(t("password"))}</label>
          <input id="password" type="password" autocomplete="current-password" required>
          <p class="err hidden" id="loginErr"></p>
          <div class="actions"><button class="btn primary" type="submit">${esc(t("signIn"))}</button></div>
        </form>
      </div>`;
    document.getElementById("loginForm").addEventListener("submit", onLogin);
    bindLang(app);
    return;
  }
  if (!document.getElementById("shell")) {
    app.innerHTML = shellHtml();
    bindShell();
  }
  applyTab();
  paintStatus();
  if (!state.buckets.length) loadBuckets();
  else if (state.tab === "expert") {
    paintExpertPicker();
    refreshExpert();
  }
}

function bindLang(root) {
  root.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  });
}

function captureUi() {
  const search = document.getElementById("search");
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const flux = document.getElementById("fluxInput");
  if (search) state.search = search.value;
  if (from) state.from = from.value;
  if (to) state.to = to.value;
  if (flux) state.fluxDraft = flux.value;
}

function setLang(lang) {
  if (lang !== "de" && lang !== "en") return;
  if (lang === state.lang && document.getElementById("shell")) return;
  captureUi();
  state.lang = lang;
  saveUi();
  document.documentElement.lang = lang;
  app.innerHTML = "";
  renderRoot();
  if (!state.session || !state.session.auth || !state.buckets.length) return;
  paintBuckets();
  paintMeasurements();
  const title = document.getElementById("measTitle");
  if (title && state.measurement) title.textContent = state.measurement;
  if (state.fields.length) paintFields();
  if (state.tags.length) paintTags();
  if (state.points.length) paintResult();
  if (state.qRows.length) paintFluxTable();
  const search = document.getElementById("search");
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const flux = document.getElementById("fluxInput");
  if (search) search.value = state.search || "";
  if (from) from.value = state.from || "";
  if (to) to.value = state.to || "";
  if (flux && state.fluxDraft) flux.value = state.fluxDraft;
  applyTab();
  if (state.tab === "expert") {
    paintExpertPicker();
    const empty = document.getElementById("expertEmpty");
    if (empty && !state.expert.series.length) empty.textContent = t("expertEmpty");
  }
  requestAnimationFrame(drawCharts);
}

function applyTab() {
  const shell = document.getElementById("shell");
  if (!shell) return;
  shell.classList.toggle("expert-mode", state.tab === "expert");
  document.getElementById("browseView")?.classList.toggle("hidden", state.tab !== "browse");
  document.getElementById("fluxView")?.classList.toggle("hidden", state.tab !== "flux");
  document.getElementById("expertView")?.classList.toggle("hidden", state.tab !== "expert");
  document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item.dataset.tab === state.tab));
}

function shellHtml() {
  const rangeButtons = RANGES.map(([id]) => `<button type="button" class="btn tiny ${!state.useCustom && state.range === id ? "active" : ""}" data-range="${id}">${esc(t("range" + id))}</button>`).join("");
  const everyOptions = EVERY.map((value) => `<option ${value === state.every ? "selected" : ""}>${value}</option>`).join("");
  const expertEvery = EVERY.map((value) => `<option ${value === state.expert.every ? "selected" : ""}>${value}</option>`).join("");
  const expertRanges = RANGES.map(([id]) => `<button type="button" class="btn tiny ${!state.expert.useCustom && state.expert.range === id ? "active" : ""}" data-expert-range="${id}">${esc(t("range" + id))}</button>`).join("");
  const limits = [500, 1000, 4000, 8000].map((value) => `<option ${Number(state.limit) === value ? "selected" : ""}>${value}</option>`).join("");
  const agg = (value) => state.aggregate === value ? "selected" : "";
  const expertAgg = (value) => state.expert.aggregate === value ? "selected" : "";
  const expertDraw = (value) => state.expert.draw === value ? "selected" : "";
  const expertScale = (value) => state.expert.scale === value ? "selected" : "";
  const fluxValue = esc(state.fluxDraft || 'from(bucket: "solar")\n  |> range(start: -6h)\n  |> limit(n: 200)');
  return `
    <div class="shell ${state.tab === "expert" ? "expert-mode" : ""}" id="shell">
      <header class="top">
        <div class="brand">
          <strong>Influx Browser</strong>
          <span>${esc(t("subtitle"))}</span>
        </div>
        <div class="status" id="status">${esc(t("connecting"))}</div>
        <div class="spacer"></div>
        ${langButtons()}
        <div class="tabs">
          <button type="button" class="btn tiny ${state.tab === "browse" ? "active" : ""}" data-tab="browse">${esc(t("data"))}</button>
          <button type="button" class="btn tiny ${state.tab === "flux" ? "active" : ""}" data-tab="flux">Flux</button>
          <button type="button" class="btn tiny ${state.tab === "expert" ? "active" : ""}" data-tab="expert">${esc(t("expert"))}</button>
          <button type="button" class="btn tiny" id="settingsBtn">${esc(t("settings"))}</button>
          <button type="button" class="btn tiny hidden" id="logoutBtn">${esc(t("logout"))}</button>
        </div>
      </header>
      <aside class="nav" id="navPane" data-zoom="nav">
        <div class="nav-head">
          <select id="bucket"></select>
          <input id="search" type="text" placeholder="${esc(t("search"))}" value="${esc(state.search || "")}">
          <label class="check"><input id="showSystem" type="checkbox" ${state.showSystem ? "checked" : ""}> ${esc(t("systemBuckets"))}</label>
        </div>
        <div class="measures" id="measures"><div class="empty">${esc(t("loading"))}</div></div>
      </aside>
      <div class="splitter v" id="splitNav" data-zoom="nav" role="separator" aria-orientation="vertical"></div>
      <main class="stage">
        <section id="browseView" class="${state.tab === "browse" ? "" : "hidden"}">
          <div class="title-row">
            <h2 id="measTitle">${esc(state.measurement || "Measurement")}</h2>
            <div class="meta" id="resultMeta"></div>
          </div>
          <p class="zoom-hint">${esc(t("zoomHint"))}</p>
          <div class="toolbar">
            <div class="field"><span>${esc(t("range"))}</span><div class="row" id="ranges">${rangeButtons}</div></div>
            <div class="field"><span>${esc(t("from"))}</span><input id="from" type="datetime-local" value="${esc(state.from || "")}"></div>
            <div class="field"><span>${esc(t("to"))}</span><input id="to" type="datetime-local" value="${esc(state.to || "")}"></div>
            <div class="field"><span>&nbsp;</span><button type="button" class="btn tiny" id="applyCustom">${esc(t("applyRange"))}</button></div>
            <div class="field"><span>${esc(t("aggregation"))}</span>
              <select id="aggregate">
                <option value="none" ${agg("none")}>${esc(t("raw"))}</option>
                <option value="mean" ${agg("mean")}>${esc(t("mean"))}</option>
                <option value="max" ${agg("max")}>${esc(t("maximum"))}</option>
                <option value="min" ${agg("min")}>${esc(t("minimum"))}</option>
                <option value="minmax" ${agg("minmax")}>${esc(t("minmax"))}</option>
                <option value="last" ${agg("last")}>${esc(t("last"))}</option>
              </select>
            </div>
            <div class="field"><span>${esc(t("window"))}</span><select id="every">${everyOptions}</select></div>
            <div class="field"><span>Limit</span>
              <select id="limit">${limits}</select>
            </div>
            <div class="field"><span>&nbsp;</span><button type="button" class="btn primary tiny" id="reload">${esc(t("refresh"))}</button></div>
            <div class="field"><span>&nbsp;</span><button type="button" class="btn tiny" id="csv">CSV</button></div>
          </div>
          <div id="tagRow" class="chips"></div>
          <div id="fieldRow" class="chips"></div>
          <p class="err hidden" id="browseErr"></p>
          <div class="panel zoom-pane" id="chartPane" data-zoom="chart">
            <div class="pane-bar"><span>${esc(t("chart"))}</span></div>
            <div class="chart-wrap" id="chartWrap">
              <canvas id="chart"></canvas>
              <div id="tip" class="tooltip hidden"></div>
            </div>
            <div class="legend" id="legend"></div>
          </div>
          <div class="splitter h" id="splitChart" data-zoom="chart" role="separator" aria-orientation="horizontal"></div>
          <div class="panel table-wrap zoom-pane" id="tablePane" data-zoom="table"></div>
          <details>
            <summary>${esc(t("fluxQuery"))}</summary>
            <pre class="query" id="fluxPreview"></pre>
          </details>
        </section>
        <section id="fluxView" class="${state.tab === "flux" ? "" : "hidden"}">
          <div class="title-row"><h2>Flux</h2><button type="button" class="btn primary tiny" id="runFlux">${esc(t("run"))}</button></div>
          <div class="flux-layout" id="fluxLayout">
            <textarea id="fluxInput" data-zoom="flux">${fluxValue}</textarea>
            <div class="splitter v" id="splitFlux" data-zoom="flux" role="separator" aria-orientation="vertical"></div>
            <div>
              <p class="err hidden" id="fluxErr"></p>
              <div class="panel table-wrap" id="fluxTable" data-zoom="table"></div>
            </div>
          </div>
        </section>
        <section id="expertView" class="${state.tab === "expert" ? "" : "hidden"}">
          <div class="expert-bar" title="${esc(t("expertZoomHint"))}">
            <div class="expert-row">
              <div class="row expert-step">
                <button type="button" class="btn tiny" id="expertMinus" title="${esc(t("expertShiftBack"))}">−</button>
                <div class="row" id="expertRanges">${expertRanges}</div>
                <button type="button" class="btn tiny" id="expertPlus" title="${esc(t("expertShiftFwd"))}">+</button>
              </div>
              <input id="expertFrom" type="datetime-local" value="${esc(state.expert.from || "")}" title="${esc(t("from"))}">
              <input id="expertTo" type="datetime-local" value="${esc(state.expert.to || "")}" title="${esc(t("to"))}">
              <button type="button" class="btn tiny" id="expertApplyCustom">${esc(t("applyRange"))}</button>
              <select id="expertAggregate" title="${esc(t("aggregation"))}">
                <option value="none" ${expertAgg("none")}>${esc(t("raw"))}</option>
                <option value="mean" ${expertAgg("mean")}>${esc(t("mean"))}</option>
                <option value="max" ${expertAgg("max")}>${esc(t("maximum"))}</option>
                <option value="min" ${expertAgg("min")}>${esc(t("minimum"))}</option>
                <option value="minmax" ${expertAgg("minmax")}>${esc(t("minmax"))}</option>
                <option value="last" ${expertAgg("last")}>${esc(t("last"))}</option>
              </select>
              <select id="expertEvery" title="${esc(t("window"))}">${expertEvery}</select>
              <select id="expertDraw" title="${esc(t("chart"))}">
                <option value="line" ${expertDraw("line")}>${esc(t("expertLines"))}</option>
                <option value="point" ${expertDraw("point")}>${esc(t("expertPoints"))}</option>
                <option value="both" ${expertDraw("both")}>${esc(t("expertBoth"))}</option>
              </select>
              <select id="expertScale" title="Y">
                <option value="linear" ${expertScale("linear")}>${esc(t("expertLinear"))}</option>
                <option value="log" ${expertScale("log")}>${esc(t("expertLog"))}</option>
              </select>
              <button type="button" class="btn primary tiny" id="expertReload">${esc(t("refresh"))}</button>
            </div>
            <div class="expert-row">
              <select id="expertBucket" title="Bucket"></select>
              <select id="expertMeasurement" title="Measurement"></select>
              <select id="expertField" title="${esc(t("field"))}"></select>
              <button type="button" class="btn primary tiny" id="expertAdd">${esc(t("expertAdd"))}</button>
              <div class="chips expert-series" id="expertSeries"></div>
            </div>
            <p class="err hidden" id="expertErr"></p>
          </div>
          <div class="panel expert-chart" id="expertChartPane">
            <div class="chart-wrap" id="expertChartWrap">
              <canvas id="expertChart"></canvas>
              <div id="expertSelect" class="expert-select hidden"></div>
              <div id="expertTip" class="tooltip hidden"></div>
              <div class="expert-empty hidden" id="expertEmpty">${esc(t("expertEmpty"))}</div>
            </div>
            <div class="legend" id="expertLegend"></div>
          </div>
        </section>
      </main>
    </div>
    <dialog id="settings">
      <form method="dialog" id="settingsForm">
        <h3>${esc(t("connection"))}</h3>
        <p class="meta">${esc(t("settingsHelp"))}</p>
        <label>URL</label>
        <input id="cfgUrl" type="text" required>
        <label>${esc(t("org"))}</label>
        <input id="cfgOrg" type="text" required>
        <label>${esc(t("token"))}</label>
        <input id="cfgToken" type="password" autocomplete="off" placeholder="${esc(t("tokenKeep"))}">
        <label>${esc(t("userFixed"))}</label>
        <input type="text" value="admin" readonly>
        <label>${esc(t("accessPassword"))}</label>
        <input id="cfgPass" type="password" autocomplete="new-password" placeholder="${esc(t("passwordHint"))}">
        <h3>${esc(t("totpTitle"))}</h3>
        <p class="meta" id="totpHelp"></p>
        <div id="totpBox"></div>
        <p class="err hidden" id="totpErr"></p>
        <p class="err hidden" id="cfgErr"></p>
        <p class="meta hidden" id="cfgOk"></p>
        <div class="actions">
          <button type="button" class="btn" id="cfgClose">${esc(t("close"))}</button>
          <button type="submit" class="btn primary" value="save">${esc(t("save"))}</button>
        </div>
      </form>
    </dialog>`;
}

function bindShell() {
  document.getElementById("bucket").addEventListener("change", async (event) => {
    state.bucket = event.target.value;
    state.measurement = "";
    state.selected = new Set();
    state.tagFilter = {};
    saveUi();
    await loadMeasurements();
  });
  document.getElementById("search").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    saveUi();
    paintMeasurements();
  });
  document.getElementById("showSystem").addEventListener("change", async (event) => {
    state.showSystem = event.target.checked;
    saveUi();
    const previous = state.bucket;
    paintBuckets();
    if (state.bucket !== previous) await loadMeasurements();
  });
  document.getElementById("ranges").addEventListener("click", (event) => {
    const button = event.target.closest("[data-range]");
    if (!button) return;
    state.useCustom = false;
    state.range = button.dataset.range;
    state.every = suggestedEvery(state.range);
    document.getElementById("every").value = state.every;
    saveUi();
    for (const item of document.querySelectorAll("[data-range]")) item.classList.toggle("active", item === button);
    browse();
  });
  document.getElementById("applyCustom").addEventListener("click", () => {
    state.useCustom = true;
    state.from = document.getElementById("from").value;
    state.to = document.getElementById("to").value;
    document.querySelectorAll("[data-range]").forEach((item) => item.classList.remove("active"));
    saveUi();
    browse();
  });
  document.getElementById("aggregate").addEventListener("change", (event) => {
    state.aggregate = event.target.value;
    document.getElementById("every").disabled = state.aggregate === "none";
    saveUi();
    browse();
  });
  document.getElementById("every").addEventListener("change", (event) => {
    state.every = event.target.value;
    saveUi();
    if (state.aggregate !== "none") browse();
  });
  document.getElementById("limit").addEventListener("change", (event) => {
    state.limit = Number(event.target.value);
    saveUi();
    browse();
  });
  document.getElementById("reload").addEventListener("click", () => browse());
  document.getElementById("csv").addEventListener("click", downloadCsv);
  document.getElementById("fieldRow").addEventListener("change", (event) => {
    const box = event.target.closest("input[data-field]");
    if (!box) return;
    if (box.checked) state.selected.add(box.dataset.field);
    else state.selected.delete(box.dataset.field);
    saveUi();
    browse();
  });
  document.getElementById("tagRow").addEventListener("change", (event) => {
    const select = event.target.closest("select[data-tag]");
    if (!select) return;
    state.tagFilter[select.dataset.tag] = select.value;
    saveUi();
    browse();
  });
  document.querySelector(".tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-tab]");
    if (!button) return;
    state.tab = button.dataset.tab;
    saveUi();
    applyTab();
    if (state.tab === "expert") {
      paintExpertPicker();
      refreshExpert();
    } else if (state.tab === "browse") {
      if (!state.measurements.length && state.bucket) loadMeasurements();
      else requestAnimationFrame(drawCharts);
    }
  });
  bindExpert();
  document.getElementById("runFlux").addEventListener("click", runFlux);
  document.getElementById("fluxInput").addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runFlux();
  });
  document.getElementById("fluxInput").addEventListener("input", saveUi);
  document.getElementById("from").addEventListener("change", saveUi);
  document.getElementById("to").addEventListener("change", saveUi);
  document.getElementById("settingsBtn").addEventListener("click", openSettings);
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await api("logout", { method: "POST" });
    state.buckets = [];
    state.session = await api("session");
    app.innerHTML = "";
    renderRoot();
  });
  document.getElementById("cfgClose").addEventListener("click", () => document.getElementById("settings").close());
  document.getElementById("settingsForm").addEventListener("submit", saveSettings);
  const canvas = document.getElementById("chart");
  canvas.addEventListener("mousemove", (event) => onChartMove(event, "tip", () => chartBounds, chartSeries));
  canvas.addEventListener("mouseleave", () => document.getElementById("tip").classList.add("hidden"));
  const expertCanvas = document.getElementById("expertChart");
  expertCanvas.addEventListener("mousemove", (event) => onChartMove(event, "expertTip", () => expertChartBounds, expertChartSeries));
  expertCanvas.addEventListener("mouseleave", () => document.getElementById("expertTip").classList.add("hidden"));
  if (!window.__ibResize) {
    window.__ibResize = () => drawCharts();
    window.addEventListener("resize", window.__ibResize);
  }
  document.getElementById("every").disabled = state.aggregate === "none";
  bindLang(document.getElementById("shell").parentElement);
  bindSplitters();
  bindZoom();
  applyLayout();
}

function saveLayout() {
  saveUi();
}

function applyLayout() {
  const root = document.documentElement;
  root.style.setProperty("--nav-w", layout.nav + "px");
  root.style.setProperty("--chart-h", layout.chart + "px");
  root.style.setProperty("--table-h", layout.table + "px");
  root.style.setProperty("--flux-w", layout.flux + "px");
  requestAnimationFrame(drawCharts);
}

function bindExpert() {
  document.getElementById("expertRanges").addEventListener("click", (event) => {
    const button = event.target.closest("[data-expert-range]");
    if (!button) return;
    state.expert.useCustom = false;
    state.expert.range = button.dataset.expertRange;
    state.expert.every = suggestedEvery(state.expert.range);
    document.getElementById("expertEvery").value = state.expert.every;
    document.querySelectorAll("[data-expert-range]").forEach((item) => item.classList.toggle("active", item === button));
    expertViewZoom = null;
    saveUi();
    refreshExpert();
  });
  document.getElementById("expertMinus").addEventListener("click", () => shiftExpertWindow(-1));
  document.getElementById("expertPlus").addEventListener("click", () => shiftExpertWindow(1));
  document.getElementById("expertApplyCustom").addEventListener("click", () => {
    state.expert.useCustom = true;
    state.expert.from = document.getElementById("expertFrom").value;
    state.expert.to = document.getElementById("expertTo").value;
    document.querySelectorAll("[data-expert-range]").forEach((item) => item.classList.remove("active"));
    expertViewZoom = null;
    saveUi();
    refreshExpert();
  });
  document.getElementById("expertAggregate").addEventListener("change", (event) => {
    state.expert.aggregate = event.target.value;
    document.getElementById("expertEvery").disabled = state.expert.aggregate === "none";
    saveUi();
    refreshExpert();
  });
  document.getElementById("expertEvery").addEventListener("change", (event) => {
    state.expert.every = event.target.value;
    saveUi();
    if (state.expert.aggregate !== "none") refreshExpert();
  });
  document.getElementById("expertDraw").addEventListener("change", (event) => {
    state.expert.draw = event.target.value;
    saveUi();
    drawCharts();
  });
  document.getElementById("expertScale").addEventListener("change", (event) => {
    state.expert.scale = event.target.value;
    saveUi();
    drawCharts();
  });
  document.getElementById("expertReload").addEventListener("click", () => {
    expertViewZoom = null;
    refreshExpert();
  });
  document.getElementById("expertFrom").addEventListener("change", saveUi);
  document.getElementById("expertTo").addEventListener("change", saveUi);
  document.getElementById("expertBucket").addEventListener("change", async (event) => {
    state.expertPick.bucket = event.target.value;
    state.expertPick.measurement = "";
    state.expertPick.field = "";
    await loadExpertMeasurements();
  });
  document.getElementById("expertMeasurement").addEventListener("change", async (event) => {
    state.expertPick.measurement = event.target.value;
    state.expertPick.field = "";
    await loadExpertFields();
  });
  document.getElementById("expertField").addEventListener("change", (event) => {
    state.expertPick.field = event.target.value;
  });
  document.getElementById("expertAdd").addEventListener("click", addExpertSeries);
  document.getElementById("expertSeries").addEventListener("click", (event) => {
    const button = event.target.closest("[data-expert-remove]");
    if (!button) return;
    const index = Number(button.dataset.expertRemove);
    if (!Number.isInteger(index) || index < 0) return;
    state.expert.series.splice(index, 1);
    saveUi();
    paintExpertSeries();
    refreshExpert();
  });
  document.getElementById("expertSeries").addEventListener("input", (event) => {
    const input = event.target.closest("input[data-expert-color]");
    if (!input) return;
    const index = Number(input.dataset.expertColor);
    if (!Number.isInteger(index) || !state.expert.series[index]) return;
    const color = String(input.value || "").toLowerCase();
    if (!/^#[0-9a-f]{6}$/.test(color)) return;
    state.expert.series[index].color = color;
    if (expertChartSeries[index]) expertChartSeries[index].color = color;
    saveUi();
    paintExpertLegend();
    drawCharts();
  });
  document.getElementById("expertSeries").addEventListener("change", (event) => {
    const select = event.target.closest("select[data-expert-axis]");
    if (!select) return;
    const index = Number(select.dataset.expertAxis);
    const axis = Number(select.value);
    if (!Number.isInteger(index) || !state.expert.series[index] || ![1, 2, 3, 4].includes(axis)) return;
    state.expert.series[index].axis = axis;
    if (expertChartSeries[index]) expertChartSeries[index].axis = axis;
    expertViewZoom = null;
    saveUi();
    paintExpertLegend();
    drawCharts();
  });
  document.getElementById("expertEvery").disabled = state.expert.aggregate === "none";
  bindExpertChartNav();
}

function rangeToMs(range) {
  const match = String(range || "").match(/^(\d+)(h|d)$/);
  if (!match) return 3600 * 1000;
  const n = Number(match[1]);
  return match[2] === "d" ? n * 86400000 : n * 3600000;
}

function toLocalInput(ms) {
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function expertWindowMs() {
  if (state.expert.useCustom) {
    const start = Date.parse(toUtc(document.getElementById("expertFrom")?.value || state.expert.from));
    const stopRaw = toUtc(document.getElementById("expertTo")?.value || state.expert.to);
    const stop = stopRaw ? Date.parse(stopRaw) : Date.now();
    if (!Number.isNaN(start) && !Number.isNaN(stop) && stop > start) return { start, stop };
  }
  const stop = Date.now();
  return { start: stop - rangeToMs(state.expert.range), stop };
}

function shiftExpertWindow(dir) {
  const step = rangeToMs(state.expert.range);
  const window = expertWindowMs();
  let start = window.start + dir * step;
  let stop = window.stop + dir * step;
  const now = Date.now();
  if (stop > now) {
    const shift = stop - now;
    start -= shift;
    stop -= shift;
  }
  if (stop <= start) return;
  state.expert.useCustom = true;
  state.expert.from = toLocalInput(start);
  state.expert.to = toLocalInput(stop);
  const from = document.getElementById("expertFrom");
  const to = document.getElementById("expertTo");
  if (from) from.value = state.expert.from;
  if (to) to.value = state.expert.to;
  document.querySelectorAll("[data-expert-range]").forEach((item) => item.classList.remove("active"));
  expertViewZoom = null;
  saveUi();
  refreshExpert();
}

function bindExpertChartNav() {
  const canvas = document.getElementById("expertChart");
  const selectBox = document.getElementById("expertSelect");
  if (!canvas || !selectBox || canvas.dataset.navBound === "1") return;
  canvas.dataset.navBound = "1";
  canvas.addEventListener("wheel", (event) => {
    if (state.tab !== "expert" || !expertChartBounds) return;
    event.preventDefault();
    const bounds = expertChartBounds;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const plot = bounds.width - bounds.pad.l - bounds.pad.r;
    if (x < bounds.pad.l || x > bounds.width - bounds.pad.r || plot <= 0) return;
    const ratio = (x - bounds.pad.l) / plot;
    const span = bounds.maxT - bounds.minT;
    const next = Math.max(1000, span * (event.deltaY < 0 ? 0.8 : 1.25));
    const center = bounds.minT + ratio * span;
    let minT = center - next * ratio;
    let maxT = center + next * (1 - ratio);
    const full = expertDataExtent();
    if (full) {
      minT = Math.max(full.minT, minT);
      maxT = Math.min(full.maxT, maxT);
      if (maxT - minT < 1000) {
        const mid = (minT + maxT) / 2;
        minT = mid - 500;
        maxT = mid + 500;
      }
    }
    expertViewZoom = { minT, maxT, y: expertViewZoom?.y || null };
    drawCharts();
  }, { passive: false });
  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || state.tab !== "expert" || !expertChartBounds) return;
    const rect = canvas.getBoundingClientRect();
    expertSelectDrag = {
      x0: event.clientX - rect.left,
      y0: event.clientY - rect.top,
      x1: event.clientX - rect.left,
      y1: event.clientY - rect.top,
    };
    document.getElementById("expertTip")?.classList.add("hidden");
    try { canvas.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
    paintExpertSelect();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!expertSelectDrag) return;
    const rect = canvas.getBoundingClientRect();
    expertSelectDrag.x1 = event.clientX - rect.left;
    expertSelectDrag.y1 = event.clientY - rect.top;
    paintExpertSelect();
  });
  const endSelect = (event) => {
    if (!expertSelectDrag || !expertChartBounds) {
      expertSelectDrag = null;
      paintExpertSelect();
      return;
    }
    const drag = expertSelectDrag;
    expertSelectDrag = null;
    paintExpertSelect();
    const left = Math.min(drag.x0, drag.x1);
    const right = Math.max(drag.x0, drag.x1);
    const top = Math.min(drag.y0, drag.y1);
    const bottom = Math.max(drag.y0, drag.y1);
    if (right - left < 12 || bottom - top < 12) return;
    applyExpertBoxZoom(left, right, top, bottom);
  };
  canvas.addEventListener("pointerup", endSelect);
  canvas.addEventListener("pointercancel", () => {
    expertSelectDrag = null;
    paintExpertSelect();
  });
  canvas.addEventListener("dblclick", () => {
    expertViewZoom = null;
    drawCharts();
  });
}

function paintExpertSelect() {
  const box = document.getElementById("expertSelect");
  if (!box) return;
  if (!expertSelectDrag) {
    box.classList.add("hidden");
    return;
  }
  const left = Math.min(expertSelectDrag.x0, expertSelectDrag.x1);
  const top = Math.min(expertSelectDrag.y0, expertSelectDrag.y1);
  const width = Math.abs(expertSelectDrag.x1 - expertSelectDrag.x0);
  const height = Math.abs(expertSelectDrag.y1 - expertSelectDrag.y0);
  box.style.left = left + "px";
  box.style.top = top + "px";
  box.style.width = width + "px";
  box.style.height = height + "px";
  box.classList.remove("hidden");
}

function applyExpertBoxZoom(left, right, top, bottom) {
  const bounds = expertChartBounds;
  if (!bounds) return;
  const plotW = bounds.width - bounds.pad.l - bounds.pad.r;
  const plotH = bounds.height - bounds.pad.t - bounds.pad.b;
  if (plotW <= 0 || plotH <= 0) return;
  const clampX = (x) => Math.min(bounds.width - bounds.pad.r, Math.max(bounds.pad.l, x));
  const clampY = (y) => Math.min(bounds.height - bounds.pad.b, Math.max(bounds.pad.t, y));
  const x0 = clampX(left);
  const x1 = clampX(right);
  const y0 = clampY(top);
  const y1 = clampY(bottom);
  if (x1 - x0 < 8 || y1 - y0 < 8) return;
  let minT = bounds.minT + ((x0 - bounds.pad.l) / plotW) * (bounds.maxT - bounds.minT);
  let maxT = bounds.minT + ((x1 - bounds.pad.l) / plotW) * (bounds.maxT - bounds.minT);
  if (maxT - minT < 1000) {
    const mid = (minT + maxT) / 2;
    minT = mid - 500;
    maxT = mid + 500;
  }
  const yZoom = {};
  const axes = bounds.axes || {};
  for (const [id, axis] of Object.entries(axes)) {
    const high = valueFromAxisY(y0, axis, bounds);
    const low = valueFromAxisY(y1, axis, bounds);
    let minV = Math.min(low, high);
    let maxV = Math.max(low, high);
    if (!(maxV > minV)) continue;
    if (bounds.scale === "log") {
      if (!(minV > 0)) minV = axis.minV;
      if (!(maxV > 0)) maxV = axis.maxV;
    }
    yZoom[id] = { minV, maxV };
  }
  expertViewZoom = { minT, maxT, y: Object.keys(yZoom).length ? yZoom : null };
  drawCharts();
}

function valueFromAxisY(y, axis, bounds) {
  const plotH = bounds.height - bounds.pad.t - bounds.pad.b;
  const t = 1 - (y - bounds.pad.t) / plotH;
  if (bounds.scale === "log") {
    const logMin = Math.log10(axis.minV);
    const logMax = Math.log10(axis.maxV);
    return 10 ** (logMin + t * (logMax - logMin));
  }
  return axis.minV + t * (axis.maxV - axis.minV);
}

function expertDataExtent() {
  let minT = Infinity;
  let maxT = -Infinity;
  for (const series of expertChartSeries) {
    if (series.hidden) continue;
    for (const point of series.points) {
      minT = Math.min(minT, point.t);
      maxT = Math.max(maxT, point.t);
    }
  }
  if (!Number.isFinite(minT) || !Number.isFinite(maxT) || maxT <= minT) return null;
  return { minT, maxT };
}

function expertSeriesKey(row) {
  return `${row.bucket}\0${row.measurement}\0${row.field}`;
}

function expertSeriesLabel(row) {
  return `${row.bucket} / ${row.measurement} · ${row.field}`;
}

function showExpertError(message) {
  const node = document.getElementById("expertErr");
  if (!node) return;
  node.textContent = message || "";
  node.classList.toggle("hidden", !message);
}

function paintExpertPicker() {
  const buckets = state.buckets.filter((bucket) => bucket.type === "user" || state.showSystem);
  const select = document.getElementById("expertBucket");
  if (!select) return;
  if (!buckets.some((bucket) => bucket.name === state.expertPick.bucket)) {
    state.expertPick.bucket = buckets[0]?.name || "";
  }
  select.innerHTML = buckets.map((bucket) => {
    const suffix = bucket.type === "system" ? " · " + t("system") : "";
    return `<option value="${esc(bucket.name)}" ${bucket.name === state.expertPick.bucket ? "selected" : ""}>${esc(bucket.name + suffix)}</option>`;
  }).join("");
  paintExpertSeries();
  loadExpertMeasurements();
}

async function loadExpertMeasurements() {
  const select = document.getElementById("expertMeasurement");
  const fieldSelect = document.getElementById("expertField");
  if (!select || !fieldSelect) return;
  select.innerHTML = "";
  fieldSelect.innerHTML = "";
  state.expertPick.measurements = [];
  state.expertPick.fields = [];
  if (!state.expertPick.bucket) return;
  try {
    const data = await api("measurements", { query: { bucket: state.expertPick.bucket } });
    state.expertPick.measurements = data.measurements || [];
    if (!state.expertPick.measurements.includes(state.expertPick.measurement)) {
      state.expertPick.measurement = state.expertPick.measurements.includes(state.expertPick.bucket)
        ? state.expertPick.bucket
        : (state.expertPick.measurements[0] || "");
    }
    select.innerHTML = state.expertPick.measurements.map((name) =>
      `<option value="${esc(name)}" ${name === state.expertPick.measurement ? "selected" : ""}>${esc(name)}</option>`
    ).join("");
    await loadExpertFields();
  } catch (error) {
    showExpertError(error.message);
  }
}

async function loadExpertFields() {
  const select = document.getElementById("expertField");
  if (!select) return;
  select.innerHTML = "";
  state.expertPick.fields = [];
  if (!state.expertPick.bucket || !state.expertPick.measurement) return;
  try {
    const data = await api("fields", {
      query: { bucket: state.expertPick.bucket, measurement: state.expertPick.measurement },
    });
    state.expertPick.fields = data.fields || [];
    if (!state.expertPick.fields.includes(state.expertPick.field)) {
      state.expertPick.field = state.expertPick.fields[0] || "";
    }
    select.innerHTML = state.expertPick.fields.map((name) =>
      `<option value="${esc(name)}" ${name === state.expertPick.field ? "selected" : ""}>${esc(name)}</option>`
    ).join("");
  } catch (error) {
    showExpertError(error.message);
  }
}

function paintExpertSeries() {
  const box = document.getElementById("expertSeries");
  if (!box) return;
  if (!state.expert.series.length) {
    box.innerHTML = `<span class="meta">${esc(t("expertSeries"))}: 0</span>`;
    return;
  }
  box.innerHTML = state.expert.series.map((row, index) => {
    const color = row.color || COLORS[index % COLORS.length];
    const axis = [1, 2, 3, 4].includes(Number(row.axis)) ? Number(row.axis) : 1;
    const axisOpts = [1, 2, 3, 4].map((n) =>
      `<option value="${n}" ${n === axis ? "selected" : ""}>Y${n}</option>`
    ).join("");
    return `
    <span class="chip expert-chip">
      <input type="color" value="${esc(color)}" data-expert-color="${index}" title="${esc(expertSeriesLabel(row))}">
      <span>${esc(expertSeriesLabel(row))}</span>
      <select data-expert-axis="${index}" title="${esc(t("expertAxis"))}">${axisOpts}</select>
      <button type="button" class="btn tiny" data-expert-remove="${index}" title="${esc(t("expertRemove"))}">×</button>
    </span>`;
  }).join("");
}

function addExpertSeries() {
  showExpertError("");
  const bucket = state.expertPick.bucket || document.getElementById("expertBucket")?.value || "";
  const measurement = state.expertPick.measurement || document.getElementById("expertMeasurement")?.value || "";
  const field = state.expertPick.field || document.getElementById("expertField")?.value || "";
  if (!bucket || !measurement || !field) {
    showExpertError(t("expertNeedField"));
    return;
  }
  if (state.expert.series.length >= 12) {
    showExpertError(t("expertMax"));
    return;
  }
  const next = {
    bucket,
    measurement,
    field,
    color: COLORS[state.expert.series.length % COLORS.length],
    axis: 1,
  };
  if (state.expert.series.some((row) => expertSeriesKey(row) === expertSeriesKey(next))) {
    showExpertError(t("expertDup"));
    return;
  }
  state.expert.series.push(next);
  saveUi();
  paintExpertSeries();
  refreshExpert();
}

function expertBrowseBody(row) {
  const body = {
    bucket: row.bucket,
    measurement: row.measurement,
    fields: [row.field],
    tags: {},
    aggregate: state.expert.aggregate,
    every: state.expert.every,
    limit: 4000,
  };
  if (state.expert.useCustom) {
    const start = toUtc(document.getElementById("expertFrom")?.value || state.expert.from);
    const stop = toUtc(document.getElementById("expertTo")?.value || state.expert.to);
    if (!start) throw new Error(t("needStart"));
    body.start = start;
    if (stop) body.stop = stop;
  } else {
    body.start = "-" + state.expert.range;
  }
  return body;
}

async function refreshExpert() {
  const empty = document.getElementById("expertEmpty");
  if (!state.expert.series.length) {
    expertChartSeries = [];
    expertViewZoom = null;
    if (empty) {
      empty.textContent = t("expertEmpty");
      empty.classList.remove("hidden");
    }
    paintExpertLegend();
    drawCharts();
    return;
  }
  if (empty) empty.classList.add("hidden");
  if (expertCtl) expertCtl.abort();
  expertCtl = new AbortController();
  showExpertError("");
  const button = document.getElementById("expertReload");
  if (button) button.textContent = t("loading");
  const hidden = new Map(expertChartSeries.map((series) => [series.name, series.hidden]));
  try {
    const results = await Promise.all(state.expert.series.map(async (row) => {
      const data = await api("browse", {
        method: "POST",
        body: expertBrowseBody(row),
        signal: expertCtl.signal,
      });
      const name = expertSeriesLabel(row);
      return {
        name,
        ...pointsFromBrowse(data.points || [], state.expert.aggregate === "minmax"),
        color: row.color || COLORS[0],
        axis: [1, 2, 3, 4].includes(Number(row.axis)) ? Number(row.axis) : 1,
        hidden: hidden.get(name) === true,
      };
    }));
    expertChartSeries = results;
    paintExpertLegend();
    drawCharts();
  } catch (error) {
    if (error.name === "AbortError") return;
    showExpertError(error.message);
  } finally {
    if (button) button.textContent = t("refresh");
  }
}

function paintExpertLegend() {
  const legend = document.getElementById("expertLegend");
  if (!legend) return;
  if (!expertChartSeries.length) {
    legend.innerHTML = "";
    return;
  }
  legend.innerHTML = expertChartSeries.map((series, index) => `
    <button type="button" class="btn tiny" data-expert-series="${index}" style="opacity:${series.hidden ? "0.35" : "1"}">
      <i class="swatch" style="background:${series.color}"></i>${esc(series.name)} · Y${series.axis || 1}
    </button>
  `).join("");
  legend.querySelectorAll("[data-expert-series]").forEach((button) => {
    button.addEventListener("click", () => {
      const series = expertChartSeries[Number(button.dataset.expertSeries)];
      series.hidden = !series.hidden;
      button.style.opacity = series.hidden ? "0.35" : "1";
      drawCharts();
    });
  });
}

function bindSplitters() {
  bindSplitter("splitNav", "x", (delta, origin) => {
    layout.nav = clamp(origin.nav + delta, 180, 560);
  });
  bindSplitter("splitChart", "y", (delta, origin) => {
    layout.chart = clamp(origin.chart + delta, 160, 760);
    layout.table = clamp(origin.table - delta, 140, 900);
  });
  bindSplitter("splitFlux", "x", (delta, origin) => {
    layout.flux = clamp(origin.flux + delta, 240, 820);
  });
}

function bindSplitter(id, axis, onDelta) {
  const handle = document.getElementById(id);
  if (!handle) return;
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    try { handle.setPointerCapture(event.pointerId); } catch (err) { /* synthetic events */ }
    handle.classList.add("drag");
    const start = axis === "x" ? event.clientX : event.clientY;
    const origin = { ...layout };
    const move = (ev) => {
      onDelta((axis === "x" ? ev.clientX : ev.clientY) - start, origin);
      applyLayout();
    };
    const up = () => {
      handle.classList.remove("drag");
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      saveLayout();
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
  });
  handle.addEventListener("dblclick", () => {
    if (id === "splitNav") layout.nav = defaults.nav;
    if (id === "splitChart") {
      layout.chart = defaults.chart;
      layout.table = defaults.table;
    }
    if (id === "splitFlux") layout.flux = defaults.flux;
    saveLayout();
    applyLayout();
  });
}

function bindZoom() {
  if (window.__ibZoom) return;
  window.__ibZoom = true;
  document.addEventListener("wheel", (event) => {
    const pane = event.target.closest("[data-zoom]");
    if (!pane) return;
    const scrolling = event.target.closest("textarea, .measures, .table-wrap");
    const onSplitter = event.target.closest(".splitter");
    if (scrolling && !event.altKey && !onSplitter) return;
    event.preventDefault();
    const key = pane.dataset.zoom;
    const grow = event.deltaY < 0;
    if (key === "nav") layout.nav = clamp(layout.nav + (grow ? 28 : -28), 180, 560);
    if (key === "chart") layout.chart = clamp(layout.chart + (grow ? 36 : -36), 160, 760);
    if (key === "table") layout.table = clamp(layout.table + (grow ? 40 : -40), 140, 900);
    if (key === "flux") layout.flux = clamp(layout.flux + (grow ? 32 : -32), 240, 820);
    saveLayout();
    applyLayout();
  }, { passive: false });
}

function paintStatus() {
  const org = state.session.org || t("noOrg");
  const count = state.buckets.length ? ` · ${visibleBuckets().length} ${t("buckets")}` : "";
  document.getElementById("status").innerHTML = `<b>admin</b> · <b>${esc(org)}</b> · ${esc(t("readToken"))}${esc(count)}`;
  document.getElementById("settingsBtn").classList.toggle("hidden", !state.session.canConfigure);
  document.getElementById("logoutBtn").classList.toggle("hidden", !state.session.auth);
}

function paintBuckets() {
  const select = document.getElementById("bucket");
  const buckets = visibleBuckets();
  if (!buckets.some((bucket) => bucket.name === state.bucket)) {
    state.bucket = buckets[0]?.name || "";
  }
  select.innerHTML = buckets.map((bucket) => {
    const suffix = bucket.type === "system" ? " · " + t("system") : "";
    return `<option value="${esc(bucket.name)}" ${bucket.name === state.bucket ? "selected" : ""}>${esc(bucket.name + suffix)}</option>`;
  }).join("");
}

async function loadBuckets() {
  try {
    const data = await api("buckets");
    state.buckets = data.buckets || [];
    if (!state.bucket || !state.buckets.some((bucket) => bucket.name === state.bucket)) {
      const users = state.buckets.filter((bucket) => bucket.type === "user");
      state.bucket = (users.find((bucket) => bucket.name === "solar") || users[0] || state.buckets[0])?.name || "";
    }
    paintBuckets();
    paintStatus();
    if (state.tab === "expert") {
      paintExpertPicker();
      await refreshExpert();
    } else {
      await loadMeasurements();
    }
  } catch (error) {
    document.getElementById("measures").innerHTML = `<div class="empty">${esc(error.message)}</div>`;
  }
}

async function loadMeasurements() {
  const box = document.getElementById("measures");
  box.innerHTML = `<div class="empty">${esc(t("loading"))}</div>`;
  if (!state.bucket) {
    box.innerHTML = `<div class="empty">${esc(t("noBucket"))}</div>`;
    return;
  }
  try {
    const data = await api("measurements", { query: { bucket: state.bucket } });
    state.measurements = data.measurements || [];
    if (!state.measurements.includes(state.measurement)) {
      state.measurement = state.measurements.includes(state.bucket) ? state.bucket : (state.measurements[0] || "");
    }
    paintMeasurements();
    if (state.measurement) await loadSchema();
    else clearResult(t("noMeasurements"));
  } catch (error) {
    box.innerHTML = `<div class="empty">${esc(error.message)}</div>`;
  }
}

function paintMeasurements() {
  const box = document.getElementById("measures");
  const items = state.measurements.filter((name) => name.toLowerCase().includes(state.search));
  if (!items.length) {
    box.innerHTML = `<div class="empty">${esc(t("nothing"))}</div>`;
    return;
  }
  box.innerHTML = items.map((name) => `<button type="button" data-meas="${esc(name)}" class="${name === state.measurement ? "on" : ""}">${esc(name)}</button>`).join("");
  box.querySelectorAll("[data-meas]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.measurement = button.dataset.meas;
      state.selected = new Set();
      state.tagFilter = {};
      saveUi();
      paintMeasurements();
      await loadSchema();
    });
  });
}

async function loadSchema() {
  document.getElementById("measTitle").textContent = state.measurement || "Measurement";
  document.getElementById("fieldRow").innerHTML = "";
  document.getElementById("tagRow").innerHTML = esc(t("loadingSchema"));
  try {
    const data = await api("fields", { query: { bucket: state.bucket, measurement: state.measurement } });
    const previousFields = state.selected;
    const previousTags = state.tagFilter;
    state.fields = data.fields || [];
    state.tags = data.tags || [];
    const kept = state.fields.filter((field) => previousFields.has(field));
    state.selected = new Set(kept.length ? kept : (state.fields.length <= 12 ? state.fields : state.fields.slice(0, 6)));
    const tags = {};
    for (const tag of state.tags) {
      if (typeof previousTags[tag] === "string" && previousTags[tag] !== "") tags[tag] = previousTags[tag];
    }
    state.tagFilter = tags;
    paintFields();
    await paintTags();
    saveUi();
    await browse();
  } catch (error) {
    showBrowseError(error.message);
  }
}

function paintFields() {
  const row = document.getElementById("fieldRow");
  if (!state.fields.length) {
    row.innerHTML = `<span class="meta">${esc(t("noFields"))}</span>`;
    return;
  }
  row.innerHTML = state.fields.map((field) => `
    <label class="chip"><input type="checkbox" data-field="${esc(field)}" ${state.selected.has(field) ? "checked" : ""}> ${esc(field)}</label>
  `).join("") + `<button type="button" class="btn tiny" id="allFields">${esc(t("all"))}</button><button type="button" class="btn tiny" id="noFields">${esc(t("none"))}</button>`;
  document.getElementById("allFields").addEventListener("click", () => {
    state.selected = new Set(state.fields);
    paintFields();
    saveUi();
    browse();
  });
  document.getElementById("noFields").addEventListener("click", () => {
    state.selected = new Set();
    paintFields();
    saveUi();
    browse();
  });
}

async function paintTags() {
  const row = document.getElementById("tagRow");
  if (!state.tags.length) {
    row.innerHTML = "";
    return;
  }
  row.innerHTML = `<span class="meta">${esc(t("tags"))}</span>`;
  for (const tag of state.tags) {
    let values = [];
    try {
      const data = await api("tagValues", { query: { bucket: state.bucket, measurement: state.measurement, tag } });
      values = data.values || [];
    } catch (error) {
      values = [];
    }
    if (state.tagFilter[tag] && !values.includes(state.tagFilter[tag])) delete state.tagFilter[tag];
    const options = [`<option value="">${esc(t("all"))}</option>`].concat(values.map((value) => `<option ${state.tagFilter[tag] === value ? "selected" : ""}>${esc(value)}</option>`)).join("");
    const label = document.createElement("label");
    label.className = "chip";
    label.innerHTML = `${esc(tag)} <select data-tag="${esc(tag)}">${options}</select>`;
    row.appendChild(label);
  }
}

function browseBody() {
  const body = {
    bucket: state.bucket,
    measurement: state.measurement,
    fields: [...state.selected],
    tags: Object.fromEntries(Object.entries(state.tagFilter).filter(([, value]) => value)),
    aggregate: state.aggregate,
    every: state.every,
    limit: state.limit,
  };
  if (state.useCustom) {
    const start = toUtc(document.getElementById("from").value);
    const stop = toUtc(document.getElementById("to").value);
    if (!start) throw new Error(t("needStart"));
    body.start = start;
    if (stop) body.stop = stop;
  } else {
    body.start = "-" + state.range;
  }
  return body;
}

function toUtc(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

async function browse() {
  if (!state.bucket || !state.measurement) return;
  if (browseCtl) browseCtl.abort();
  browseCtl = new AbortController();
  state.loading = true;
  document.getElementById("reload").textContent = t("loading");
  showBrowseError("");
  try {
    const data = await api("browse", { method: "POST", body: browseBody(), signal: browseCtl.signal });
    state.points = data.points || [];
    state.fluxText = data.flux || "";
    state.truncated = !!data.truncated;
    paintResult();
  } catch (error) {
    if (error.name === "AbortError") return;
    showBrowseError(error.message);
  } finally {
    state.loading = false;
    const button = document.getElementById("reload");
    if (button) button.textContent = t("refresh");
  }
}

function showBrowseError(message) {
  const node = document.getElementById("browseErr");
  node.textContent = message || "";
  node.classList.toggle("hidden", !message);
}

function clearResult(message) {
  state.points = [];
  document.getElementById("resultMeta").textContent = "";
  document.getElementById("tablePane").innerHTML = `<div class="empty">${esc(message)}</div>`;
  document.getElementById("legend").innerHTML = "";
  chartSeries = [];
  drawCharts();
}

function paintResult() {
  const pivoted = pivot(state.points);
  const numeric = state.points.filter((point) => typeof point.value === "number").length;
  const latest = state.points.reduce((max, point) => {
    const time = Date.parse(point.time);
    return Number.isNaN(time) ? max : Math.max(max, time);
  }, 0);
  const bits = [t("points", { n: state.points.length }), t("numeric", { n: numeric })];
  if (latest) bits.push(t("latest") + " " + fmtTime(latest));
  if (state.truncated) bits.push(t("limitHit"));
  document.getElementById("resultMeta").textContent = bits.join(" · ");
  document.getElementById("fluxPreview").textContent = state.fluxText;
  document.getElementById("measTitle").textContent = state.measurement;
  paintTable(pivoted);
  chartSeries = seriesFrom(state.points);
  paintLegend();
  drawCharts();
}

function pivot(points) {
  const tagKeys = [];
  const seenTags = new Set();
  const fields = [];
  const seenFields = new Set();
  const groups = new Map();
  for (const point of points) {
    const time = Date.parse(point.time);
    if (Number.isNaN(time)) continue;
    const tags = point.tags || {};
    const tagKey = Object.keys(tags).sort().map((key) => key + "=" + tags[key]).join("|");
    for (const key of Object.keys(tags)) {
      if (!seenTags.has(key)) {
        seenTags.add(key);
        tagKeys.push(key);
      }
    }
    const field = String(point.field ?? "");
    if (field && !seenFields.has(field)) {
      seenFields.add(field);
      fields.push(field);
    }
    const id = Math.floor(time / 1000) + "\n" + tagKey;
    if (!groups.has(id)) groups.set(id, { time: Math.floor(time / 1000) * 1000, tags, values: {} });
    groups.get(id).values[field] = point.value;
  }
  return {
    tagKeys,
    fields,
    rows: [...groups.values()].sort((a, b) => b.time - a.time),
  };
}

function paintTable(pivoted) {
  const wrap = document.getElementById("tablePane");
  if (!pivoted.rows.length) {
    wrap.innerHTML = `<div class="empty">${esc(t("noData"))}</div>`;
    return;
  }
  const head = [t("time"), ...pivoted.tagKeys, ...pivoted.fields].map((name) => `<th>${esc(name)}</th>`).join("");
  const body = pivoted.rows.map((row) => {
    const cells = [`<td>${esc(fmtTime(row.time))}</td>`];
    for (const key of pivoted.tagKeys) cells.push(`<td>${esc(row.tags[key] ?? "")}</td>`);
    for (const field of pivoted.fields) cells.push(`<td>${esc(fmtNum(row.values[field]))}</td>`);
    return `<tr>${cells.join("")}</tr>`;
  }).join("");
  wrap.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function pointsFromBrowse(rawPoints, asBand) {
  if (!asBand) {
    const points = rawPoints
      .filter((point) => typeof point.value === "number" && point.time)
      .map((point) => {
        const time = Date.parse(point.time);
        return Number.isNaN(time) ? null : { t: time, v: point.value };
      })
      .filter(Boolean)
      .sort((a, b) => a.t - b.t);
    return { points, band: false };
  }
  const map = new Map();
  for (const point of rawPoints) {
    if (typeof point.value !== "number" || !point.time) continue;
    const time = Date.parse(point.time);
    if (Number.isNaN(time)) continue;
    const band = point.band || point.tags?.band || "";
    if (!map.has(time)) map.set(time, { t: time, lo: null, hi: null });
    const row = map.get(time);
    if (band === "min") row.lo = point.value;
    else if (band === "max") row.hi = point.value;
    else {
      row.lo = row.lo == null ? point.value : Math.min(row.lo, point.value);
      row.hi = row.hi == null ? point.value : Math.max(row.hi, point.value);
    }
  }
  const points = [...map.values()]
    .filter((row) => typeof row.lo === "number" && typeof row.hi === "number")
    .map((row) => ({ t: row.t, lo: Math.min(row.lo, row.hi), hi: Math.max(row.lo, row.hi), v: (row.lo + row.hi) / 2 }))
    .sort((a, b) => a.t - b.t);
  return { points, band: true };
}

function seriesFrom(points) {
  if (state.aggregate === "minmax") {
    const byName = new Map();
    for (const point of points) {
      if (typeof point.value !== "number" || !point.time) continue;
      const time = Date.parse(point.time);
      if (Number.isNaN(time)) continue;
      const tags = Object.entries(point.tags || {})
        .filter(([key]) => key !== "band")
        .map(([key, value]) => key + "=" + value)
        .join(" ");
      const name = tags ? `${point.field} ${tags}` : String(point.field);
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push(point);
    }
    return [...byName.entries()].map(([name, rows], index) => {
      const built = pointsFromBrowse(rows, true);
      return {
        name,
        points: built.points,
        band: true,
        color: COLORS[index % COLORS.length],
        hidden: false,
        axis: 1,
      };
    });
  }
  const map = new Map();
  for (const point of points) {
    if (typeof point.value !== "number" || !point.time) continue;
    const time = Date.parse(point.time);
    if (Number.isNaN(time)) continue;
    const tags = Object.entries(point.tags || {}).map(([key, value]) => key + "=" + value).join(" ");
    const name = tags ? `${point.field} ${tags}` : String(point.field);
    if (!map.has(name)) map.set(name, []);
    map.get(name).push({ t: time, v: point.value });
  }
  return [...map.entries()].map(([name, pointsOfSeries], index) => {
    pointsOfSeries.sort((a, b) => a.t - b.t);
    return { name, points: pointsOfSeries, band: false, color: COLORS[index % COLORS.length], hidden: false, axis: 1 };
  });
}

function paintLegend() {
  const legend = document.getElementById("legend");
  if (!chartSeries.length) {
    legend.innerHTML = `<span class="meta">${esc(t("noNumeric"))}</span>`;
    return;
  }
  legend.innerHTML = chartSeries.map((series, index) => `
    <button type="button" class="btn tiny" data-series="${index}"><i class="swatch" style="background:${series.color}"></i>${esc(series.name)}</button>
  `).join("");
  legend.querySelectorAll("[data-series]").forEach((button) => {
    button.addEventListener("click", () => {
      const series = chartSeries[Number(button.dataset.series)];
      series.hidden = !series.hidden;
      button.style.opacity = series.hidden ? "0.35" : "1";
      drawCharts();
    });
  });
}

function drawCharts() {
  chartBounds = paintCanvas("chart", chartSeries, { draw: "line", scale: "linear", multiAxis: false });
  expertChartBounds = paintCanvas("expertChart", expertChartSeries, {
    draw: state.expert.draw === "point" || state.expert.draw === "both" || state.expert.draw === "line" ? state.expert.draw : "line",
    scale: state.expert.scale === "log" ? "log" : "linear",
    view: expertViewZoom,
    multiAxis: true,
  });
}

function expandValueRange(minV, maxV, scale) {
  if (scale === "log") {
    if (!(minV > 0) || !(maxV > 0)) return null;
    if (minV === maxV) return { minV: minV * 0.5, maxV: maxV * 2 };
    return { minV, maxV };
  }
  if (minV === maxV) return { minV: minV - 1, maxV: maxV + 1 };
  const padV = (maxV - minV) * 0.08;
  return { minV: minV - padV, maxV: maxV + padV };
}

function axisTicks(minV, maxV, scale) {
  const ticks = [];
  if (scale === "log") {
    const start = Math.floor(Math.log10(minV));
    const end = Math.ceil(Math.log10(maxV));
    for (let exp = start; exp <= end; exp++) {
      const value = 10 ** exp;
      if (value >= minV * 0.999 && value <= maxV * 1.001) ticks.push(value);
    }
    if (ticks.length < 2) ticks.push(minV, maxV);
    return ticks;
  }
  for (let i = 0; i <= 4; i++) ticks.push(minV + ((maxV - minV) * i) / 4);
  return ticks;
}

function paintCanvas(canvasId, seriesList, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const drawMode = options.draw || "line";
  const scale = options.scale || "linear";
  const multiAxis = options.multiAxis === true;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  const visible = seriesList.filter((series) => !series.hidden && series.points.length).map((series) => ({
    ...series,
    axis: multiAxis && [1, 2, 3, 4].includes(Number(series.axis)) ? Number(series.axis) : 1,
  }));
  if (!visible.length || width < 40 || height < 40) return null;

  let minT = Infinity;
  let maxT = -Infinity;
  for (const series of visible) {
    for (const point of series.points) {
      const values = series.band ? [point.lo, point.hi] : [point.v];
      if (scale === "log" && values.some((value) => !(value > 0))) continue;
      minT = Math.min(minT, point.t);
      maxT = Math.max(maxT, point.t);
    }
  }
  if (!Number.isFinite(minT) || !Number.isFinite(maxT)) return null;
  if (options.view && Number.isFinite(options.view.minT) && Number.isFinite(options.view.maxT) && options.view.maxT > options.view.minT) {
    minT = options.view.minT;
    maxT = options.view.maxT;
  }
  if (minT === maxT) maxT += 1;

  const axisIds = [...new Set(visible.map((series) => series.axis))].sort((a, b) => a - b);
  const leftAxes = axisIds.filter((id) => id % 2 === 1);
  const rightAxes = axisIds.filter((id) => id % 2 === 0);
  const pad = {
    l: multiAxis ? Math.max(52, 8 + leftAxes.length * 54) : 58,
    r: multiAxis ? Math.max(12, 8 + rightAxes.length * 54) : 12,
    t: 12,
    b: 28,
  };

  const axes = {};
  for (const axisId of axisIds) {
    let minV = Infinity;
    let maxV = -Infinity;
    const color = visible.find((series) => series.axis === axisId)?.color || "#8b93a7";
    for (const series of visible) {
      if (series.axis !== axisId) continue;
      for (const point of series.points) {
        if (point.t < minT || point.t > maxT) continue;
        if (series.band) {
          if (typeof point.lo !== "number" || typeof point.hi !== "number") continue;
          if (scale === "log" && (!(point.lo > 0) || !(point.hi > 0))) continue;
          minV = Math.min(minV, point.lo);
          maxV = Math.max(maxV, point.hi);
        } else {
          if (scale === "log" && !(point.v > 0)) continue;
          minV = Math.min(minV, point.v);
          maxV = Math.max(maxV, point.v);
        }
      }
    }
    const zoomY = options.view?.y?.[String(axisId)] || options.view?.y?.[axisId];
    if (zoomY && Number.isFinite(zoomY.minV) && Number.isFinite(zoomY.maxV) && zoomY.maxV > zoomY.minV) {
      minV = zoomY.minV;
      maxV = zoomY.maxV;
      if (scale === "log" && (!(minV > 0) || !(maxV > 0))) continue;
    } else {
      const expanded = expandValueRange(minV, maxV, scale);
      if (!expanded) continue;
      minV = expanded.minV;
      maxV = expanded.maxV;
    }
    const side = axisId % 2 === 1 ? "left" : "right";
    const order = side === "left" ? leftAxes.indexOf(axisId) : rightAxes.indexOf(axisId);
    axes[axisId] = { minV, maxV, side, order, color };
  }
  if (!Object.keys(axes).length) return null;

  const xOf = (time) => pad.l + ((time - minT) / (maxT - minT)) * (width - pad.l - pad.r);
  const yOf = (value, axisId) => {
    const axis = axes[axisId];
    if (!axis) return pad.t;
    if (scale === "log") {
      const logMin = Math.log10(axis.minV);
      const logMax = Math.log10(axis.maxV);
      return pad.t + (1 - (Math.log10(value) - logMin) / (logMax - logMin)) * (height - pad.t - pad.b);
    }
    return pad.t + (1 - (value - axis.minV) / (axis.maxV - axis.minV)) * (height - pad.t - pad.b);
  };

  ctx.strokeStyle = "#2a2e38";
  ctx.fillStyle = "#8b93a7";
  ctx.font = "11px ui-monospace, monospace";
  ctx.lineWidth = 1;

  const primaryAxis = axes[axisIds[0]];
  for (const value of axisTicks(primaryAxis.minV, primaryAxis.maxV, scale)) {
    const y = yOf(value, axisIds[0]);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(width - pad.r, y);
    ctx.stroke();
  }

  for (const axisId of axisIds) {
    const axis = axes[axisId];
    const ticks = axisTicks(axis.minV, axis.maxV, scale);
    ctx.fillStyle = axis.color;
    ctx.strokeStyle = axis.color;
    for (const value of ticks) {
      const y = yOf(value, axisId);
      const label = fmtNum(value);
      if (axis.side === "left") {
        const x = 4 + axis.order * 54;
        ctx.fillText(label, x, y + 3);
      } else {
        const x = width - 4 - axis.order * 54 - ctx.measureText(label).width;
        ctx.fillText(label, x, y + 3);
      }
    }
    const tag = "Y" + axisId;
    if (axis.side === "left") {
      ctx.fillText(tag, 4 + axis.order * 54, pad.t - 2);
    } else {
      ctx.fillText(tag, width - 4 - axis.order * 54 - ctx.measureText(tag).width, pad.t - 2);
    }
  }

  ctx.fillStyle = "#8b93a7";
  for (let i = 0; i <= 3; i++) {
    const time = minT + ((maxT - minT) * i) / 3;
    const x = xOf(time);
    ctx.fillText(fmtTime(time).replace(/:\d\d$/, ""), x - 18, height - 8);
  }

  for (const series of visible) {
    if (!axes[series.axis]) continue;
    const points = series.points.filter((point) => {
      if (point.t < minT || point.t > maxT) return false;
      if (series.band) {
        if (typeof point.lo !== "number" || typeof point.hi !== "number") return false;
        if (scale === "log" && (!(point.lo > 0) || !(point.hi > 0))) return false;
        return true;
      }
      if (scale === "log" && !(point.v > 0)) return false;
      return true;
    });
    if (!points.length) continue;
    if (series.band) {
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xOf(point.t);
        const y = yOf(point.hi, series.axis);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i];
        ctx.lineTo(xOf(point.t), yOf(point.lo, series.axis));
      }
      ctx.closePath();
      ctx.fillStyle = series.color;
      ctx.globalAlpha = 0.18;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = series.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xOf(point.t);
        const y = yOf(point.hi, series.axis);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xOf(point.t);
        const y = yOf(point.lo, series.axis);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      if (drawMode === "point" || drawMode === "both") {
        ctx.fillStyle = series.color;
        for (const point of points) {
          ctx.beginPath();
          ctx.arc(xOf(point.t), yOf(point.hi, series.axis), 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(xOf(point.t), yOf(point.lo, series.axis), 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      continue;
    }
    if (drawMode === "line" || drawMode === "both") {
      ctx.beginPath();
      ctx.strokeStyle = series.color;
      ctx.lineWidth = 1.7;
      points.forEach((point, index) => {
        const x = xOf(point.t);
        const y = yOf(point.v, series.axis);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    if (drawMode === "point" || drawMode === "both") {
      ctx.fillStyle = series.color;
      for (const point of points) {
        ctx.beginPath();
        ctx.arc(xOf(point.t), yOf(point.v, series.axis), 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  return {
    pad,
    width,
    height,
    minT,
    maxT,
    minV: primaryAxis.minV,
    maxV: primaryAxis.maxV,
    scale,
    axes,
  };
}

function onChartMove(event, tipId, boundsOf, seriesList) {
  const tip = document.getElementById(tipId);
  const bounds = boundsOf();
  if (!bounds) {
    tip.classList.add("hidden");
    return;
  }
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const { pad, width, minT, maxT } = bounds;
  const plot = width - pad.l - pad.r;
  if (x < pad.l || x > width - pad.r || plot <= 0) {
    tip.classList.add("hidden");
    return;
  }
  const time = minT + ((x - pad.l) / plot) * (maxT - minT);
  const lines = [fmtTime(time)];
  for (const series of seriesList) {
    if (series.hidden || !series.points.length) continue;
    let best = series.points[0];
    let bestDist = Math.abs(best.t - time);
    for (const point of series.points) {
      const dist = Math.abs(point.t - time);
      if (dist < bestDist) {
        best = point;
        bestDist = dist;
      }
    }
    if (series.band && typeof best.lo === "number" && typeof best.hi === "number") {
      lines.push(`<span style="color:${series.color}">${esc(series.name)}</span> ${esc(fmtNum(best.lo))} … ${esc(fmtNum(best.hi))}`);
    } else {
      lines.push(`<span style="color:${series.color}">${esc(series.name)}</span> ${esc(fmtNum(best.v))}`);
    }
  }
  tip.innerHTML = lines.join("<br>");
  tip.classList.remove("hidden");
  const left = Math.min(x + 14, rect.width - 220);
  tip.style.left = Math.max(8, left) + "px";
  tip.style.top = "12px";
}

function downloadCsv() {
  const pivoted = pivot(state.points);
  if (!pivoted.rows.length) return;
  const header = [t("time"), ...pivoted.tagKeys, ...pivoted.fields];
  const lines = [header.join(";")];
  for (const row of pivoted.rows) {
    const cells = [new Date(row.time).toISOString()];
    for (const key of pivoted.tagKeys) cells.push(row.tags[key] ?? "");
    for (const field of pivoted.fields) cells.push(row.values[field] ?? "");
    lines.push(cells.map(csvCell).join(";"));
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.bucket}-${state.measurement}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[;"\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

async function runFlux() {
  const errorNode = document.getElementById("fluxErr");
  errorNode.classList.add("hidden");
  try {
    const data = await api("query", { method: "POST", body: { flux: document.getElementById("fluxInput").value } });
    state.qColumns = data.columns || [];
    state.qRows = data.rows || [];
    state.qTruncated = !!data.truncated;
    paintFluxTable();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

function paintFluxTable() {
  const wrap = document.getElementById("fluxTable");
  if (!state.qRows.length) {
    wrap.innerHTML = `<div class="empty">${esc(t("noRows"))}</div>`;
    return;
  }
  const columns = state.qColumns.length ? state.qColumns : Object.keys(state.qRows[0]);
  const head = columns.map((column) => `<th>${esc(column)}</th>`).join("");
  const body = state.qRows.slice(0, 1000).map((row) => {
    const cells = columns.map((column) => `<td>${esc(fmtNum(row[column]))}</td>`);
    return `<tr>${cells.join("")}</tr>`;
  }).join("");
  const note = state.qTruncated || state.qRows.length > 1000 ? `<div class="meta">${esc(t("truncated"))}</div>` : "";
  wrap.innerHTML = `${note}<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function openSettings() {
  document.getElementById("cfgUrl").value = state.session.url || "";
  document.getElementById("cfgOrg").value = state.session.org || "";
  document.getElementById("cfgToken").value = "";
  document.getElementById("cfgPass").value = "";
  document.getElementById("cfgErr").classList.add("hidden");
  document.getElementById("cfgOk").classList.add("hidden");
  paintTotp();
  document.getElementById("settings").showModal();
}

function paintTotp() {
  const help = document.getElementById("totpHelp");
  const box = document.getElementById("totpBox");
  const errorNode = document.getElementById("totpErr");
  if (!help || !box) return;
  errorNode.classList.add("hidden");
  help.textContent = state.session.totp ? t("totpHelpOn") : t("totpHelpOff");
  if (state.session.totp) {
    box.innerHTML = `
      <p>${esc(t("totpOn"))}</p>
      <label for="totpPass">${esc(t("totpPassword"))}</label>
      <input id="totpPass" type="password" autocomplete="current-password">
      <label for="totpOffCode">${esc(t("totpCode"))}</label>
      <input id="totpOffCode" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6">
      <div class="actions"><button type="button" class="btn" id="totpDisable">${esc(t("totpDisable"))}</button></div>`;
    document.getElementById("totpDisable").addEventListener("click", disableTotp);
    return;
  }
  box.innerHTML = `
    <p>${esc(t("totpOff"))}</p>
    <div class="actions"><button type="button" class="btn" id="totpBegin">${esc(t("totpStart"))}</button></div>`;
  document.getElementById("totpBegin").addEventListener("click", beginTotp);
}

async function beginTotp() {
  const errorNode = document.getElementById("totpErr");
  errorNode.classList.add("hidden");
  try {
    const data = await api("totp-begin", { method: "POST", body: {} });
    const box = document.getElementById("totpBox");
    box.innerHTML = `
      <p>${esc(t("totpStep"))}</p>
      <div class="qr" id="totpQr"></div>
      <label>${esc(t("totpSecret"))}</label>
      <div class="secret" id="totpSecret"></div>
      <label for="totpOnCode">${esc(t("totpCode"))}</label>
      <input id="totpOnCode" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6">
      <div class="actions"><button type="button" class="btn primary" id="totpEnable">${esc(t("totpConfirm"))}</button></div>`;
    document.getElementById("totpSecret").textContent = data.secret || "";
    const svg = String(data.svg || "");
    if (svg.startsWith("<svg") && !svg.includes("<script")) {
      document.getElementById("totpQr").innerHTML = svg;
    }
    document.getElementById("totpEnable").addEventListener("click", enableTotp);
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function enableTotp() {
  const errorNode = document.getElementById("totpErr");
  errorNode.classList.add("hidden");
  try {
    await api("totp-enable", {
      method: "POST",
      body: { code: document.getElementById("totpOnCode").value },
    });
    state.session = await api("session");
    paintTotp();
    paintStatus();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function disableTotp() {
  const errorNode = document.getElementById("totpErr");
  errorNode.classList.add("hidden");
  try {
    await api("totp-disable", {
      method: "POST",
      body: {
        password: document.getElementById("totpPass").value,
        code: document.getElementById("totpOffCode").value,
      },
    });
    state.session = await api("session");
    paintTotp();
    paintStatus();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function saveSettings(event) {
  event.preventDefault();
  const errorNode = document.getElementById("cfgErr");
  const okNode = document.getElementById("cfgOk");
  errorNode.classList.add("hidden");
  okNode.classList.add("hidden");
  try {
    const data = await api("save", {
      method: "POST",
      body: {
        url: document.getElementById("cfgUrl").value.trim(),
        org: document.getElementById("cfgOrg").value.trim(),
        token: document.getElementById("cfgToken").value.trim(),
        password: document.getElementById("cfgPass").value,
      },
    });
    state.session = await api("session");
    okNode.textContent = t("saved", { n: data.buckets });
    okNode.classList.remove("hidden");
    paintStatus();
    state.buckets = [];
    await loadBuckets();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function onLogin(event) {
  event.preventDefault();
  const errorNode = document.getElementById("loginErr");
  errorNode.classList.add("hidden");
  try {
    const data = await api("login", {
      method: "POST",
      body: {
        user: document.getElementById("loginUser").value.trim(),
        password: document.getElementById("password").value,
      },
    });
    state.session = await api("session");
    if (data.needTotp) state.session.needTotp = true;
    app.innerHTML = "";
    renderRoot();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function onTotp(event) {
  event.preventDefault();
  const errorNode = document.getElementById("loginErr");
  errorNode.classList.add("hidden");
  try {
    await api("totp", {
      method: "POST",
      body: { code: document.getElementById("totpLogin").value },
    });
    state.buckets = [];
    state.session = await api("session");
    app.innerHTML = "";
    renderRoot();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

async function onSetup(event) {
  event.preventDefault();
  const errorNode = document.getElementById("setupErr");
  errorNode.classList.add("hidden");
  const password = document.getElementById("setupPassword").value;
  const confirm = document.getElementById("setupConfirm").value;
  if (password !== confirm) {
    errorNode.textContent = t("passwordMismatch");
    errorNode.classList.remove("hidden");
    return;
  }
  try {
    await api("setup", { method: "POST", body: { password, confirm } });
    state.buckets = [];
    state.session = await api("session");
    app.innerHTML = "";
    renderRoot();
  } catch (error) {
    errorNode.textContent = error.message;
    errorNode.classList.remove("hidden");
  }
}

boot();
