const STORAGE_KEY = "ebayTrackerItemsV1";
const SETTINGS_KEY = "ebayTrackerSettingsV1";

const STATUSES = ["all", "unlisted", "listed", "sold", "shipped", "delivered", "dead"];
const currency = (n) => `$${(Number(n) || 0).toFixed(2)}`;
const pct = (n) => `${(Number(n) || 0).toFixed(1)}%`;
const id = () => Math.random().toString(36).slice(2, 11);
const daysBetween = (dateStr) => Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);

const defaults = {
  defaultEbayFeePercent: 13.25,
  defaultPackagingCost: 0.5,
  defaultMinProfit: 8,
  defaultBuyerShipping: 0,
  deadInventoryDays: 90,
  theme: "light"
};

let items = loadItems();
let settings = { ...defaults, ...loadSettings() };

function loadItems() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveItems() { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch { return {}; }
}
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }

function num(v) { return Math.max(0, Number(v) || 0); }

function compute(item) {
  const purchase = num(item.purchasePrice);
  const tax = num(item.taxPaid);
  const shippingCost = num(item.shippingCost);
  const packaging = num(item.packagingCost);
  const sold = num(item.soldPrice);
  const buyerShipping = num(item.buyerShipping);
  const feePercent = num(item.ebayFeePercent);
  const processing = num(item.paymentProcessingFee);

  const revenue = sold + buyerShipping;
  const ebayFee = revenue * (feePercent / 100);
  const totalFees = ebayFee + processing;
  const costBasis = purchase + tax + shippingCost + packaging;
  const netProfit = revenue - costBasis - totalFees;
  const roi = costBasis > 0 ? (netProfit / costBasis) * 100 : 0;
  const breakEven = costBasis + totalFees;
  const minAccept = ((costBasis + processing + num(settings.defaultMinProfit)) / (1 - feePercent / 100)) - buyerShipping;

  return { revenue, ebayFee, totalFees, costBasis, netProfit, roi, breakEven, minAccept };
}

function isDead(item) {
  const st = item.status;
  if (st === "dead") return true;
  if (["sold", "shipped", "delivered"].includes(st)) return false;
  return daysBetween(item.purchaseDate) > num(settings.deadInventoryDays);
}

function render() {
  renderDashboard();
  renderFilters();
  renderItemsTable();
  renderDeadSection();
  fillSettingsForm();
  applyTheme();
}

