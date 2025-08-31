'use client';
import { useState } from 'react';


export default function SalesReport(){
const [from,setFrom]=useState('');
const [to,setTo]=useState('');
function download(){
const url = `/api/reports/sales?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
window.location.href = url;
}
return (
<div className="max-w-xl space-y-3">
<h1 className="text-2xl font-semibold">Sales Report (CSV)</h1>
<input type="date" className="rounded border p-2 w-full" value={from} onChange={e=>setFrom(e.target.value)} />
<input type="date" className="rounded border p-2 w-full" value={to} onChange={e=>setTo(e.target.value)} />
<button onClick={download} className="rounded bg-black px-4 py-2 text-white">Download</button>
</div>
);
}