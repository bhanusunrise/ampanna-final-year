'use client';
import { useState } from 'react';
import UnitSelect from '@/components/UnitSelect';
import ConversionsEditor from '@/components/ConversionsEditor';
import { jpost } from '@/lib/api';


export default function NewItem() {
const [name,setName]=useState('');
const [sku,setSku]=useState('');
const [baseUnitId,setBase]=useState('');
const [conversions, setConv] = useState<any[]>([]);
const [msg,setMsg]=useState('');


async function submit() {
try {
const data = await jpost('/api/items', { name, sku, baseUnitId, conversions });
setMsg('Created ✓');
} catch (e:any) { setMsg(e.message); }
}


return (
<div className="max-w-3xl">
<h1 className="text-2xl font-semibold mb-4">New Item</h1>
<div className="space-y-3">
<input className="w-full rounded border p-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<input className="w-full rounded border p-2" placeholder="SKU" value={sku} onChange={e=>setSku(e.target.value)} />
<UnitSelect value={baseUnitId} onChange={setBase} />
<ConversionsEditor onChange={setConv} />
<button onClick={submit} className="rounded bg-black px-4 py-2 text-white">Save</button>
<div className="text-sm text-neutral-600">{msg}</div>
</div>
</div>
);
}