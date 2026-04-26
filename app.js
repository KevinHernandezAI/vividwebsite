const CITIES = [
  "McAllen", "Edinburg", "Brownsville", "Harlingen", "Mission", "Weslaco", "Pharr", "San Juan", "Mercedes", "Rio Grande City"
];

const STORAGE = {
  listings: "emporiumelite.listings.v1",
  watchlist: "emporiumelite.watchlist.v1",
  customCities: "emporiumelite.customCities.v1"
};

const CITY_ORDER = CITIES.reduce((map, city, index) => ({ ...map, [city]: index }), {});
const SOURCES = [
  {
    id: "public-demo",
    name: "Public Listing Sampler",
    mode: "public",
    async fetchListings() {
      // Safe starter source. Replace this with approved API adapters later.
      const now = Date.now();
      const hrs = (h) => new Date(now + h * 3600000).toISOString();
      return [
        sample("Tool Chest + Shelving", "RGV Secure Storage", "McAllen", 180, hrs(5), hrs(53), ["tools", "shelving", "organized", "totes"], 8, "https://example.com/auction/rgv-1"),
        sample("Mixed Household Unit", "Palm Valley Storage", "Harlingen", 95, hrs(8), hrs(60), ["furniture", "boxes", "mixed"], 6, "https://example.com/auction/rgv-2"),
        sample("Unknown Bags and Mattress", "Express Mini Storage", "Brownsville", 45, hrs(2), hrs(35), ["mattress", "trash", "bags"], 3, "https://example.com/auction/rgv-3"),
        sample("Garage Equipment Lot", "South Texas Storage Hub", "Edinburg", 220, hrs(12), hrs(68), ["tools", "electronics", "organized"], 11, "https://example.com/auction/rgv-4"),
        sample("Retail Overflow", "Mission Self Storage", "Mission", 150, hrs(10), hrs(55), ["labeled", "boxes", "totes", "organized"], 9, "https://example.com/auction/rgv-5")
      ];
    }
  },
  {
    id: "manual",
    name: "Manual Listings",
    mode: "manual",
    async fetchListings() {
      return readJSON(STORAGE.listings, []);
    }
  }
];

const refreshBtn = document.getElementById("refreshBtn");
const cityFilter = document.getElementById("cityFilter");
const sourceFilter = document.getElementById("sourceFilter");
const maxBidFilter = document.getElementById("maxBidFilter");
const minScoreFilter = document.getElementById("minScoreFilter");
const hoursFilter = document.getElementById("hoursFilter");
const sortBy = document.getElementById("sortBy");
const stats = document.getElementById("stats");
const auctionFeed = document.getElementById("auctionFeed");
const auctionCardTemplate = document.getElementById("auctionCardTemplate");
const customCityForm = document.getElementById("customCityForm");
const customCity = document.getElementById("customCity");
const manualListingForm = document.getElementById("manualListingForm");
const manualTitle = document.getElementById("manualTitle");
const manualFacility = document.getElementById("manualFacility");
const manualCity = document.getElementById("manualCity");
const manualBid = document.getElementById("manualBid");
const manualEnd = document.getElementById("manualEnd");
const manualPickup = document.getElementById("manualPickup");
const manualImage = document.getElementById("manualImage");
const manualLink = document.getElementById("manualLink");
const manualHints = document.getElementById("manualHints");

let allListings = [];
const watchlistEl = document.getElementById("watchlist");
let watchlist = readJSON(STORAGE.watchlist, []);
let customCities = readJSON(STORAGE.customCities, []);

function sample(title, facilityName, city, currentBid, auctionEnd, pickupDeadline, hints, imageCount, auctionLink) {
  return {
    id: crypto.randomUUID(),
    source: "public-demo",
    platform: "Public Listing Sampler",
    title,
    facilityName,
    city,
    currentBid,
    auctionEnd,
    pickupDeadline,
    imageCount,
    imageUrls: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=60"],
    auctionLink,
    hints,
    fetchedAt: new Date().toISOString()
  };
}

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function currency(value) { return `$${Number(value || 0).toFixed(0)}`; }

