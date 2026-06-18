'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface TableRowProps {
  children: ReactNode
  /** default = 50px, expanded = 88px (for rows with extra detail) */
  variant?: 'default' | 'expanded'
  onClick?: () => void
}

/**
 * Table data row with bottom border, hover background, and two height variants.
 */
export function TableRow({ children, variant = 'default', onClick }: TableRowProps) {
  const heightClass = variant === 'expanded' ? 'h-[88px]' : 'h-[50px]'

  return (
    <tr
      onClick={onClick}
      className={`${heightClass} bg-white border-b border-sendlytics-grey-200 hover:bg-sendlytics-grey-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </tr>
  )
}
