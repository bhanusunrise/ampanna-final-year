import { ReactNode } from 'react';
export default function Section({ title, children }: { title: string; children: ReactNode }) {
return (
<section className="mb-6">
<h2 className="text-lg font-semibold mb-3">{title}</h2>
<div className="rounded-2xl border bg-white p-4">{children}</div>
</section>
);
}