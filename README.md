# EmporiumElite Storage Scout

A mobile-first PWA for evaluating storage auction listings in the Rio Grande Valley (RGV) with practical scoring, watchlist reminders, and profit planning.

## What this v1 does (practical + safe)

- Scans a modular set of sources (`public-demo`, `manual`) and merges results into one feed.
- Focuses on these cities by default:
  - McAllen, Edinburg, Brownsville, Harlingen, Mission, Weslaco, Pharr, San Juan, Mercedes, Rio Grande City.
- Shows listing title, facility, city, current bid, end time, pickup deadline, image count, thumbnail, and original link.
- Scores each unit (0-100) with a clear reason summary and upside type.
- Estimates suggested max bid, likely vehicle size, labor burden, and dump-cost risk.
- Includes a detailed per-unit profit planner (max bid + all major costs).
- Supports watchlist notes, custom max bid, and end-time reminders.
- Dark mobile UI designed for iPhone touch targets.
- PWA install support (save to Home Screen).

## What this v1 intentionally does NOT do

- No bank account linking.
- No autobid bot.
- No automated bidding.
- No bypassing robots.txt, Terms of Service, or protected pages.

Use the **Go Bid** button to place bids yourself on the official listing page.

## Architecture

This project is static and lightweight:

- `index.html` – UI structure.
- `styles.css` – mobile-first dark premium design.
- `app.js` – source adapters, scoring engine, planner, watchlist, reminder logic.
- `manifest.json` + `sw.js` – PWA install and offline shell.

### Source adapter pattern

`SOURCES` in `app.js` is modular. Each source implements:

```js
{
  id: "source-id",
  name: "Source Display Name",
  async fetchListings() { return [...] }
}
```

This lets you add approved API-backed sources later without rewriting the app.

## Run locally

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173`

## Deploy

Any static host works.

### Option A: Netlify Drop

1. Zip the folder contents.
2. Go to https://app.netlify.com/drop
3. Drag/drop folder or zip.

### Option B: GitHub Pages

1. Push repo to GitHub.
2. Enable Pages for the branch/folder.
3. Open the provided URL.

### Option C: Cloudflare Pages

1. Connect repository.
2. Build command: none
3. Output directory: project root

## Use on iPhone (app-like)

1. Open deployed URL in Safari.
2. Tap **Share** → **Add to Home Screen**.
3. Launch from icon to run in standalone mode.

## How to use quickly

1. Tap **Refresh Feed**.
2. Filter by city, max bid, hours left, source, score.
3. Open high-score cards and check reasons + vehicle estimate.
4. Open **Plan Profit** and enter your real cost assumptions.
5. Save good candidates to Watchlist.
6. Use reminders and tap **Go Bid** near auction close.

## Scheduled refreshing

- This v1 supports manual refresh button (safe and reliable on static hosting).
- For automatic scheduled refresh, use a backend cron + approved APIs, then feed results to this UI.

## Limitations and safest alternatives

- Direct scraping may be blocked by CORS, robots.txt, or platform terms.
- Safer v1 pattern: ingest public data you are allowed to access (manual entry or approved API feeds).
- The scoring model is heuristic-first by design and can later be upgraded with real vision inference.

## Upgrading the image intelligence later

- Keep current `scoreListing()` for fallback.
- Add an optional server endpoint that returns image tags/confidence.
- Merge model tags into existing score rules for better precision.

