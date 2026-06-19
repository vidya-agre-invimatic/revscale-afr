'use client'

import React from 'react'
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { RevenueDataPoint } from '../types/overview.types'

const SAMPLE_DATA: RevenueDataPoint[] = [
  { period: 'Feb 24', attributedRevenue: 4200, unattributedRevenue: 800 },
  { period: 'Mar 24', attributedRevenue: 5800, unattributedRevenue: 1200 },
  { period: 'Apr 24', attributedRevenue: 6200, unattributedRevenue: 1400 },
  { period: 'May 24', attributedRevenue: 4800, unattributedRevenue: 900 },
  { period: 'Jun 24', attributedRevenue: 5500, unattributedRevenue: 1100 },
  { period: 'Jul 24', attributedRevenue: 3800, unattributedRevenue: 700 },
  { period: 'Aug 24', attributedRevenue: 4500, unattributedRevenue: 800 },
  { period: 'Sep 24', attributedRevenue: 5200, unattributedRevenue: 1000 },
  { period: 'Oct 24', attributedRevenue: 7200, unattributedRevenue: 1500 },
  { period: 'Nov 24', attributedRevenue: 3200, unattributedRevenue: 600 },
  { period: 'Dec 24', attributedRevenue: 3800, unattributedRevenue: 700 },
  { period: 'Jan 25', attributedRevenue: 5500, unattributedRevenue: 1100 },
  { period: 'Feb 25', attributedRevenue: 6800, unattributedRevenue: 1400 },
  { period: 'Mar 25', attributedRevenue: 5200, unattributedRevenue: 1000 },
  { period: 'Apr 25', attributedRevenue: 4200, unattributedRevenue: 800 },
]

function formatYAxis(value: number) {
  if (value >= 1000) return `$${value / 1000}K`
  return `$${value}`
}

function formatTooltipValue(value: ValueType | undefined) {
  if (value === undefined) return ''
  return `$${Number(value).toLocaleString()}`
}

interface OverviewRevenueChartProps {
  data?: RevenueDataPoint[]
}

export function OverviewRevenueChart({ data = SAMPLE_DATA }: OverviewRevenueChartProps) {
  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6 w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-sendlytics-text-default">Attributed vs Unattributed Revenue</h3>
      </div>
      <div className="flex items-center gap-5 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Attributed Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Unattributed Revenue</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={-14}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E3E6EB"
            horizontal
            vertical={false}
          />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12, fontWeight: 500, fill: '#82868C' }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12, fontWeight: 400, fill: '#82868C' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={formatTooltipValue}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E3E6EB',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
            }}
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
          />
          <Bar
            dataKey="attributedRevenue"
            name="Attributed Revenue"
            fill="#91DAFF"
            radius={[20, 20, 20, 20]}
            barSize={18}
          />
          <Bar
            dataKey="unattributedRevenue"
            name="Unattributed Revenue"
            fill="#0284C7"
            radius={[20, 20, 20, 20]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