function renderDashboard() {
  const soldItems = items.filter((x) => ["sold", "shipped", "delivered"].includes(x.status));
  const active = items.filter((x) => ["listed", "unlisted"].includes(x.status)).length;
  const dead = items.filter(isDead);

  const totals = items.reduce((a, item) => {
    const c = compute(item);
    a.spent += c.costBasis;
    a.sales += c.revenue;
    if (["sold", "shipped", "delivered"].includes(item.status)) a.profit += c.netProfit;
    return a;
  }, { spent: 0, sales: 0, profit: 0 });

  const avgProfit = soldItems.length ? totals.profit / soldItems.length : 0;
  const byCategory = {};
  soldItems.forEach((item) => {
    const cat = item.category || "Uncategorized";
    byCategory[cat] = (byCategory[cat] || 0) + compute(item).netProfit;
  });
  const bestCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const cards = [
    ["Total Spent", currency(totals.spent)],
    ["Total Sales", currency(totals.sales)],
    ["Net Profit", currency(totals.profit)],
    ["Avg Profit / Sold", currency(avgProfit)],
    ["Active Listings", active],
    ["Sold Items", soldItems.length],
    ["Dead Inventory", dead.length],
    ["Best Category", bestCategory]
  ];

  dashboardCards.innerHTML = cards.map(([k, v]) => `<div class="card"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("");
}

function renderFilters() {
  statusFilter.innerHTML = STATUSES.map((s) => `<option value="${s}">${s === "all" ? "All statuses" : s}</option>`).join("");
  const cats = [...new Set(items.map((i) => i.category).filter(Boolean))];
  categoryFilter.innerHTML = `<option value="all">All categories</option>${cats.map((c) => `<option value="${c}">${c}</option>`).join("")}`;
}

function filteredItems() {
  let list = [...items];
  const q = searchInput.value.trim().toLowerCase();
  if (q) list = list.filter((x) => (x.itemName || "").toLowerCase().includes(q));
  if (statusFilter.value && statusFilter.value !== "all") list = list.filter((x) => x.status === statusFilter.value);
  if (categoryFilter.value && categoryFilter.value !== "all") list = list.filter((x) => x.category === categoryFilter.value);
  if (fromDate.value) list = list.filter((x) => x.purchaseDate >= fromDate.value);
  if (toDate.value) list = list.filter((x) => x.purchaseDate <= toDate.value);

  const sort = sortBy.value;
  if (sort === "newest") list.sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate));
  if (sort === "oldest") list.sort((a, b) => a.purchaseDate.localeCompare(b.purchaseDate));
  if (sort === "highestProfit") list.sort((a, b) => compute(b).netProfit - compute(a).netProfit);
  if (sort === "highestCost") list.sort((a, b) => compute(b).costBasis - compute(a).costBasis);
  if (sort === "dead") list.sort((a, b) => Number(isDead(b)) - Number(isDead(a)));
  return list;
}

function renderItemsTable() {
  const rows = filteredItems().map((item) => {
    const c = compute(item);
    const dead = isDead(item);
    return `<tr>
      <td>${item.itemName}<div class="small">${item.sku || ""}</div></td>
      <td>${item.category || "-"}</td>
      <td><span class="badge">${dead ? "dead" : item.status}</span></td>
      <td>${item.purchaseDate || ""}</td>
      <td>${currency(c.costBasis)}</td>
      <td>${currency(c.revenue)}</td>
      <td>${currency(c.netProfit)}</td>
      <td>${pct(c.roi)}</td>
      <td>
        <button class="btn secondary" onclick="editItem('${item.id}')">Edit</button>
        <button class="delete-btn" onclick="removeItem('${item.id}')">Delete</button>
      </td>
    </tr>`;
  }).join("");

  itemsTableWrap.innerHTML = `<table><thead><tr>
    <th>Item</th><th>Category</th><th>Status</th><th>Purchased</th>
    <th>Cost Basis</th><th>Sales</th><th>Net Profit</th><th>ROI</th><th>Actions</th>
  </tr></thead><tbody>${rows || '<tr><td colspan="9">No items yet.</td></tr>'}</tbody></table>`;
}

function renderDeadSection() {
  const deadItems = items.filter(isDead);
  const tied = deadItems.reduce((t, x) => t + compute(x).costBasis, 0);
  deadSummary.innerHTML = `<strong>${deadItems.length}</strong> dead items • Tied-up cash: <strong>${currency(tied)}</strong>`;

  const rows = deadItems.map((x) => {
    const d = daysBetween(x.purchaseDate);
    return `<tr><td>${x.itemName}</td><td>${x.purchaseDate}</td><td>${d}</td><td>${currency(compute(x).costBasis)}</td></tr>`;
  }).join("");
  deadTableWrap.innerHTML = `<table><thead><tr><th>Item</th><th>Purchase Date</th><th>Days in Inventory</th><th>Cash Tied</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No dead inventory 🎉</td></tr>'}</tbody></table>`;
}

function getFormItem() {
  return {
    id: itemId.value || id(),
    itemName: itemName.value.trim(),
    category: category.value.trim(),
    sku: sku.value.trim(),
    purchaseDate: purchaseDate.value,
    purchasePrice: num(purchasePrice.value),
    source: source.value.trim(),
    condition: condition.value.trim(),
    notes: notes.value.trim(),
    listedPrice: num(listedPrice.value),
    soldPrice: num(soldPrice.value),
    buyerShipping: num(buyerShipping.value),
    shippingCost: num(shippingCost.value),
    ebayFeePercent: num(ebayFeePercent.value),
    paymentProcessingFee: num(paymentProcessingFee.value),
    packagingCost: num(packagingCost.value),
    taxPaid: num(taxPaid.value),
    status: status.value
  };
}

function refreshPreview() {
  const c = compute(getFormItem());
  calcPreview.innerHTML = `
    <strong>Auto calculations</strong><br>
    Cost basis: ${currency(c.costBasis)} • Fees: ${currency(c.totalFees)}<br>
    Net profit: <strong>${currency(c.netProfit)}</strong> • ROI: <strong>${pct(c.roi)}</strong><br>
    Break-even price: ${currency(c.breakEven)} • Minimum acceptable offer: ${currency(c.minAccept)}
  `;
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = getFormItem();
  if (!item.itemName || !item.purchaseDate) return alert("Please fill item name and purchase date.");

  const idx = items.findIndex((x) => x.id === item.id);
  if (idx > -1) items[idx] = item;
  else items.push(item);

  saveItems();
  itemForm.reset();
  preloadDefaults();
  refreshPreview();
  render();
  switchTab("dashboard");
});

window.editItem = (itemIdVal) => {
  const x = items.find((i) => i.id === itemIdVal);
  if (!x) return;
  Object.entries(x).forEach(([k, v]) => { const el = document.getElementById(k); if (el) el.value = v; });
  refreshPreview();
  switchTab("inventory");
};

