import { posts } from '@/lib/mock-data';
export default function Page(){return <main className='p-8'><h1 className='text-3xl'>Editorial</h1>{posts.map(p=><article key={p.slug} className='mt-3 border p-3'>{p.title}</article>)}</main>}
