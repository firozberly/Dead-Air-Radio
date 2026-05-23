import { mixes } from '@/lib/mock-data';
export default function Page({params}:{params:{slug:string}}){const mix=mixes.find(m=>m.slug===params.slug); if(!mix) return <main className='p-8'>Not found</main>; return <main className='p-8'><h1 className='text-3xl'>{mix.title}</h1><p>Curator: {mix.curator}</p></main>;}
