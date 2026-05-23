import Link from 'next/link'; import { mixes } from '@/lib/mock-data';
export default function Page(){return <main className='p-8'><h1 className='text-3xl'>Mixes</h1>{mixes.map(m=><Link key={m.slug} className='block mt-3 underline' href={`/mixes/${m.slug}`}>{m.title} · {m.genre}</Link>)}</main>}
