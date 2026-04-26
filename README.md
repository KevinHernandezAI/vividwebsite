# eBay Inventory & Profit Tracker (Mobile-first, local-first)

Simple PWA for tracking inventory, costs, fees, profit, ROI, and dead inventory for eBay resellers.

## Run locally (easy)

1. Open this folder in your terminal.
2. Start a simple local server:

```bash
python3 -m http.server 4173
```

3. Open `http://localhost:4173` in your browser.

## Use on iPhone

1. Open the hosted URL (or local URL on same Wi-Fi) in Safari.
2. Tap **Share** → **Add to Home Screen**.
3. Launch from your home screen like an app.

## Free hosting (easy)

- **GitHub Pages**: push this folder to GitHub and enable Pages.
- **Netlify Drop**: drag this folder into <https://app.netlify.com/drop>.
- **Cloudflare Pages**: connect repo and deploy static site.

## Data and backups

- Data is stored in browser `localStorage`.
- Use **Export CSV** for spreadsheet usage.
- Use **Backup JSON** and **Restore JSON** for full local backup/restore.
