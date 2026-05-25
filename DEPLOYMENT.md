# Dead Air Radio - Production Environment

## Quick Deploy Options

### **Option 1: Vercel (Easiest)**
```bash
npm i -g vercel
vercel
```
Then connect your GitHub repo - automatic deployments on every push.

---

### **Option 2: Railway**
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select `firozberly/Dead-Air-Radio`
4. Add environment variables (see below)
5. Deploy

---

### **Option 3: Docker (Self-Hosted)**
```bash
docker build -t dead-air-radio .
docker run -p 3000:3000 dead-air-radio
```

---

## Required Environment Variables

Create a `.env.production` file:

```env
# Database (PostgreSQL recommended)
DATABASE_URL=postgresql://user:password@host:5432/dead-air-radio

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Audio Streaming
LIVE_STREAM_URL=https://stream.yourdomain.com/live

# Object Storage (S3 or compatible)
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

---

## Production Checklist

- [ ] Database setup (PostgreSQL)
- [ ] Stripe Connect account configured
- [ ] Auth provider credentials (GitHub/Google/etc)
- [ ] S3/Object storage bucket created
- [ ] Stream server deployed (Icecast/AzuraCast)
- [ ] Environment variables added to hosting platform
- [ ] SSL certificate (auto-handled by most platforms)
- [ ] DNS configured to point to deployment

---

## Build & Start

```bash
# Install deps
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Build for production
npm run build

# Start server
npm start
```

---

## Recommended Stack for Production

| Component | Service | Plan |
|-----------|---------|------|
| **Hosting** | Vercel or Railway | Hobby ($5-15/mo) |
| **Database** | PostgreSQL (Supabase/Railway) | Free tier + $25/mo |
| **Auth** | NextAuth + OAuth | Free |
| **Payments** | Stripe Connect | Free + 2.9% + $0.30 |
| **Storage** | S3 or Backblaze B2 | Pay-as-you-go |
| **Streaming** | AzuraCast (self-hosted) or Shoutcast | Free or $50-100/mo |

**Total Monthly Cost: $25-40/month starting**

