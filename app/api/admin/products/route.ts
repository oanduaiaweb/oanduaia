import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { PRODUCTS } from '@/lib/products'
import { applySettings, readProductSettings, validEuros, writeProductSettings } from '@/lib/productStore'

export const dynamic = 'force-dynamic'

async function authed(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value)
}

const denied = () => NextResponse.json({ error: 'Not authorised' }, { status: 401 })

export async function GET() {
  if (!await authed()) return denied()
  return NextResponse.json({ products: applySettings(await readProductSettings()) })
}

/** One product's price, option prices and visibility. */
export async function POST(req: Request) {
  if (!await authed()) return denied()
  const body = await req.json().catch(() => null)
  const product = PRODUCTS.find(p => p.slug === body?.slug)
  if (!product) return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
  if (!validEuros(body.price)) return NextResponse.json({ error: 'Price must be a whole number of euros' }, { status: 400 })

  const options: Record<string, number> = {}
  for (const o of product.options) {
    const v = body.options?.[o.id]
    if (v === undefined) continue
    if (!validEuros(v)) return NextResponse.json({ error: 'Option prices must be whole euros' }, { status: 400 })
    options[o.id] = v
  }

  const s = await readProductSettings()
  s.items[product.slug] = { price: body.price, options, hidden: !!body.hidden }
  await writeProductSettings(s)
  return NextResponse.json({ products: applySettings(s) })
}
