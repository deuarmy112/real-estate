import React from 'react'

export default function Spinner({ size = 36 }: { size?: number }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="spinner" width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="rgba(15,118,110,0.15)" />
        <path d="M45 25a20 20 0 0 0-20-20" strokeWidth="4" stroke="#0f766e" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
