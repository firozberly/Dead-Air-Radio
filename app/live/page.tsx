import { radio } from '@/lib/mock-data';
export default function Page(){return <main className='p-8'><h1 className='text-3xl'>Live Radio</h1><p>{radio.currentShow}</p><p>Next: {radio.nextShow}</p></main>}
