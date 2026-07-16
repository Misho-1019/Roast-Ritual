# ☕ Roast & Ritual

### Full-Stack Premium Coffee E-Commerce Platform

A production-oriented full-stack e-commerce application built for **discovering, reviewing, brewing, and purchasing single-origin coffees** — turning a morning habit into a ritual.

This project demonstrates **secure authentication, real-time inventory, Stripe payment integration, interactive data visualization, scheduled background jobs, and a polished dark-first UX** — not just a product catalog.

---

## 🎯 Project Purpose

Buying specialty coffee online is often disconnected from the experience. Most shops just list beans with no guidance, no brewing support, and no community.

**Roast & Ritual** reimagines the coffee store by:

- guiding customers to their perfect roast through a multi-step **Coffee Quiz**
- showing **flavor profile radar charts** so you know what you're buying
- providing step-by-step **Brew Guides** with a built-in countdown timer
- mapping coffee origins on an **interactive world map**
- offering real-time **WebSocket-driven stock updates**
- delivering a premium **dark-first shopping experience** with smooth micro-interactions

The system was built to simulate **real production e-commerce requirements** — authentication, payments, inventory, background jobs, and admin analytics — while keeping the user experience at the center.

---

## 🚀 Core Features

### Coffee Experience
- **Coffee Quiz** — multi-step sensory finder that matches you to your ideal roast
- **Interactive Origin Map** — Leaflet-powered world map with coffee-growing regions
- **Flavor Profile Radar Charts** — per-product Recharts spider chart (acidity, body, sweetness, bitterness, finish)
- **Brew Guide + Timer** — step-by-step V60, French Press, AeroPress, and Cold Brew guides with circular countdown

### Shopping & Checkout
- **Advanced Search & Filters** — search by name, origin, roast level, price range, with sorting
- **Coupon/Discount System** — percentage and flat discount codes with validation (min order, expiry, max uses)
- **Stripe Checkout** — test-mode payment with full webhook integration, stock decrement, and order creation
- **Abandoned Cart Recovery** — cron-based email reminders for carts untouched >1 hour

### Admin Dashboard
- **Full Product CRUD** — manage inventory, stock, pricing, and featured products
- **Order Management** — view, filter, and manually create orders
- **Customer Analytics** — see total revenue, order volume, top products, and per-customer spending
- **Real-time Notifications** — bell alerts for new orders and low-stock items with 30s polling
- **Coupon Manager** — create, activate/deactivate, and delete promotional codes
- **Admin Order Creation** — manually place orders for any customer with atomic stock decrement

### AI Coffee Assistant
- **Coffee Q&A** — ask questions about origins, brewing methods, roasts, and pairings at `/coffee-ask`
- **RAG architecture** — semantic search finds relevant knowledge, Claude API generates grounded answers
- **Local embeddings** — free Xenova transformer model (runs on-server, no external API needed for search)
- **pgvector search** — vector similarity search in PostgreSQL for accurate content retrieval

### CRM Integration
- **HubSpot sync** — new user registrations automatically create HubSpot contacts
- **Deal tracking** — successful Stripe payments create HubSpot deals (order ID, amount, status)
- **Fire-and-forget** — CRM failures don't block user registration or checkout

### Authentication & Security
- **JWT with refresh rotation** — 15-minute access tokens + 7-day httpOnly refresh cookies
- **Role-based access** — CUSTOMER / ADMIN with middleware-enforced authorization
- **Token refresh interceptor** — silent 401 recovery via `/api/auth/refresh`
- **401 → auto-refresh** — client-side interceptor retries failed requests transparently

### Real-Time
- **WebSocket stock updates** — broadcast to all connected clients when inventory changes
- **Live admin notifications** — new orders and low-stock alerts update every 30 seconds

---

## 🌐 Live Demo

