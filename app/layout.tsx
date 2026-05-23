import './globals.css';
import { RadioPlayer } from '@/components/radio-player';
import Link from 'next/link';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="scanlines pb-20"><header className="border-b border-ink/30 p-4 text-sm"><nav className="flex gap-4"><Link href="/">root</Link><Link href="/live">live</Link><Link href="/mixes">mixes</Link><Link href="/blog">blog</Link><Link href="/shop">shop</Link><Link href="/dashboard">dashboard</Link></nav></header>{children}<RadioPlayer /></body></html>;
}
