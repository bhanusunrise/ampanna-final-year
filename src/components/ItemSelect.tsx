'use client';
import { useEffect, useState } from 'react';
import { Item } from '@/lib/types';


export default function ItemSelect({ value, onChange, q="" }: { value?: string; onChange: (v: string) => void; q?: string }) {
const [items, setItems] = useState<Item[]>([]);
useEffect(() => { fetch('/api/items' + (q?`?q=${encodeURIComponent(q)}`:''))
.then(r=>r.json()).then(d=>setItems(d.data)); }, [q]);
return (
<select className="w-full rounded border p-2" value={value} onChange={(e)=>onChange(e.target.value)}>
<option value="">Select item…</option>
{items.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
</select>
);
}