'use client';
import { useState } from 'react';
import POSCart from '@/components/POSCart';
import { jpost } from '@/lib/api';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


export default function POSPage(){
const stripe = useStripe();
const elements = useElements();
const [method,setMethod]=useState<'Cash'|'Online'>('Cash');
const [msg,setMsg]=useState('');


async function checkout(payload:any){
try {
let onlineRef: string | undefined;
if (method==='Online') {
// create intent (amount in smallest currency unit)
const amount = Math.round(payload.grandTotal * 100);
const intent = await fetch('/api/payments/stripe/create-intent', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount, description: 'POS Sale' }) }).then(r=>r.json());
const card = elements?.getElement(CardElement);
const { paymentIntent, error } = await stripe!.confirmCardPayment(intent.clientSecret, { payment_method: { card: card! } });
if (error) throw new Error(error.message);
if (!paymentIntent) throw new Error('Payment failed');
onlineRef = paymentIntent.id;
}


const billNo = 'BILL-' + Date.now();
const data = await jpost('/api/bills', { billNo, items: payload.items, paymentMethod: method, onlineRef, subTotal: payload.subTotal, tax: payload.tax, discount: payload.discount, grandTotal: payload.grandTotal }) as { billNo: string };
setMsg(`Sale completed ✓ Bill: ${data.billNo}`);
} catch(e:any){ setMsg(e.message); }
}


return (
<div className="max-w-5xl space-y-4">
<h1 className="text-2xl font-semibold">POS</h1>
<div className="flex items-center gap-4">
<label className="flex items-center gap-2"><input type="radio" checked={method==='Cash'} onChange={()=>setMethod('Cash')} /> Cash</label>
<label className="flex items-center gap-2"><input type="radio" checked={method==='Online'} onChange={()=>setMethod('Online')} /> Online (Stripe)</label>
</div>
{method==='Online' && (
<div className="rounded-2xl border bg-white p-4"><CardElement options={{ hidePostalCode: true }} /></div>
)}
<POSCart onCheckout={checkout} />
<div className="text-sm text-neutral-600">{msg}</div>
</div>
);
}