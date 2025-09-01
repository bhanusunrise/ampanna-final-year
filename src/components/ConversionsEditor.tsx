'use client';
import { useState } from 'react';
import UnitSelect from './UnitSelect';
import { ItemConversion } from '@/lib/types';


export default function ConversionsEditor({ onChange }: { onChange: (rows: ItemConversion[]) => void }) {
const [rows, setRows] = useState<ItemConversion[]>([]);
function pushRow() {
const next = [...rows, { unitId: '', toBaseFactor: 1, defaultSellingPrice: 0 } as any];
setRows(next); onChange(next);
}
function setRow(i:number, patch: Partial<ItemConversion>) {
const next = rows.map((r,idx)=> idx===i? { ...r, ...patch } : r);
setRows(next); onChange(next);
}
function del(i:number) { const next = rows.filter((_,idx)=>idx!==i); setRows(next); onChange(next); }
return (
<div className="space-y-2">
{rows.map((r,i)=> (
<div key={i} className="grid md:grid-cols-4 gap-2 items-center">
<UnitSelect value={r.unitId} onChange={(v)=>setRow(i,{ unitId: v })} />
<input type="number" step="0.0001" className="rounded border p-2" placeholder="toBaseFactor" value={r.toBaseFactor}
onChange={e=>setRow(i,{ toBaseFactor: parseFloat(e.target.value) })} />
<input type="number" step="0.01" className="rounded border p-2" placeholder="price" value={r.defaultSellingPrice}
onChange={e=>setRow(i,{ defaultSellingPrice: parseFloat(e.target.value) })} />
<button className="text-red-600" onClick={()=>del(i)}>Remove</button>
</div>
))}
<button className="rounded bg-black px-3 py-2 text-white" onClick={pushRow}>Add Conversion</button>
</div>
);
}