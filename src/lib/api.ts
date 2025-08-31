export async function jget<T>(url: string): Promise<T> {
const r = await fetch(url, { cache: 'no-store' });
const j = await r.json();
if (!r.ok || j.success === false) throw new Error(j.message || 'Request failed');
return j.data as T;
}


export async function jpost<T>(url: string, body: any): Promise<T> {
const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const j = await r.json();
if (!r.ok || j.success === false) throw new Error(j.message || 'Request failed');
return j.data as T;
}