- **Client:** [https://roast-ritual-client.vercel.app](https://roast-ritual-client.vercel.app)
- **API Server:** [https://roast-ritual-186322592106.us-central1.run.app](https://roast-ritual-186322592106.us-central1.run.app)

---

## 🖼️ Screenshots

![Home Page](screenshots/Screenshot%202026-07-13%20181107.png)
<p align="center"><em>Home Page</em></p>

![Home Page](screenshots/Screenshot%202026-07-13%20181217.png)
<p align="center"><em>Home Page</em></p>

![Shop Page](screenshots/Screenshot%202026-07-13%20181304.png)
<p align="center"><em>Shop Page</em></p>

![Shop Page](screenshots/Screenshot%202026-07-13%20181317.png)
<p align="center"><em>Shop Page</em></p>

![Product Detail](screenshots/Screenshot%202026-07-13%20181413.png)
<p align="center"><em>Product Detail</em></p>

![Product Detail](screenshots/Screenshot%202026-07-13%20181453.png)
<p align="center"><em>Product Detail</em></p>

![Coffee Quiz](screenshots/Screenshot%202026-07-13%20181603.png)
<p align="center"><em>Coffee Quiz</em></p>

![Brew Guide](screenshots/Screenshot%202026-07-13%20181655.png)
<p align="center"><em>Brew Guide</em></p>

![Brew Guide](screenshots/Screenshot%202026-07-13%20181707.png)
<p align="center"><em>Brew Guide</em></p>

![Cart & Checkout](screenshots/Screenshot%202026-07-13%20181913.png)
<p align="center"><em>Cart & Checkout</em></p>

![Cart & Checkout](screenshots/Screenshot%202026-07-13%20181945.png)
<p align="center"><em>Cart & Checkout</em></p>

![Admin Dashboard](screenshots/Screenshot%202026-07-13%20182107.png)
<p align="center"><em>Admin Dashboard</em></p>

![Admin Analytics](screenshots/Screenshot%202026-07-13%20182142.png)
<p align="center"><em>Admin Analytics</em></p>

![Admin Orders](screenshots/Screenshot%202026-07-13%20182216.png)
<p align="center"><em>Admin Orders</em></p>

![Our Story](screenshots/Screenshot%202026-07-13%20182357.png)
<p align="center"><em>Our Story</em></p>

![About Page](screenshots/Screenshot%202026-07-13%20182410.png)
<p align="center"><em>About Page</em></p>

![The Process](screenshots/Screenshot%202026-07-13%20182417.png)
<p align="center"><em>The Process</em></p>

![Origin Map](screenshots/Screenshot%202026-07-13%20182428.png)
<p align="center"><em>Origin Map</em></p>

---

## 🏗️ Architecture Overview

The application follows a classic client–server architecture with a monorepo workspace layout.

```
┌─────────────────────────────────────────────────┐
│                 React 19 + Vite                  │
│      Tailwind CSS v4 + Zustand + Recharts       │
└────────────────────┬────────────────────────────┘
                     │ REST + WebSocket
┌────────────────────▼────────────────────────────┐
│              Express 5 + TypeScript              │
│   Routes → Controllers → Services → Prisma      │
│    JWT Auth Middleware + Admin Role Guard        │
├────────────────┬───────────────┬────────────────┤
│                │               │                │
┌──▼──────────┐ ┌▼────────┐ ┌───▼──────┐  ┌─────▼─────┐
│  Neon +    │ │ Claude  │ │ Xenova   │  │ WebSocket │
│  pgvector  │ │ API     │ │ (local)  │  │ (stock)   │
│  (DB + RAG)│ │(answers)│ │(embeddings│ │           │
└─────┬──────┘ └─────────┘ └────┬──────┘  └───────────┘
      │                         │
      └─────── HubSpot ─────────┘
              CRM (contacts + deals)
```

### Key Layers

**Client Layer (React 19 + Vite + Tailwind v4)**
- 37 components across 12 directories + 23 pages
- Zustand stores for auth and cart state management
- Custom fetch wrapper with automatic 401 token refresh
- Recharts for radar and analytics charts
- Leaflet for interactive origin maps
- Custom toast notification system with undo support
- Staggered reveal animations, page fade-ins, and gold shimmer loading states

**API Layer (Express 5 + TypeScript)**
- 31 RESTful endpoints across 8 route modules
- Layered architecture: routes → controllers → services → Prisma
- JWT authentication middleware with admin role guard
- Stripe webhook handler with idempotent transaction processing
- Global error handler middleware

**Data Layer (Prisma + Neon PostgreSQL)**
- 9 models: User, Product, Order, OrderItem, Cart, CartItem, Review, Coupon, RefreshToken
- Unique constraints, cascading deletes, and composite indexes
- Serverless PostgreSQL via Neon adapter with connection pooling
- Decimal values for precise financial calculations

**Real-Time (WebSocket)**
- Native `ws` WebSocket server for stock update broadcasts
- All connected clients receive real-time inventory changes

**Background Processing (node-cron)**
- Every 15 minutes: detect abandoned carts, send recovery emails
- Graceful skip when SMTP is not configured

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| TypeScript 6 | Type safety |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| Zustand 5 | Client-side state management (auth, cart) |
| React Router 7 | Client-side routing (21 routes) |
| Recharts 3 | Interactive charts (radar, line, bar, pie) |
| Leaflet + react-leaflet | Interactive origin map |
| Stripe JS | Payment element integration |
| Anthropic Claude | AI answer generation (coffee Q&A) |
| HubSpot API | CRM integration (contacts, deals) |
| oxlint | Linting |

### Backend

| Technology | Purpose |
|-----------|---------|
| Node.js 22 | Runtime |
| Express 5 | HTTP framework |
| TypeScript 5 | Type safety |
| Prisma 7 | ORM with Neon serverless adapter |
| Neon | Serverless PostgreSQL |
| JSON Web Token | Access + refresh token authentication |
| bcryptjs | Password hashing (12 rounds) |
| Stripe | Payment processing & webhook handling |
| ws | WebSocket server for real-time updates |
| node-cron | Scheduled background jobs |
| nodemailer | Email sending (abandoned cart recovery) |
| @xenova/transformers | Local embedding model for RAG semantic search |
| @anthropic-ai/sdk | Claude API client for AI-powered answers |
| pgvector | Vector similarity search in PostgreSQL |

### Testing

| Technology | Purpose |
|-----------|---------|
| Vitest 4 | Test runner |
| SuperTest | HTTP integration testing (35 API tests) |
| React Testing Library | Component testing (53 component tests) |
| jsdom | DOM environment for component tests |

---

## 🔒 Security Considerations

- **JWT access tokens** (15 min) stored in React memory — not localStorage
- **Refresh tokens** (7 days) in httpOnly cookies — rotated on every refresh
- **Password hashing** via bcrypt with 12 salt rounds
- **Admin role guard** — middleware checks user role against database on every protected route
- **401 auto-refresh** — client interceptor retries failed requests transparently without user disruption
- **Cart ownership verification** — user A cannot modify user B's cart items
- **Order isolation** — users can only view their own orders (admins can view all)
- **Input validation** — required fields, email normalization, rating bounds, stock checks
- **CORS** — restricted to configured client origin
- **Stripe webhook** — signature verification on every event
- **Rate limiting** — brute-force protection on auth endpoints
- **Test coverage** — 111 tests verify security boundaries (unauthorized access, role enforcement, ownership checks)

---

## 📊 Testing

**111 tests across 12 test files — all passing.**

| Layer | Tests | Tools |
|-------|-------|-------|
| API Integration | 35 | Vitest + SuperTest (auth, products, cart, orders, reviews, admin, middleware) |
| State Stores | 24 | Vitest (authStore, cartStore) |
| UI Components | 29 | Vitest + React Testing Library (Button, Toast, ErrorBoundary, NotFoundPage, ProductCard, CartItem) |
| Hooks | 6 | Vitest + React Testing Library (useSocket) |
| Utilities | 17 | Vitest (API client, quiz match logic) |

```bash
# Run all tests
npm test

# API tests only
cd server && npx vitest run

# Client tests only
cd client && npx vitest run
```

---

## ✨ UX Polish

**26 micro-interactions and UX improvements across 3 phases:**

| Phase | Items | Focus |
|-------|-------|-------|
| 1 | 10 | Page fade-ins, add-to-cart bounce, gold shimmer loading, toast slide-in, star hover, stagger reveal, nav underline, timer glow |
| 2 | 9 | Add-to-cart loading state, undo toast, quiz slide transition, bell shake, back-to-top button, focus-visible rings, image lazy load |
| 3 | 5 | Hero parallax, order status progress bar, review stagger, coupon success animation, mobile swipe gesture |

---

## ▶️ Running Locally

### Prerequisites

- Node.js 22+
- A Neon PostgreSQL database (free at [neon.tech](https://neon.tech))

### 1️⃣ Clone & Install

```bash
git clone <repo-url>
cd roast-ritual
npm install
```

### 2️⃣ Set up environment variables

```bash
cp server/.env.example server/.env
# Edit server/.env with your database URL and secrets
```

### 3️⃣ Push database schema

```bash
cd server
npx prisma db push
npx tsx prisma/seed.ts
```

### 4️⃣ Start both servers

```bash
# From root — starts API + client concurrently
npm run dev
```

Or start them separately:

```bash
cd server && npm run dev    # Express API on port 4000
cd client && npm run dev    # Vite dev server on port 5173
```

Open `http://localhost:5173` — the app is fully functional.

---

## ⚙️ Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|:--------:|---------|-------------|
| `DATABASE_URL` | Yes | — | Neon PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Yes | — | Neon direct connection (non-pooled, for migrations) |
| `JWT_SECRET` | Yes | — | Access token signing secret (64+ chars) |
| `JWT_REFRESH_SECRET` | Yes | — | Refresh token signing secret (64+ chars) |
| `PORT` | No | `4000` | Server port |
| `NODE_ENV` | No | `development` | Environment |
| `CLIENT_URL` | Yes | `http://localhost:5173` | Frontend origin for CORS |
| `STRIPE_SECRET_KEY` | Yes | — | Stripe secret key (test mode) |
| `STRIPE_WEBHOOK_SECRET` | Yes | — | Stripe webhook signing secret |
| `SMTP_HOST` | No | — | SMTP server for abandoned cart emails |
| `SMTP_PORT` | No | `587` | SMTP port |
| `SMTP_USER` | No | — | SMTP username |
| `SMTP_PASS` | No | — | SMTP password |
| `EMAIL_FROM` | No | — | From address for emails |
| `ANTHROPIC_API_KEY` | No | — | Claude API key for AI coffee Q&A |
| `HUBSPOT_API_KEY` | No | — | HubSpot API key for CRM sync |

### Client (`client/.env`)

| Variable | Required | Default | Description |
|----------|:--------:|---------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Yes | — | Stripe publishable key (test mode) |
| `VITE_WS_URL` | No | `ws://hostname:4000` | WebSocket server URL |
| `VITE_API_URL` | No | auto-detected | API server URL (auto-detects Cloud Run in production) |

---

## 👤 Author Note

Built with a production mindset, focusing on **real-world e-commerce requirements** — secure authentication, payment processing, inventory management, scheduled background jobs, admin analytics, and a polished dark-first user experience.

This project demonstrates applied full-stack engineering with **Stripe integration, WebSocket real-time updates, JWT rotation, CI-tested code (111 tests), and 26 UX micro-interactions** — reflecting real production scenarios beyond basic CRUD applications.

---

Built by [Mihail Todorov](https://github.com/Misho-1019)
