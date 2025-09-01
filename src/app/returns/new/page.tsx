'use client';
import { useState } from 'react';
import ItemSelect from '@/components/ItemSelect';
import { jpost } from '@/lib/api';
type RItem = { billId: string; itemId: string; baseQty: number; reason?: string };


export default function NewReturn(){
const [type,setType]=useState<'Cashback'|'Exchange'|'LoanerReplaceDeliver'>('Cashback');
const [items,setItems]=useState<RItem[]>([]);
const [exchange,setExchange]=useState<{ itemId: string; baseQty: number }[]>([]);
const [msg,setMsg]=useState('');


function add(){ setItems(p=>[...p,{ billId:'', itemId:'', baseQty:1 }]); }
function upd(i:number,patch:Partial<RItem>){ setItems(r=>r.map((x,idx)=> idx===i? { ...x,...patch }:x)); }
function del(i:number){ setItems(r=>r.filter((_,idx)=>idx!==i)); }


async function submit(){
try { await jpost('/api/returns', { type, items, exchangeItems: exchange }); setMsg('Return created ✓'); }
catch(e:any){ setMsg(e.message); }
}


return (
<div className="max-w-4xl space-y-3">
<h1 className="text-2xl font-semibold">New Return</h1>
<div className="flex gap-4">
{(['Cashback','Exchange','LoanerReplaceDeliver'] as const).map(t=> (
<label key={t} className="flex items-center gap-2"><input type="radio" checked={type===t} onChange={()=>setType(t)} /> {t}</label>
))}
</div>
<div className="rounded-2xl border p-3 bg-white">
{items.map((l,i)=> (
<div key={i} className="grid md:grid-cols-5 gap-2 items-center py-1">
<input className="rounded border p-2" placeholder="Bill Id" value={l.billId} onChange={e=>upd(i,{ billId:e.target.value })} />
<ItemSelect value={l.itemId} onChange={v=>upd(i,{ itemId:v })} />
<input type="number" className="rounded border p-2" placeholder="Base Qty" value={l.baseQty} onChange={e=>upd(i,{ baseQty:Number(e.target.value) })} />
<input className="rounded border p-2" placeholder="Reason" value={l.reason||''} onChange={e=>upd(i,{ reason:e.target.value })} />
<button className="text-red-600" onClick={()=>del(i)}>Remove</button>
</div>
))}
<button className="mt-2 rounded bg-black px-3 py-2 text-white" onClick={add}>Add Item</button>
</div>
{type==='Exchange' && (
<div className="rounded-2xl border p-3 bg-white">
<h3 className="font-medium mb-2">Exchange Items (to give)</h3>
{exchange.map((e,i)=> (
<div key={i} className="grid md:grid-cols-4 gap-2 items-center py-1">
<ItemSelect value={e.itemId} onChange={v=> setExchange(r=> r.map((x,idx)=> idx===i? { ...x, itemId:v } : x)) } />
<input type="number" className="rounded border p-2" value={e.baseQty} onChange={ev=> setExchange(r=> r.map((x,idx)=> idx===i? { ...x, baseQty:Number(ev.target.value) } : x)) } />
<button className="text-red-600" onClick={()=> setExchange(r=> r.filter((_,idx)=> idx!==i))}>Remove</button>
</div>
))}
<button className="mt-2 rounded bg-black px-3 py-2 text-white" onClick={()=> setExchange(p=>[...p,{ itemId:'', baseQty:1 }])}>Add Exchange Line</button>
</div>
)}
<button className="rounded bg-emerald-600 px-4 py-2 text-white" onClick={submit}>Submit Return</button>
<div className="text-sm text-neutral-600">{msg}</div>
</div>
);
}