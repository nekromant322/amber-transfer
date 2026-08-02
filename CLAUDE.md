# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Амбер Трансфер** — a booking site + backend for personal transfers between Kaliningrad and Europe (Gdańsk, Warsaw, Kaunas, Vilnius, Riga, Berlin, etc.). Two independently deployable apps in one repo:

- `backend/` — Spring Boot 4 REST API: pricing lookup, order creation, and a Telegram bot that dispatches new orders to driver-subscribers.
- `frontend/` — Next.js site: single landing page with a booking widget that calls the backend.

Both are built as Docker images (`ghcr.io/nekromant322/transfer-backend`, `transfer-frontend`) and deployed together via `docker-compose.yml` to a single VPS, triggered by `.github/workflows/deploy.yml` on every push to `main` (no CI tests/checks currently run — it deploys directly).

## Backend (Spring Boot)

Java 21, Spring Boot 4.0.6, Maven, package root `com.overridetech.transfer`.

```bash
# from backend/
.\mvnw.cmd clean package       # Windows
.\mvnw.cmd spring-boot:run
.\mvnw.cmd test
.\mvnw.cmd test -Dtest=ClassName
```

Runs on port `8080`. No Spring Security — all `/api/**` endpoints are unauthenticated; CORS restricted via `cors.allowed-origins` property.

### Endpoints
- `GET /api/cities` — list of ~900 European cities (ru/lat names), from `CityProperties` / `cities.yml`.
- `GET /api/distance?from=&to=` — road distance in km via OSRM (`router.project-osrm.org`).
- `GET /api/price?from=&to=&passport=` — fixed price lookup from `PriceRegistry` (passport defaults to `eu`); 404 if the route isn't in the sheet.
- `POST /api/orders` — create an order (`CreateOrderRequest`: from, to, date, passport, phone); triggers Telegram notifications to all active driver-subscribers.

### Key components (`src/main/java/com/overridetech/transfer/`)
- `pricing/PriceRegistry` — hourly (`@Scheduled`, 1h) + startup refresh of prices from a **Google Sheets** spreadsheet ("price routes" + "tamojnya base price" tabs) via `RestClient`; in-memory bidirectional cache. Sheet ID is hardcoded in config; auth via `GOOGLE_SHEETS_API_KEY`.
- `service/OrderService` — creates orders, notifies subscribers via Telegram with an inline "Беру" (take) button; first driver to claim locks the order, buttons removed for others.
- `service/DistanceService` — OSRM road distance. `service/GeocodingService` — Nominatim/OpenStreetMap geocoding.
- `bot/TransferBot` + `bot/commands/` — Telegram long-polling bot (`/subscribe`, `/unsubscribe`), routes callback queries for order claiming.
- `model/` — JPA entities: `Order`, `OrderNotification` (tracks driver claim state), `Subscriber`, `OrderStatus` enum.
- `properties/CityProperties` — binds the ~900-city list from `cities.yml`.
- Liquibase changelogs (`db/changelog/changes/`): `002_create_subscribers`, `003_create_orders`, `004_create_order_notifications`.

### ⚠️ Known unfinished work (see `backend/task.txt`)
`/api/price` currently only returns an **exact match or 404**. The intended fallback algorithm (documented in `backend/task.txt`, in Russian) for city pairs *not* in `PriceRegistry` is **not implemented yet**:
- EU passport → route via Grzechotki border crossing; other passports → via Marijampolė (Grzechotki is EU-only).
- Minimum price for the Kaliningrad–Marijampolė / Kaliningrad–Grzechotki leg comes from the sheet (includes border-crossing time).
- Remaining distance priced per-km using the nearest city that *does* have a known price as reference.
- Example given: Kaliningrad → Kaunas (253km), no direct price, should interpolate from nearest priced city.

If asked to work on pricing logic, this is very likely the next feature to build — check with the user before assuming scope.

### Config / secrets (`application.yml`)
Values come from env vars — never hardcode or print actual secret values:
- `TG_BOT_TOKEN`, `TG_BOT_USERNAME` — Telegram bot.
- `GOOGLE_SHEETS_API_KEY` — Google Sheets pricing source (spreadsheet ID is non-secret, hardcoded).
- `spring.datasource.*` — Postgres via `DB_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD` (db name `transfer_db`).
- `cors.allowed-origins`.

## Frontend (Next.js)

Next.js 16 (App Router, Turbopack), React 18, no TypeScript, CSS Modules (no Tailwind/UI kit). No lint/test scripts configured.

```bash
# from frontend/
npm run dev     # http://localhost:3000
npm run build   # production build; NODE_ENV=production adds output:'export' (static export for nginx/Docker)
npm run start
```

**After any change under `frontend/`, verify it locally before reporting the task done:**
1. Make sure a dev server is running (start one in the background if not).
2. Confirm `http://localhost:3000/` returns 200 with no server-log errors (read the background task's output, or `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`).
3. If the change affects a specific route/section, check that one directly, not just root.

If `npm run dev` reports the port already in use, or you see `Manifest file is empty` / `Could not find the module ... in the React Client Manifest`, that's a stale Turbopack cache or an orphaned dev-server process — kill the leftover process and delete `frontend/.next`, then restart. Don't debug app code for this.

### Structure
- `src/app/layout.jsx` — root layout, RU metadata, Google Fonts (Cormorant Garamond + Raleway).
- `src/app/page.jsx` — homepage composes: `Nav → Hero → HowItWorks → Services → Tariffs → FAQ → Footer`.
- `src/app/globals.css` — design tokens (`:root`): `--black #080808`, `--black-soft`, `--black-card`, `--black-border`, `--amber #E8A900`, `--amber-light`, `--white`, `--white-dim`, fonts. Black/white/amber premium look per the original brief (`task.txt`).
- `src/components/` (each paired with a `.module.css`):
  - `Nav.jsx` — sticky nav, anchor links, mobile menu.
  - `Hero.jsx` — hero + embeds `BookingWidget`.
  - `BookingWidget.jsx` — from/to city inputs (swap button), live price preview (`GET /api/price`), date input, EU/other passport toggle, phone field, submits `POST /api/orders`.
  - `CityInput.jsx` — city autocomplete, fetches `GET /api/cities`, has a hardcoded 10-city fallback list.
  - `DatePicker.jsx` — **unused/orphaned**, `BookingWidget` uses a plain `<input type="date">` instead.
  - `HowItWorks.jsx`, `Services.jsx`, `Tariffs.jsx`, `FAQ.jsx` — static content sections.
  - `Footer.jsx` — phones (`+7 950 008 4457`, `+373 69 140 940`), Telegram `@amber_transfer`. **No email** (intentionally removed).
- All page copy is in Russian.

### Backend integration
Components call `fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`)` (falls back to `''`). In dev, `next.config.js` rewrites `/api/:path*` → `http://localhost:8080/api/:path*` (rewrites don't apply to the static-export prod build — prod relies on `NEXT_PUBLIC_API_URL` directly). `.env.local` defines `NEXT_PUBLIC_API_URL`.

## Deployment

- `docker-compose.yml` — 3 services: `transfer-db` (Postgres 14.1, port 5438→5432), `transfer-backend` (port 9001→8080), `transfer-frontend` (nginx serving the static export, port 9002→8080).
- `.github/workflows/deploy.yml` — on push to `main`: builds & pushes both images to GHCR, copies `docker-compose.yml` to the VPS (194.87.96.29), then SSHes in to recreate containers with secrets injected via a generated env file. **Pushing to `main` deploys to production directly** — be careful with `git push`.
- `backend/Dockerfile`, `frontend/Dockerfile` — build images for the above.
