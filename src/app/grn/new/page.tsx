'use client';
import { useState } from 'react';
import ItemSelect from '@/components/ItemSelect';
import { jpost } from '@/lib/api';


type RLine = { itemId: string; baseQty: number; costPerBase: number; batchNo?: string };


export default function NewGRN(){
const [poId,setPO]=useState('');
const [supplierId,setSupplier]=useState('');
const [items,setItems]=useState<RLine[]>([]);
const [msg,setMsg]=useState('');


function add(){ setItems(p=>[...p,{ itemId:'', baseQty:0, costPerBase:0 }]); }
function upd(i:number, patch:Partial<RLine>){ setItems(r=>r.map((x,idx)=> idx===i? { ...x, ...patch }: x)); }
function del(i:number){ setItems(r=>r.filter((_,idx)=>idx!==i)); }


async function submit(){
try { await jpost('/api/grn', { poId, supplierId, items }); setMsg('GRN posted ✓'); }
catch(e:any){ setMsg(e.message); }
}


return (
<div className="max-w-4xl space-y-3">
<h1 className="text-2xl font-semibold">Receive Goods (GRN)</h1>
<input className="rounded border p-2" placeholder="PO Id" value={poId} onChange={e=>setPO(e.target.value)} />
<input className="rounded border p-2" placeholder="Supplier Id" value={supplierId} onChange={e=>setSupplier(e.target.value)} />
<div className="rounded-2xl border p-3 bg-white">
{items.map((l,i)=> (
<div key={i} className="grid md:grid-cols-5 gap-2 items-center py-1">
<ItemSelect value={l.itemId} onChange={v=>upd(i,{ itemId:v })} />
<input type="number" className="rounded border p-2" placeholder="Base Qty" value={l.baseQty} onChange={e=>upd(i,{ baseQty:Number(e.target.value) })} />
<input type="number" step="0.01" className="rounded border p-2" placeholder="Cost/Base" value={l.costPerBase} onChange={e=>upd(i,{ costPerBase:parseFloat(e.target.value) })} />
<input className="rounded border p-2" placeholder="Batch No" value={l.batchNo||''} onChange={e=>upd(i,{ batchNo:e.target.value })} />
<button className="text-red-600" onClick={()=>del(i)}>Remove</button>
</div>
))}
<button className="mt-2 rounded bg-black px-3 py-2 text-white" onClick={add}>Add Line</button>
</div>
<button className="rounded bg-emerald-600 px-4 py-2 text-white" onClick={submit}>Post GRN</button>
<div className="text-sm text-neutral-600">{msg}</div>
</div>
);
}