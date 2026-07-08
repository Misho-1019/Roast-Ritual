# Roast & Ritual — Project Context

## Brand
- **Name:** Roast & Ritual
- **Tagline:** Turn your coffee into a ritual
- **Goal:** Upwork portfolio — premium coffee e-commerce demonstrating full-stack JS development

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Vite + React 18 + TypeScript + Tailwind CSS |
| State | React Query (server) + Zustand (client) |
| Routing | React Router v6 |
| Backend | Express + TypeScript |
| ORM | Prisma |
| Database | Neon (serverless PostgreSQL, free tier) |
| Auth | JWT access (15m, memory) + refresh (7d, httpOnly cookie) + bcrypt |
| Real-time | Socket.IO |
| Payments | Stripe (test mode) |
| Maps | Leaflet (react-leaflet) |
| Charts | Recharts |
| Design | Google Stitch |
| Monorepo | npm workspaces |

## Project Structure

```
coffee-ecommerce/
├── client/                    # React (Vite)
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   ├── ui/
│       │   ├── home/
│       │   ├── shop/
│       │   ├── product/
│       │   ├── quiz/
│       │   ├── brew/
│       │   ├── cart/
│       │   ├── admin/
│       │   └── auth/
│       ├── pages/
│       ├── hooks/
│       ├── stores/
│       ├── lib/
│       └── types/
├── server/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       ├── services/
│       ├── sockets/
│       └── prisma/
├── shared/
│   └── types/
├── .stitch/
├── CONTEXT.md
├── package.json
├── .gitignore
└── LICENSE
```

## Design System (Dark / Premium)

| Token | Hex | Role |
|---|---|---|
| Background | `#0D0A08` | Near-black with warm tint |
| Surface | `#1C1512` | Cards, sidebars |
| Primary / Gold | `#D4A04A` | CTAs, highlights, accents |
| Chestnut | `#7C4F34` | Secondary elements, borders |
| Caramel | `#A67B5B` | Tertiary accents |
| Text primary | `#F5F0EB` | Warm cream body text |
| Text secondary | `#B8A89A` | Captions, metadata |
| Error / Sale | `#C85A3E` | Badges, errors |

**Font:** Inter (headline + body)
**Roundness:** `rounded-lg`
**Mode:** Dark-first with light mode toggle

## Prisma Schema

### Enums
- **Role:** CUSTOMER, ADMIN
- **RoastLevel:** LIGHT, MEDIUM, MEDIUM_DARK, DARK
- **OrderStatus:** PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- **CouponType:** PERCENTAGE, FLAT

### Models
1. **User** — id, email, passwordHash, name, role, createdAt, updatedAt
2. **RefreshToken** — id, token, userId, expiresAt, createdAt (Cascade delete on User)
3. **Product** — id, name, slug, description, price, compareAtPrice?, imageUrl, stock, roastLevel, origin, flavorNotes(JSON), isFeatured, createdAt, updatedAt
4. **Review** — id, rating, title?, body?, productId, userId, createdAt
5. **Order** — id, userId, status, total, discountAmount, couponId?, shippingAddress(JSON), createdAt, updatedAt
6. **OrderItem** — id, orderId, productId, quantity, unitPrice
7. **Cart** — id, userId(unique), createdAt, updatedAt
8. **CartItem** — id, cartId, productId, quantity
9. **Coupon** — id, code, type, value, minOrder?, maxUses?, usedCount, expiresAt?, isActive

## Environment Variables

```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.[region].aws.neon.tech/[dbname]?sslmode=require"
DIRECT_URL="postgresql://[user]:[password]@[endpoint].[region].aws.neon.tech/[dbname]?sslmode=require"
JWT_SECRET="<random-64-char>"
JWT_REFRESH_SECRET="<random-64-char>"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=4000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="..."
EMAIL_FROM="noreply@roastandritual.com"
```

## Auth Strategy

- Access token (15 min) stored in React state — sent via `Authorization: Bearer` header
- Refresh token (7 days) in httpOnly cookie — rotated on each refresh
- Login → sets cookie + returns user + access token
- 401 → client calls `/api/auth/refresh` → new access + rotated refresh
- Logout → clears cookie + deletes refresh token from DB
- Page load → `GET /api/auth/me` validates cookie, returns user if valid

## Features

### Coffee-Specific
- Coffee Quiz — multi-step "Find Your Perfect Roast"
- Interactive Origin Map — clickable world map with coffee regions
- Flavor Profile Radar Charts — per-product spider chart
- Brew Guide + Timer — step-by-step guides with countdown

### Technical Showcases
- Admin Dashboard — CRUD products, view orders, analytics charts
- Real-time Inventory — WebSocket-driven stock updates
- Dark Mode — coffee-themed light/dark toggle with persistence
- Advanced Search — full-text search with filters + autocomplete

### Business Features
- Coupon/Discount System — promo codes, percentage/flat discounts
- Abandoned Cart Recovery — detect + email reminder

## Pages (Stitch Screens)

Home, Shop, Product Detail, Coffee Quiz, Brew Guides, Cart, Checkout, Login, Register, Admin Dashboard, Order History

## Execution Rhythm

For each phase:
1. Load stitch-loop → generate Stitch screen(s)
2. Run stitch-to-react → convert to .tsx components
3. Add business logic (API, state, routing)
4. Stop — present commit name to user
5. User commits manually with `git add . && git commit -m "name"`
6. Next phase begins

## Commit Plan

### Phase 0 — Init
1. `init: workspace` — root package.json, CONTEXT.md ← **YOU ARE HERE**
2. `init: client scaffold` — Vite + React + TS + Tailwind (hello-world)
3. `init: server scaffold` — Express + TS (hello-world)
4. `init: prisma schema` — All DB models + migration
5. `init: shared types` — TypeScript interfaces for client/server

### Phase 1 — Home + Auth
6. `design + feat: home page`
7. `design: auth pages`
8. `feat: auth API`
9. `feat: auth integration`

### Phase 2 — Admin + Products
10. `feat: product API`
11. `design: admin dashboard`
12. `feat: admin dashboard`

### Phase 3 — Shop
13. `design: shop + product detail`
14. `feat: shop + search`
15. `feat: product detail`

### Phase 4 — Cart + Checkout
16. `design: cart + checkout`
17. `feat: cart + coupons`
18. `feat: checkout + stripe`
19. `feat: order history`

### Phase 5 — Interactive
20. `design: quiz + brew guides`
21. `feat: coffee quiz`
22. `feat: brew guide + timer`
23. `feat: flavor charts + origin map`

### Phase 6 — Polish
24. `feat: real-time inventory`
25. `feat: dark mode`
26. `feat: abandoned cart`
27. `feat: admin analytics`
28. `polish: final touches`
