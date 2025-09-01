'use client';
import { useEffect, useState } from 'react';
import { Unit } from '@/lib/types';


export default function UnitSelect({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
const [units, setUnits] = useState<Unit[]>([]);
useEffect(() => { fetch('/api/units').then(r=>r.json()).then(d=>setUnits(d.data)); }, []);
return (
<select className="w-full rounded border p-2" value={value} onChange={(e)=>onChange(e.target.value)} name="unit">
<option value="">Select unit…</option>
{units.map(u => <option key={u._id} value={u._id}>{u.name} ({u.code})</option>)}
</select>
);
}