function scoreListing(listing) {
  const hints = (listing.hints || []).map((x) => x.toLowerCase());
  const title = `${listing.title} ${listing.facilityName}`.toLowerCase();
  const has = (term) => hints.includes(term) || title.includes(term);

  let score = 50;
  let positives = [];
  let negatives = [];

  const add = (pts, reason) => { score += pts; positives.push(reason); };
  const sub = (pts, reason) => { score -= pts; negatives.push(reason); };

  if (has("totes")) add(8, "visible totes");
  if (has("labeled") || has("labels")) add(6, "labeled boxes");
  if (has("tools")) add(14, "tool resale upside");
  if (has("electronics")) add(12, "electronics potential");
  if (has("shelving")) add(7, "shelving value");
  if (has("furniture")) add(8, "furniture potential");
  if (has("organized")) add(10, "organized contents");
  if (has("trash")) sub(14, "visible trash");
  if (has("mattress")) sub(12, "mattress-heavy risk");
  if (has("water") || has("damage")) sub(16, "possible damage");
  if (has("bags") || has("unknown")) sub(10, "unknown bagged contents");
  if ((listing.imageCount || 0) < 4) sub(6, "limited photos");
  if ((listing.currentBid || 0) > 350) sub(7, "higher entry price");

  score = Math.max(1, Math.min(100, score));

  const upsideType = has("tools")
    ? "tools"
    : has("furniture")
      ? "furniture"
      : has("electronics")
        ? "household resale"
        : has("trash") && !has("tools")
          ? "likely junk"
          : "mixed unknown";

  const estValue = Math.max(listing.currentBid * (1.7 + score / 160), listing.currentBid + 120);
  const volumeTier = estimateVolume(listing);

  return {
    score,
    reasonSummary: `${positives.slice(0, 2).join(", ") || "balanced listing"}${negatives[0] ? `; watch: ${negatives[0]}` : ""}`,
    upsideType,
    estimatedResaleValue: Math.round(estValue),
    vehicle: volumeTier.vehicle,
    labor: volumeTier.labor,
    dumpRisk: volumeTier.dumpRisk,
    suggestedMaxBid: Math.max(20, Math.round(estValue * 0.34))
  };
}

function estimateVolume(listing) {
  const count = listing.imageCount || 1;
  const hints = (listing.hints || []).join(" ").toLowerCase();
  let points = count * 4;
  if (hints.includes("furniture")) points += 16;
  if (hints.includes("shelving")) points += 10;
  if (hints.includes("trash") || hints.includes("mattress")) points += 8;

  if (points < 24) return { vehicle: "Pickup truck", labor: "Low", dumpRisk: "Low" };
  if (points < 36) return { vehicle: "Cargo van", labor: "Medium", dumpRisk: "Medium" };
  if (points < 50) return { vehicle: "10 ft U-Haul", labor: "Medium", dumpRisk: "Medium" };
  if (points < 64) return { vehicle: "15 ft U-Haul", labor: "High", dumpRisk: "High" };
  return { vehicle: "Larger than 15 ft", labor: "High", dumpRisk: "High" };
}

function hoursRemaining(isoDate) {
  return (new Date(isoDate).getTime() - Date.now()) / 3600000;
}

function renderFilters() {
  const cities = ["All cities", ...CITIES, ...customCities.filter((c) => !CITIES.includes(c))];
  cityFilter.innerHTML = cities.map((city) => `<option>${city}</option>`).join("");
  sourceFilter.innerHTML = ["All sources", ...SOURCES.map((s) => s.name)].map((x) => `<option>${x}</option>`).join("");
}

