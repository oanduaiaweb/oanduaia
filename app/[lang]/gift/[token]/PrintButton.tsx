'use client'

export default function PrintButton({ label }: { label: string }) {
  return <button type="button" className="btn-dark voucher-print" onClick={() => window.print()}>{label}</button>
}
