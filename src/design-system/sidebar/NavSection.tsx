'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface NavSectionProps {
  /** Section heading — hidden when collapsed */
  label: string
  collapsed: boolean
  children: ReactNode
}

/**
 * Groups related NavItems under an optional section label.
 * The label is hidden in collapsed sidebar mode.
 */
export function NavSection({ label, collapsed, children }: NavSectionProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {!collapsed && (
        <span className="text-[10px] font-medium text-sendlytics-grey-400 uppercase tracking-wider px-3.5 pb-1 select-none">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
