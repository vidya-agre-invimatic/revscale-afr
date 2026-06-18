'use client'

import React from 'react'

interface ToggleProps {
  value: 'dashboard' | 'table'
  onChange: (v: 'dashboard' | 'table') => void
}

const OPTIONS: Array<{ id: 'dashboard' | 'table'; label: string }> = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'table',     label: 'Table' },
]

/**
 * Two-state pill toggle for switching between Dashboard and Table views.
 * The active pill has a white background with a shadow; inactive text is muted.
 */
export function Toggle({ value, onChange }: ToggleProps) {
  return (
    <div className="inline-flex items-center bg-sendlytics-grey-100 rounded-lg p-1 gap-1 h-[41px]">
      {OPTIONS.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-4 h-[33px] rounded-md text-xs font-semibold transition-all duration-150 ${
            value === opt.id
              ? 'bg-white shadow-sm text-sendlytics-primary-green'
              : 'bg-transparent text-sendlytics-grey-400 hover:text-sendlytics-text-default'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
