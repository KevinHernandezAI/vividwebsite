# VIVID Website

## Setup
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## To update product images
Replace files in `/public/products/` using the same filenames referenced in `data/products.ts`.

## To update collection images
Replace files in `/public/collections/` using the same filenames referenced in `data/collections.ts`.

> Note: `*.jpg` files in these folders are treated as generated/local assets and are gitignored.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Local product/collection data source in `/data`