window.removeItem = (itemIdVal) => {
  if (!confirm("Delete this item?")) return;
  items = items.filter((x) => x.id !== itemIdVal);
  saveItems();
  render();
};

resetFormBtn.addEventListener("click", () => {
  itemForm.reset();
  itemId.value = "";
  preloadDefaults();
  refreshPreview();
});

function preloadDefaults() {
  ebayFeePercent.value = settings.defaultEbayFeePercent;
  packagingCost.value = settings.defaultPackagingCost;
  buyerShipping.value = settings.defaultBuyerShipping;
  purchaseDate.value ||= new Date().toISOString().slice(0, 10);
}

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  settings.defaultEbayFeePercent = num(sEbayFee.value);
  settings.defaultPackagingCost = num(sPackaging.value);
  settings.defaultMinProfit = num(sMinProfit.value);
  settings.defaultBuyerShipping = num(sBuyerShipping.value);
  settings.deadInventoryDays = Math.max(1, num(sDeadDays.value));
  saveSettings();
  preloadDefaults();
  render();
  alert("Settings saved");
});

function fillSettingsForm() {
  sEbayFee.value = settings.defaultEbayFeePercent;
  sPackaging.value = settings.defaultPackagingCost;
  sMinProfit.value = settings.defaultMinProfit;
  sBuyerShipping.value = settings.defaultBuyerShipping;
  sDeadDays.value = settings.deadInventoryDays;
}

quickForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cost = num(qCost.value);
  const ship = num(qShip.value);
  const pack = num(qPack.value);
  const fee = num(qFee.value) / 100;
  const minProfit = num(qMinProfit.value);

  const minOffer = (cost + ship + pack + minProfit) / (1 - fee);
  const listPrice = minOffer * 1.18;
  const estNet = listPrice * (1 - fee) - (cost + ship + pack);

  quickOutput.innerHTML = `
    Minimum offer to accept: <strong>${currency(minOffer)}</strong><br>
    Recommended list price: <strong>${currency(listPrice)}</strong><br>
    Estimated net at recommended list: <strong>${currency(estNet)}</strong>
  `;
});

function download(filename, text, mime) {
  const blob = new Blob([text], { type: mime });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

exportCsvBtn.addEventListener("click", () => {
  const headers = ["id","itemName","category","sku","purchaseDate","purchasePrice","source","condition","notes","listedPrice","soldPrice","buyerShipping","shippingCost","ebayFeePercent","paymentProcessingFee","packagingCost","taxPaid","status"];
  const rows = items.map((x) => headers.map((h) => `"${String(x[h] ?? "").replaceAll('"','""')}"`).join(","));
  download(`ebay-tracker-${Date.now()}.csv`, `${headers.join(",")}\n${rows.join("\n")}`, "text/csv");
});

exportJsonBtn.addEventListener("click", () => {
  download(`ebay-tracker-backup-${Date.now()}.json`, JSON.stringify({ items, settings }, null, 2), "application/json");
});

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') { cur += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === "," && !quoted) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

importCsvInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const txt = await file.text();
  const lines = txt.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return alert("CSV appears empty.");
  const headers = parseCsvLine(lines[0]);
  const imported = lines.slice(1).map((line) => {
    const vals = parseCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => obj[h] = vals[i] ?? "");
    obj.id ||= id();
    ["purchasePrice","listedPrice","soldPrice","buyerShipping","shippingCost","ebayFeePercent","paymentProcessingFee","packagingCost","taxPaid"].forEach((k) => obj[k] = num(obj[k]));
    return obj;
  });
  items = imported;
  saveItems();
  render();
  alert("CSV imported.");
  e.target.value = "";
});

importJsonInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (Array.isArray(data.items)) items = data.items;
    if (data.settings) settings = { ...settings, ...data.settings };
    saveItems(); saveSettings(); render();
    alert("Backup restored.");
  } catch {
    alert("Invalid JSON file.");
  }
  e.target.value = "";
});

[searchInput, statusFilter, categoryFilter, fromDate, toDate, sortBy].forEach((el) => el.addEventListener("input", renderItemsTable));
["itemName","purchasePrice","soldPrice","buyerShipping","shippingCost","ebayFeePercent","paymentProcessingFee","packagingCost","taxPaid"].forEach((key) => {
  document.getElementById(key).addEventListener("input", refreshPreview);
});

function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === tab));
}

document.querySelectorAll(".tab-btn").forEach((btn) => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));

themeToggle.addEventListener("click", () => {
  settings.theme = settings.theme === "dark" ? "light" : "dark";
  saveSettings();
  applyTheme();
});

function applyTheme() {
  document.body.classList.toggle("dark", settings.theme === "dark");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

preloadDefaults();
refreshPreview();
render();
