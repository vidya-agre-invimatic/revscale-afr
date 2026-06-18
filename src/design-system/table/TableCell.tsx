'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface TableCellProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

const alignClass = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
} as const

/**
 * Standard data table cell — 50px row height, Body/medium14, default text colour.
 */
export function TableCell({ children, align = 'left', className = '' }: TableCellProps) {
  return (
    <td
      className={`h-[50px] px-4 text-sm font-medium text-sendlytics-text-default align-middle ${alignClass[align]} ${className}`}
    >
      {children}
    </td>
  )
}
