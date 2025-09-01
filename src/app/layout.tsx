'use client';

import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || process.env.STRIPE_PUBLIC_KEY || '');


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-neutral-50 text-neutral-900">
<Elements stripe={stripePromise}>
<div className="flex min-h-screen">
<aside className="w-64 hidden md:block bg-white border-r">
<div className="p-4 font-semibold">Hardware IMS</div>
<nav className="space-y-1 p-2">
{[
['Dashboard','/'],
['Items','/items'],
['New Item','/items/new'],
['Purchase Order','/po/new'],
['Receive (GRN)','/grn/new'],
['POS','/pos'],
['Returns','/returns/new'],
['Reports','/reports/sales'],
].map(([label, href]) => (
<Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-neutral-100">
{label}
</Link>
))}
</nav>
</aside>
<main className="flex-1 p-4 md:p-6">{children}</main>
</div>
</Elements>
</body>
</html>
);
}