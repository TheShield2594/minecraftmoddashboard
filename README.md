# Modpack Codex

A personal reference dashboard for the mods in a Minecraft modpack (NeoForge · 1.21.1). Each mod gets a page with a checkable progression list, its machines and blocks, key recipes, resource chains, tips, and a free-form notes area. Progress and notes are stored server-side in SQLite, so they survive browser resets and are shared across devices.

## Stack

- **Frontend:** React 18 + Vite + React Router
- **Backend:** Express serving a small JSON API and the built frontend
- **Storage:** SQLite via Node's built-in `node:sqlite` (requires Node ≥ 22.5)

## Development

Run the API and the Vite dev server in two terminals:

```sh
npm install
npm run dev:api   # Express API on :8787
npm run dev       # Vite dev server on :5173, proxies /api to :8787
```

## Production / Docker

```sh
docker compose up -d --build
```

The app listens on port 8080 and persists its database to the `modpack-codex-data` volume (`DB_PATH`, default `/data/modpack-codex.db` in the container).

A prebuilt image is published to GHCR on every push to `main`; `portainer-stack.yml` deploys it directly:

```sh
docker compose -f portainer-stack.yml up -d
```

Without Docker: `npm run build && npm start` (serves on `PORT`, default 8080; set `DB_PATH` to control where the SQLite file lives).

## Adding mods

All mod content lives in [`src/data/mods.js`](src/data/mods.js) — add an entry to the `MODS` array and the card, detail page, and category chip all appear automatically. The expected shape of an entry is documented at the top of that file.

Each mod has one or more **guides** — named, checkable step-by-step walkthroughs (e.g. a core progression plus a focused build guide like "Build a Coke Oven"). Steps can be plain strings or `{ title, detail }` objects; keep the first guide's id as `progression` so previously saved checkbox progress carries over.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness check |
| `GET` | `/api/notes` | All notes, keyed by mod id |
| `PUT` | `/api/notes/:modId` | Upsert `{ text }` (empty text deletes) |
| `GET` | `/api/progress` | All progress, keyed by mod id → step index |
| `PUT` | `/api/progress/:modId/:stepIndex` | Set `{ done }` for one step |
