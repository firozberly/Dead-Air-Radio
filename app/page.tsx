import { radio } from '@/lib/mock-data';
export default function Home() {return <main className="p-8"><pre className="text-neon">{`DEAD AIR RADIO\n>> signal acquired`}</pre><h1 className="mt-6 text-4xl">Underground radio + art archive</h1><p className="mt-3 opacity-80">Now playing: {radio.nowPlaying}</p></main>;}