function filteredListings() {
  const city = cityFilter.value;
  const source = sourceFilter.value;
  const maxBid = Number(maxBidFilter.value || Infinity);
  const minScore = Number(minScoreFilter.value || 0);
  const maxHours = Number(hoursFilter.value || Infinity);

  return allListings
    .filter((l) => city === "All cities" || l.city === city)
    .filter((l) => source === "All sources" || l.platform === source)
    .filter((l) => (l.currentBid || 0) <= maxBid)
    .filter((l) => scoreListing(l).score >= minScore)
    .filter((l) => hoursRemaining(l.auctionEnd) <= maxHours)
    .sort(sortListings);
}

function sortListings(a, b) {
  const mode = sortBy.value;
  const sa = scoreListing(a);
  const sb = scoreListing(b);

  if (mode === "bestScore") return sb.score - sa.score;
  if (mode === "lowestBid") return a.currentBid - b.currentBid;
  if (mode === "soonestEnding") return new Date(a.auctionEnd) - new Date(b.auctionEnd);
  if (mode === "closestCity") return (CITY_ORDER[a.city] ?? 999) - (CITY_ORDER[b.city] ?? 999);
  return sb.estimatedResaleValue - sa.estimatedResaleValue;
}

function renderStats(listings) {
  const avgScore = listings.length ? Math.round(listings.reduce((a, x) => a + scoreListing(x).score, 0) / listings.length) : 0;
  const endingSoon = listings.filter((x) => hoursRemaining(x.auctionEnd) <= 6 && hoursRemaining(x.auctionEnd) > 0).length;
  const bestSpread = listings.reduce((best, x) => {
    const s = scoreListing(x);
    const spread = s.estimatedResaleValue - x.currentBid;
    return spread > best.spread ? { spread, title: x.title } : best;
  }, { spread: 0, title: "-" });

  stats.innerHTML = [
    ["Units", listings.length],
    ["Average Score", `${avgScore}/100`],
    ["Ending <= 6 hrs", endingSoon],
    ["Best Value Gap", `${currency(bestSpread.spread)} (${bestSpread.title})`]
  ].map(([label, value]) => `<div class="stat"><div class="label">${label}</div><div class="value">${value}</div></div>`).join("");
}

function renderFeed() {
  const listings = filteredListings();
  renderStats(listings);
  auctionFeed.innerHTML = "";

  for (const listing of listings) {
    const model = scoreListing(listing);
    const node = auctionCardTemplate.content.firstElementChild.cloneNode(true);
    const scoreClass = model.score >= 70 ? "var(--good)" : model.score >= 45 ? "var(--warn)" : "var(--bad)";

    node.querySelector(".thumb").src = listing.imageUrls?.[0] || "https://placehold.co/600x450/0b1530/9db4db?text=No+Image";
    node.querySelector("h3").textContent = listing.title;
    node.querySelector(".score-pill").textContent = `${model.score}/100`;
    node.querySelector(".score-pill").style.background = scoreClass;
    node.querySelector(".score-pill").style.color = "#071121";
    node.querySelector(".meta").textContent = `${listing.platform} • ${listing.city} • ${listing.facilityName}`;
    node.querySelector(".reason").textContent = `${model.reasonSummary}. Upside: ${model.upsideType}.`;

    node.querySelector(".chips").innerHTML = [
      `Bid ${currency(listing.currentBid)}`,
      `${listing.imageCount} photos`,
      `Ends ${new Date(listing.auctionEnd).toLocaleString()}`,
      listing.pickupDeadline ? `Pickup by ${new Date(listing.pickupDeadline).toLocaleString()}` : "Pickup deadline unknown"
    ].map((x) => `<span class="chip">${x}</span>`).join("");

    node.querySelector(".metrics").innerHTML = [
      `Est. value ${currency(model.estimatedResaleValue)}`,
      `Suggested max bid ${currency(model.suggestedMaxBid)}`,
      `Vehicle ${model.vehicle}`,
      `Labor ${model.labor}`,
      `Dump risk ${model.dumpRisk}`
    ].map((x) => `<span class="metric">${x}</span>`).join("");

    const actions = node.querySelector(".actions");
    actions.innerHTML = `
      <a class="btn" href="${listing.auctionLink}" target="_blank" rel="noopener">Go Bid</a>
      <button class="btn secondary" data-plan="${listing.id}">Plan Profit</button>
      <button class="btn secondary" data-watch="${listing.id}">Watchlist</button>
    `;

    const planner = node.querySelector(".planner");
    planner.innerHTML = buildPlanner(listing, model);

    actions.querySelector(`[data-plan='${listing.id}']`).addEventListener("click", () => {
      planner.classList.toggle("active");
    });
    actions.querySelector(`[data-watch='${listing.id}']`).addEventListener("click", () => addToWatchlist(listing, model));

    planner.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      runProfitCalc(e.currentTarget, planner.querySelector(".planner-output"), model);
    });

    auctionFeed.appendChild(node);
  }

  if (!listings.length) {
    auctionFeed.innerHTML = `<article class="panel"><p>No units match your filters yet. Try widening city/bid/time filters.</p></article>`;
  }
}

