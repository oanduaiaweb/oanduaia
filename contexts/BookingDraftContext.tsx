'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

/**
 * What the availability calendar hands to the enquiry form.
 *
 * The two sit in different sections and neither owns the other, so the selection travels
 * through here rather than through props or a DOM event. `stamp` changes on every request
 * so that pressing the button twice still refills the form.
 */
export type BookingDraft = { dates: string; message: string; stamp: number }

type Ctx = { draft: BookingDraft | null; request: (d: Omit<BookingDraft, 'stamp'>) => void }

const DraftCtx = createContext<Ctx>({ draft: null, request: () => {} })

export function BookingDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft | null>(null)
  const request = (d: Omit<BookingDraft, 'stamp'>) => setDraft({ ...d, stamp: Date.now() })
  return <DraftCtx.Provider value={{ draft, request }}>{children}</DraftCtx.Provider>
}

export const useBookingDraft = () => useContext(DraftCtx)
