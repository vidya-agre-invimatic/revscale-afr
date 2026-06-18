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
  /** Active background color variant */
  activeColor?: 'green' | 'blue'
}

const bgByColor = {
  green: 'bg-sendlytics-primary-green',
  blue:  'bg-sendlytics-primary-blue',
}

const hoverIconByColor = {
  green: 'text-sendlytics-primary-green',
  blue:  'text-sendlytics-primary-blue',
}

const textClasses: Record<string, string> = {
  default: 'text-sendlytics-grey-600',
  hover:   'text-sendlytics-text-default',
  active:  'text-white',
}

const iconClasses: Record<string, string> = {
  default: 'text-sendlytics-grey-600',
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
  activeColor = 'blue',
}: NavItemProps) {
  const bgClass = state === 'active' ? bgByColor[activeColor] : state === 'hover' ? 'bg-sendlytics-grey-100' : 'bg-transparent'
  const iconColor = state === 'hover' ? hoverIconByColor[activeColor] : iconClasses[state]
  const base = `flex items-center rounded-[6px] cursor-pointer transition-colors duration-150 ${bgClass} ${textClasses[state]}`

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
        <span className={`w-5 h-5 flex items-center justify-center ${iconColor}`}>
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
      className={`${base} w-[212px] h-10 px-[18px] gap-2.5`}
    >
      <span className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
        {icon}
      </span>
      <span className="text-sm font-medium flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="bg-sendlytics-primary-blue text-white text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none">
          {badge}
        </span>
      )}
    </div>
  )
}