function buildPlanner(listing, model) {
  return `
    <form class="planner-grid">
      <input name="maxBid" type="number" step="1" min="0" value="${model.suggestedMaxBid}" placeholder="My max bid" />
      <input name="premium" type="number" step="1" min="0" value="20" placeholder="Buyer premium" />
      <input name="haul" type="number" step="1" min="0" value="85" placeholder="U-Haul/fuel" />
      <input name="dump" type="number" step="1" min="0" value="60" placeholder="Dump fee estimate" />
      <input name="labor" type="number" step="1" min="0" value="120" placeholder="Labor/time cost" />
      <input name="clean" type="number" step="1" min="0" value="20" placeholder="Cleaning supplies" />
      <input name="resale" type="number" step="1" min="0" value="${model.estimatedResaleValue}" placeholder="Estimated resale value" />
      <button class="btn" type="submit">Calculate</button>
    </form>
    <div class="planner-output">Profit calculator ready.</div>
  `;
}

function runProfitCalc(form, output, model) {
  const data = Object.fromEntries(new FormData(form).entries());
  const totalInvestment = ["maxBid", "premium", "haul", "dump", "labor", "clean"].reduce((sum, key) => sum + Number(data[key] || 0), 0);
  const gross = Number(data.resale || 0);
  const net = gross - totalInvestment;
  const risk = net < 0 ? "High" : model.score < 50 ? "Medium" : "Low";
  const shouldPass = net < 100 || risk === "High";

  output.innerHTML = `
    <strong>Total investment:</strong> ${currency(totalInvestment)}<br/>
    <strong>Estimated gross resale:</strong> ${currency(gross)}<br/>
    <strong>Estimated net profit:</strong> ${currency(net)}<br/>
    <strong>Risk rating:</strong> ${risk}<br/>
    <strong>Decision:</strong> ${shouldPass ? "PASS / very cautious" : "Worth a closer look"}
  `;
}

function addToWatchlist(listing, model) {
  if (watchlist.some((x) => x.id === listing.id)) return;
  watchlist.push({
    id: listing.id,
    title: listing.title,
    city: listing.city,
    auctionEnd: listing.auctionEnd,
    pickupDeadline: listing.pickupDeadline,
    link: listing.auctionLink,
    myMaxBid: model.suggestedMaxBid,
    notes: "",
    reminderMinutes: 30
  });
  writeJSON(STORAGE.watchlist, watchlist);
  renderWatchlist();
}

