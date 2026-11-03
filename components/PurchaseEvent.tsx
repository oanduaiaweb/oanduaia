'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

/**
 * GA4's `purchase`, fired once when Stripe sends the payer back with ?paid=1. It is a key
 * event in GA4 by default, which is what Google Ads imports as a conversion — the form send
 * alone cannot tell an enquiry that paid from one that never did.
 */
export default function PurchaseEvent({ id, euros, kind }: { id: string; euros: number; kind: 'booking' | 'gift' }) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('paid') !== '1') return
    const key = `purchase:${id}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {}
    track('purchase', { transaction_id: id, value: euros, currency: 'EUR', kind })
  }, [id, euros, kind])
  return null
}
