# Landing Page - Vil

This is a code bundle for Landing Page - Vil. The original project is available at https://www.figma.com/design/Hib5oZnqIIzNs1vFsE69Fs/Landing-Page---Vil.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the Vite development server.

## Persisting admin changes in production (without database)

This project now supports file-based persistence through a small Node/Express server:

1. Build the app:
   - `npm run build`
2. Start the production server:
   - `npm run start`

The admin panel saves content to `data/site-data.json` through `PUT /api/site-data`.
On startup, the app loads persisted content from `GET /api/site-data`.

> Note: `npm run dev` is still front-end only (no API persistence endpoint).

Public domain Figma
https://vilpessoa.figma.site/
