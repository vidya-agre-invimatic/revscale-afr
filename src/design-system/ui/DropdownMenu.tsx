'use client'

import React, { useRef, useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownMenuProps {
  options: DropdownOption[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
  /** Optional label rendered above the trigger button */
  label?: string
}

/**
 * Single-select dropdown with an optional label, a chevron trigger, and a styled option list.
 * Closes on outside click via useClickOutside.
 */
export function DropdownMenu({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  label,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(ref, close)

  const selected = options.find(o => o.value === value)

  return (
    <div ref={ref} className="relative inline-block">
      {label && (
        <span className="block text-xs font-medium text-sendlytics-grey-400 mb-1">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 h-[41px] px-3 bg-white border border-sendlytics-grey-200 rounded-md text-sm font-medium text-sendlytics-text-default hover:bg-sendlytics-grey-50 transition-colors min-w-[140px]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex-1 text-left truncate">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-sendlytics-grey-400 flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 mt-1 min-w-full bg-white border border-sendlytics-grey-200 rounded shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50 py-1"
        >
          {options.map(opt => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-4 h-[43px] text-sm font-medium transition-colors ${
                  opt.value === value
                    ? 'bg-sendlytics-grey-100 text-sendlytics-primary-green'
                    : 'text-sendlytics-text-default hover:bg-sendlytics-grey-100'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
