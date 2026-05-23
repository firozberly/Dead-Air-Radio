import { products } from '@/lib/mock-data';
export default function Page(){return <main className='p-8'><h1 className='text-3xl'>Curated Shop</h1>{products.map(p=><div key={p.slug} className='mt-3 border p-3'>{p.title} ${p.price}</div>)}</main>}
