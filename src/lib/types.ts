export type Unit = { _id: string; name: string; code: string; precision: number };
export type ItemConversion = { unitId: string; toBaseFactor: number; label?: string; defaultSellingPrice: number };
export type Item = { _id: string; name: string; sku?: string; category?: string; baseUnitId: string; conversions: ItemConversion[]; taxRatePct?: number };
export type BillLine = { itemId: string; unitId: string; qty: number; unitToBaseFactor: number; pricePerUnit: number; lineDiscount?: number };