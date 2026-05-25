# Dead Air Radio

**Underground Radio + Art Archive**

A decentralized platform for independent radio stations, sonic experiments, and the artists behind them.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth v5
- **Styling:** TailwindCSS
- **Payments:** Stripe Connect
- **UI Icons:** Lucide React

## Quick Start

### Local Development

```bash
# 1. Clone and install
git clone https://github.com/firozberly/Dead-Air-Radio.git
cd Dead-Air-Radio
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Setup database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### With Docker

```bash
docker-compose up
```

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables from `.env.example`
5. Deploy!

**Auto-deploys on every git push to main**

### Railway / Docker

See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
LIVE_STREAM_URL=https://stream.yourdomain.com/live
```

## Project Structure

```
app/              # Next.js pages & API routes
├── api/          # Backend APIs
├── page.tsx      # Landing page
├── layout.tsx    # Root layout
└── ...
components/       # React UI components
├── radio-player.tsx
└── ...
lib/              # Utilities & domain logic
├── mock-data.ts
├── payments/     # Stripe integration
└── ...
prisma/           # Database schema
├── schema.prisma
└── seed.ts
```

## Key Features

- **🎙️ Radio Player** - Persistent player with metadata
- **🎵 Artist Profiles** - Creator tools & payouts
- **🛒 E-Commerce** - Sell mixes, albums, merch
- **📝 Editorial** - Blog & scene reports
- **💳 Payments** - Stripe Connect split payments
- **🔐 Auth** - NextAuth with OAuth providers
- **📊 Dashboard** - Creator analytics (coming soon)

## Contributing

Open to contributions! See issues for open tasks.

## License

MIT
