# Dead Air Radio MVP

## Implementation plan (Phase 1)
1. Build a high-fidelity public frontend artifact with underground/terminal aesthetics.
2. Add persistent radio player and mock metadata-driven pages.
3. Scaffold private role-based dashboard modules.
4. Define API-first route surfaces for public + dashboard operations.
5. Define Prisma data model for radio, editorial, commerce, payouts, and audit trails.
6. Add payment provider abstraction with Stripe Connect adapter placeholder.
7. Document object storage, workers, and streaming architecture for production rollout.

## Proposed file structure
- `app/*`: Next.js App Router pages and API routes.
- `components/*`: Reusable UI blocks (player, cards, shells).
- `lib/*`: Core domain logic (validation, payments, radio, storage, workers).
- `prisma/*`: Data schema + seed.

## Local setup
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

## Environment
See `.env.example` for required keys: database, auth, stripe, object storage, stream URL.

## Streaming architecture notes
- **Do not** stream full audio files through Next.js runtime.
- Use object storage for asset origin with signed URLs.
- Run a dedicated stream engine (Icecast / AzuraCast / LibreTime / FFmpeg worker).
- Web app consumes:
  - `LIVE_STREAM_URL` for audio playback
  - `/api/radio/metadata` for now playing/current show/next show.

## Worker architecture (placeholder)
- Queue job on upload.
- Worker transcodes to MP3/AAC renditions.
- Worker generates waveform JSON.
- Worker updates track metadata records.

## Payments
- Current scaffold: modular split-payment provider interface in `lib/payments/provider.ts`.
- Stripe Connect adapter included as placeholder.
- Future providers (Razorpay Route/Cashfree Split/etc.) can implement same interface.

## Rights and moderation flow
Upload/submission flows require `rightsConfirmed=true` and include moderation statuses in schema for curator review.
