'use client'

import React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

interface TableHeaderCellProps {
  label: string
  sortable?: boolean
  sorted?: 'asc' | 'desc' | null
  onSort?: () => void
  align?: 'left' | 'center' | 'right'
}

const alignClass = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
} as const

/**
 * Table header cell with optional sort indicator.
 * Clicking when sortable cycles asc → desc → asc.
 */
export function TableHeaderCell({
  label,
  sortable,
  sorted,
  onSort,
  align = 'left',
}: TableHeaderCellProps) {
  const SortIcon =
    sorted === 'asc' ? ChevronUp :
    sorted === 'desc' ? ChevronDown :
    ChevronsUpDown

  return (
    <th
      className={`h-[50px] px-4 text-xs font-semibold text-sendlytics-grey-400 whitespace-nowrap align-middle ${alignClass[align]} ${sortable ? 'cursor-pointer select-none hover:text-sendlytics-text-default' : ''}`}
      onClick={sortable ? onSort : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortable && <SortIcon size={12} className="text-sendlytics-grey-400 flex-shrink-0" />}
      </span>
    </th>
  )
}
