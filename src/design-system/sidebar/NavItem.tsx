'use client'

import type { ReactNode } from 'react';
import React from 'react'

export interface NavItemProps {
  /** Lucide icon element (20×20) */
  icon: ReactNode
  label: string
  collapsed: boolean
  /** Visual state — hover should be applied by the parent when needed */
  state?: 'default' | 'hover' | 'active'
  onClick?: () => void
  /** Optional badge pill shown on the right (hidden when collapsed) */
  badge?: string | number
}

const bgClasses: Record<string, string> = {
  default: 'bg-transparent',
  hover:   'bg-sendlytics-grey-100',
  active:  'bg-sendlytics-primary-green',
}

const textClasses: Record<string, string> = {
  default: 'text-sendlytics-text-default',
  hover:   'text-sendlytics-text-default',
  active:  'text-white',
}

const iconClasses: Record<string, string> = {
  default: 'text-sendlytics-grey-400',
  hover:   'text-sendlytics-primary-green',
  active:  'text-white',
}

/**
 * Sidebar navigation item with icon, label, optional badge, and three visual states.
 * In collapsed mode the label and badge are hidden; only the icon is centred.
 */
export function NavItem({
  icon,
  label,
  collapsed,
  state = 'default',
  onClick,
  badge,
}: NavItemProps) {
  const base = `flex items-center rounded-[6px] cursor-pointer transition-colors duration-150 ${bgClasses[state]} ${textClasses[state]}`

  if (collapsed) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={onClick}
        onKeyDown={e => e.key === 'Enter' && onClick?.()}
        className={`${base} w-14 h-10 justify-center`}
        title={label}
      >
        <span className={`w-5 h-5 flex items-center justify-center ${iconClasses[state]}`}>
          {icon}
        </span>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
      className={`${base} w-[212px] h-10 px-3.5 gap-3`}
    >
      <span className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${iconClasses[state]}`}>
        {icon}
      </span>
      <span className="text-sm font-semibold flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="bg-sendlytics-primary-blue text-white text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none">
          {badge}
        </span>
      )}
    </div>
  )
}
