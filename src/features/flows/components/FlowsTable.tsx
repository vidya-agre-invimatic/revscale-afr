'use client'

import React from 'react'
import { ArrowUpRight, ChevronsUpDown, ArrowUp } from 'lucide-react'
import type { FlowRow } from '../types/flow.types'

interface FlowsTableProps {
  rows: FlowRow[]
  onFlowBreakdownClick?: (row: FlowRow) => void
}

function TrendBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-[6px] bg-[#ecfaee] text-sendlytics-growth text-xs font-semibold px-[6px] py-[2px] rounded-[3px] whitespace-nowrap flex-shrink-0">
      <ArrowUp size={8} />
      {value}%
    </span>
  )
}

const COLUMNS = ['Flows', 'Revenue', 'RPR', 'CVR', 'Open Rate', 'Click Rate'] as const

export function FlowsTable({ rows, onFlowBreakdownClick }: FlowsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="border-collapse" style={{ minWidth: 1095 }}>
        <thead>
          <tr className="border-b border-sendlytics-grey-200">
            {COLUMNS.map((col, i) => (
              <th
                key={col}
                className={`text-left px-2.5 py-3 font-normal text-base text-sendlytics-text-default whitespace-nowrap ${
                  i === 0 ? 'w-[240px]' : 'w-[232px] pl-2.5 pr-10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {col}
                  <ChevronsUpDown size={12} className="text-sendlytics-grey-600 flex-shrink-0" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const isEvenData = !row.isTotal && idx % 2 === 0
            const rowBg = row.isTotal || isEvenData ? 'bg-sendlytics-grey-50' : 'bg-white'

            return (
              <tr
                key={row.id}
                className={`group border-b border-sendlytics-grey-200 ${rowBg} ${
                  !row.isTotal ? 'hover:bg-sendlytics-grey-50' : ''
                } transition-colors`}
              >
                {/* Flows name cell */}
                <td className="px-2.5 py-3 w-[240px] align-top">
                  {row.isTotal ? (
                    <span className="text-base font-semibold text-sendlytics-text-default">
                      {row.name}
                    </span>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p className="text-base font-semibold text-sendlytics-text-default w-[200px] leading-snug">
                        {row.name}
                      </p>
                      <button
                        onClick={() => onFlowBreakdownClick?.(row)}
                        className="hidden group-hover:flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
                      >
                        <span className="text-sm font-semibold text-sendlytics-primary-blue">
                          Flow Breakdown
                        </span>
                        <ArrowUpRight size={12} className="text-sendlytics-primary-blue" />
                      </button>
                    </div>
                  )}
                </td>

                {/* Revenue */}
                <td className="pl-2.5 pr-10 py-3 w-[232px] align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">
                      <span className="text-xs">$</span>
                      {row.revenue}
                    </span>
                    <TrendBadge value={row.trendValue} />
                  </div>
                </td>

                {/* RPR */}
                <td className="pl-2.5 pr-10 py-3 w-[232px] align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">
                      <span className="text-xs">$</span>
                      {row.rpr}
                    </span>
                    <TrendBadge value={row.trendValue} />
                  </div>
                </td>

                {/* CVR */}
                <td className="pl-2.5 pr-10 py-3 w-[232px] align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">
                      {row.cvr}
                    </span>
                    <TrendBadge value={row.trendValue} />
                  </div>
                </td>

                {/* Open Rate */}
                <td className="pl-2.5 pr-10 py-3 w-[232px] align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">
                      {row.openRate}
                    </span>
                    <TrendBadge value={row.trendValue} />
                  </div>
                </td>

                {/* Click Rate */}
                <td className="pl-2.5 pr-10 py-3 w-[232px] align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">
                      {row.clickRate}
                    </span>
                    <TrendBadge value={row.trendValue} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
