'use client';
import { useEffect, useMemo, useState } from 'react';
import ItemSelect from './ItemSelect';
import UnitSelect from './UnitSelect';
import { Item, BillLine } from '@/lib/types';

export default function POSCart({ onCheckout }: { onCheckout: (payload: { items: BillLine[], subTotal:number, tax:number, discount:number, grandTotal:number }) => void }) {
const [catalog, setCatalog] = useState<Item[]>([]);
const [lines, setLines] = useState<BillLine[]>([]);
const [discount,setDiscount]=useState(0);
const TAX = 0; // adjust if needed


useEffect(()=>{ fetch('/api/items').then(r=>r.json()).then(d=>setCatalog(d.data)); },[]);


function addLine(){ setLines(p=>[...p,{ itemId:'', unitId:'', qty:1, unitToBaseFactor:1, pricePerUnit:0, lineDiscount:0 }]); }
function upd(i:number, patch: Partial<BillLine>){ setLines(r=>r.map((x,idx)=> idx===i? { ...x, ...patch }: x)); }
function del(i:number){ setLines(r=>r.filter((_,idx)=>idx!==i)); }


// auto update unitToBaseFactor & price when item/unit changes
function onItemChange(i:number, itemId:string){
const it = catalog.find(c=>c._id===itemId);
const conv = it?.conversions?.[0];
upd(i, { itemId, unitId: conv?.unitId || '', unitToBaseFactor: conv?.toBaseFactor || 1, pricePerUnit: conv?.defaultSellingPrice || 0 });
}
function onUnitChange(i:number, unitId:string){
const item = catalog.find(c=>c._id===lines[i].itemId);
const conv = item?.conversions.find(c=>c.unitId===unitId);
if (conv) upd(i, { unitId, unitToBaseFactor: conv.toBaseFactor, pricePerUnit: conv.defaultSellingPrice });
}


const subTotal = useMemo(()=> lines.reduce((s,l)=> s + (l.qty * l.pricePerUnit - (l.lineDiscount||0)), 0), [lines]);
const tax = useMemo(()=> subTotal * TAX, [subTotal]);
const grandTotal = useMemo(()=> subTotal + tax - discount, [subTotal,tax,discount]);

return (
<div>
<div className="rounded-2xl border p-3 bg-white">
{lines.map((l,i)=> (
<div key={i} className="grid md:grid-cols-7 gap-2 items-center py-1">
<ItemSelect value={l.itemId} onChange={(v)=>onItemChange(i,v)} />
<UnitSelect value={l.unitId} onChange={(v)=>onUnitChange(i,v)} />
<input type="number" className="rounded border p-2" value={l.qty} onChange={e=>upd(i,{ qty:Number(e.target.value) })} />
<input type="number" step="0.0001" className="rounded border p-2" value={l.unitToBaseFactor} onChange={e=>upd(i,{ unitToBaseFactor:parseFloat(e.target.value) })} />
<input type="number" step="0.01" className="rounded border p-2" value={l.pricePerUnit} onChange={e=>upd(i,{ pricePerUnit:parseFloat(e.target.value) })} />
<input type="number" step="0.01" className="rounded border p-2" placeholder="Line discount" value={l.lineDiscount||0} onChange={e=>upd(i,{ lineDiscount:parseFloat(e.target.value) })} />
<button className="text-red-600" onClick={()=>del(i)}>Remove</button>
</div>
))}
<button className="mt-2 rounded bg-black px-3 py-2 text-white" onClick={addLine}>Add Item</button>
</div>
<div className="mt-4 grid md:grid-cols-4 gap-3">
<div className="rounded-2xl border bg-white p-4">
<div className="text-sm text-neutral-500">Subtotal</div>
<div className="text-2xl font-semibold">{subTotal.toFixed(2)}</div>
</div>
<div className="rounded-2xl border bg-white p-4">
<div className="text-sm text-neutral-500">Tax</div>
<div className="text-2xl font-semibold">{tax.toFixed(2)}</div>
</div>
<div className="rounded-2xl border bg-white p-4">
<div className="text-sm text-neutral-500">Discount</div>
<input type="number" step="0.01" className="mt-2 w-full rounded border p-2" value={discount} onChange={e=>setDiscount(parseFloat(e.target.value)||0)} />
</div>
<div className="rounded-2xl border bg-white p-4">
<div className="text-sm text-neutral-500">Grand Total</div>
<div className="text-2xl font-semibold">{grandTotal.toFixed(2)}</div>
</div>
</div>
<div className="mt-4 flex gap-2">
<button className="rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>onCheckout({ items: lines, subTotal, tax, discount, grandTotal })}>Checkout</button>
</div>
</div>
);
}