function renderWatchlist() {
  if (!watchlist.length) {
    watchlistEl.innerHTML = `<p class="muted">No watchlist items yet. Tap Watchlist on a unit card.</p>`;
    return;
  }

  watchlistEl.innerHTML = watchlist.map((item) => `
    <article class="watch-item">
      <strong>${item.title}</strong>
      <p>${item.city} • Ends ${new Date(item.auctionEnd).toLocaleString()}</p>
      <p>Pickup: ${item.pickupDeadline ? new Date(item.pickupDeadline).toLocaleString() : "Unknown"}</p>
      <label>My max bid<input data-max="${item.id}" type="number" value="${item.myMaxBid}"/></label>
      <label>Notes<input data-notes="${item.id}" value="${item.notes || ""}" placeholder="Unit notes"/></label>
      <label>Reminder mins before end<input data-rem="${item.id}" type="number" min="5" value="${item.reminderMinutes || 30}"/></label>
      <div class="actions">
        <a class="btn" href="${item.link}" target="_blank" rel="noopener">Go Bid</a>
        <button class="btn secondary" data-save="${item.id}">Save</button>
        <button class="btn secondary" data-remove="${item.id}">Remove</button>
      </div>
    </article>
  `).join("");

  watchlistEl.querySelectorAll("[data-save]").forEach((btn) => btn.addEventListener("click", () => {
    const id = btn.dataset.save;
    const item = watchlist.find((x) => x.id === id);
    if (!item) return;
    item.myMaxBid = Number(watchlistEl.querySelector(`[data-max='${id}']`).value || 0);
    item.notes = watchlistEl.querySelector(`[data-notes='${id}']`).value;
    item.reminderMinutes = Number(watchlistEl.querySelector(`[data-rem='${id}']`).value || 30);
    writeJSON(STORAGE.watchlist, watchlist);
  }));

  watchlistEl.querySelectorAll("[data-remove]").forEach((btn) => btn.addEventListener("click", () => {
    watchlist = watchlist.filter((x) => x.id !== btn.dataset.remove);
    writeJSON(STORAGE.watchlist, watchlist);
    renderWatchlist();
  }));
}

async function refreshSources() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = "Refreshing...";
  try {
    const results = await Promise.all(SOURCES.map((source) => source.fetchListings()));
    allListings = results.flat().filter((x) => x && x.city && x.auctionLink);
    renderFeed();
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = "Refresh Feed";
  }
}

function checkReminders() {
  const now = Date.now();
  for (const item of watchlist) {
    const remTime = new Date(item.auctionEnd).getTime() - (Number(item.reminderMinutes || 30) * 60000);
    const reminderKey = `reminded.${item.id}.${new Date(item.auctionEnd).toISOString()}`;
    if (now > remTime && !sessionStorage.getItem(reminderKey)) {
      sessionStorage.setItem(reminderKey, "1");
      if (Notification.permission === "granted") {
        new Notification(`Auction ending soon: ${item.title}`, {
          body: `City ${item.city}. Max bid plan: ${currency(item.myMaxBid)}.`,
          icon: "icon.svg"
        });
      }
    }
  }
}

customCityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = customCity.value.trim();
  if (!city) return;
  if (!customCities.includes(city)) {
    customCities.push(city);
    writeJSON(STORAGE.customCities, customCities);
    renderFilters();
    renderFeed();
  }
  customCity.value = "";
});

manualListingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const manualListings = readJSON(STORAGE.listings, []);
  manualListings.push({
    id: crypto.randomUUID(),
    source: "manual",
    platform: "Manual Listings",
    title: manualTitle.value.trim(),
    facilityName: manualFacility.value.trim(),
    city: manualCity.value.trim(),
    currentBid: Number(manualBid.value || 0),
    auctionEnd: new Date(manualEnd.value).toISOString(),
    pickupDeadline: manualPickup.value ? new Date(manualPickup.value).toISOString() : null,
    imageCount: manualImage.value ? 1 : 0,
    imageUrls: manualImage.value ? [manualImage.value] : [],
    auctionLink: manualLink.value,
    hints: manualHints.value.split(",").map((x) => x.trim()).filter(Boolean),
    fetchedAt: new Date().toISOString()
  });
  writeJSON(STORAGE.listings, manualListings);
  manualListingForm.reset();
  refreshSources();
});

[cityFilter, sourceFilter, maxBidFilter, minScoreFilter, hoursFilter, sortBy].forEach((el) => {
  el.addEventListener("change", renderFeed);
  el.addEventListener("input", renderFeed);
});
refreshBtn.addEventListener("click", refreshSources);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();

renderFilters();
renderWatchlist();
refreshSources();
setInterval(checkReminders, 20000);
