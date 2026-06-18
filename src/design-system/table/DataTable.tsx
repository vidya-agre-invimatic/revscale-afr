'use client'

import type { ReactNode } from 'react';
import React from 'react'
import { TableHeaderCell } from './TableHeaderCell'
import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export interface DataTableColumn<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  onSort?: (key: string, dir: 'asc' | 'desc') => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  isLoading?: boolean
  emptyMessage?: string
}

/**
 * Generic, composable data table. Handles sorting, loading skeletons, and empty states.
 * Pass a `render` function per column for custom cell content (e.g. TrendIndicator).
 */
export function DataTable<T extends object>({
  columns,
  data,
  onSort,
  sortKey,
  sortDir,
  isLoading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const handleSort = (key: string) => {
    if (!onSort) return
    const nextDir: 'asc' | 'desc' =
      sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'
    onSort(key, nextDir)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-sendlytics-grey-200 bg-white sticky top-0">
            {columns.map(col => (
              <TableHeaderCell
                key={col.key}
                label={col.label}
                sortable={col.sortable}
                sorted={sortKey === col.key ? (sortDir ?? null) : null}
                align={col.align}
                onSort={() => handleSort(col.key)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-sendlytics-grey-200">
                {columns.map(col => (
                  <td key={col.key} className="h-[50px] px-4 align-middle">
                    <div className="h-4 bg-sendlytics-grey-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-[200px] text-center text-sm font-medium text-sendlytics-grey-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map(col => (
                  <TableCell key={col.key} align={col.align}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
