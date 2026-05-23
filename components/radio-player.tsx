'use client';
import { radio } from '@/lib/mock-data';
export function RadioPlayer() {
  return <div className="fixed bottom-0 left-0 right-0 border-t border-ink/30 bg-black/80 p-3 text-xs backdrop-blur" aria-label="Persistent radio player"><div className="flex items-center justify-between"><div><p>NOW: {radio.nowPlaying}</p><p className="opacity-70">SHOW: {radio.currentShow}</p></div><a className="border px-3 py-1 hover:bg-ink hover:text-black" href={radio.streamUrl}>Listen Live</a></div></div>;
}
