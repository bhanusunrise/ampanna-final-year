'use client';
import { useEffect, useState } from 'react';


type Dash = { revenueMonth: number; cogsMonth: number };


export default function Dashboard() {
const [data, setData] = useState<Dash | null>(null);
useEffect(() => { fetch('/api/reports/dashboard').then(r=>r.json()).then(res=>setData(res.data)); }, []);
return (
<div className="grid gap-4 md:grid-cols-3">
<div className="rounded-2xl border bg-white p-6">
<div className="text-sm text-neutral-500">Revenue (Month)</div>
<div className="mt-2 text-3xl font-semibold">{data ? data.revenueMonth.toFixed(2) : '…'}</div>
</div>
<div className="rounded-2xl border bg-white p-6">
<div className="text-sm text-neutral-500">COGS (Month)</div>
<div className="mt-2 text-3xl font-semibold">{data ? data.cogsMonth.toFixed(2) : '…'}</div>
</div>
<div className="rounded-2xl border bg-white p-6">
<div className="text-sm text-neutral-500">Gross Profit</div>
<div className="mt-2 text-3xl font-semibold">{data ? (data.revenueMonth - data.cogsMonth).toFixed(2) : '…'}</div>
</div>
</div>
);
}