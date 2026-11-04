import { put, get, BlobNotFoundError } from '@vercel/blob'
import { PRODUCTS, type Product } from './products'

/**
 * What Mikk changes from /admin without a deploy: each product's price, its option prices and
 * whether it is shown at all. Everything else (copy, photos) stays in lib/products.ts.
 */
const PATH = 'products/settings.json'

export type ProductSetting = { price?: number; options?: Record<string, number>; hidden?: boolean }
export type ProductSettings = { version: 1; items: Record<string, ProductSetting> }

export async function readProductSettings(): Promise<ProductSettings> {
  try {
    const res = await get(PATH, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return { version: 1, items: {} }
    const parsed = JSON.parse(await new Response(res.stream).text()) as ProductSettings
    parsed.items ??= {}
    return parsed
  } catch (err) {
    if (err instanceof BlobNotFoundError) return { version: 1, items: {} }
    console.error('[products] settings read failed:', err)
    return { version: 1, items: {} }
  }
}

export async function writeProductSettings(s: ProductSettings): Promise<void> {
  await put(PATH, JSON.stringify(s, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  })
}

export type LiveProduct = Product & { hidden: boolean }

/** The catalogue as the site should show it: code defaults with the admin's prices laid over. */
export function applySettings(s: ProductSettings): LiveProduct[] {
  return PRODUCTS.map(p => {
    const set = s.items[p.slug] ?? {}
    return {
      ...p,
      price: set.price ?? p.price,
      options: p.options.map(o => ({ ...o, price: set.options?.[o.id] ?? o.price })),
      hidden: set.hidden ?? !!p.hidden,
    }
  })
}

export async function liveProducts(): Promise<LiveProduct[]> {
  return applySettings(await readProductSettings())
}

/** A whole-euro amount an admin can type: 0 … 100 000. */
export const validEuros = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 100000
