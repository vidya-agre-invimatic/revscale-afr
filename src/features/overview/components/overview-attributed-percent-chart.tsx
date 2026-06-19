'use client'

import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { ArrowUpRight } from 'lucide-react'

const SAMPLE_DATA = [
  { period: 'Feb 24', campaignRevenuePercent: 12, flowRevenuePercent: 5 },
  { period: 'Mar 24', campaignRevenuePercent: 18, flowRevenuePercent: 8 },
  { period: 'Apr 24', campaignRevenuePercent: 15, flowRevenuePercent: 6 },
  { period: 'May 24', campaignRevenuePercent: 22, flowRevenuePercent: 10 },
  { period: 'Jun 24', campaignRevenuePercent: 28, flowRevenuePercent: 12 },
  { period: 'Jul 24', campaignRevenuePercent: 20, flowRevenuePercent: 8 },
  { period: 'Aug 24', campaignRevenuePercent: 25, flowRevenuePercent: 11 },
  { period: 'Sep 24', campaignRevenuePercent: 30, flowRevenuePercent: 14 },
  { period: 'Oct 24', campaignRevenuePercent: 35, flowRevenuePercent: 16 },
]

interface OverviewAttributedPercentChartProps {
  data?: typeof SAMPLE_DATA
}

export function OverviewAttributedPercentChart({ data = SAMPLE_DATA }: OverviewAttributedPercentChartProps) {
  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-sendlytics-text-default">Attributed Revenue %</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-sendlytics-text-default">19.32%</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Campaign Revenue %</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Flow Revenue %</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs font-semibold text-sendlytics-growth inline-flex items-center gap-0.5">
          <ArrowUpRight size={12} /> 10%
        </span>
        <span className="text-xs font-medium text-sendlytics-grey-400">vs 19.32%</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={-12}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fontWeight: 500, fill: '#82868C' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fontSize: 11, fontWeight: 400, fill: '#82868C' }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="campaignRevenuePercent" fill="#91DAFF" radius={[20, 20, 20, 20]} barSize={14} />
          <Bar dataKey="flowRevenuePercent" fill="#0284C7" radius={[20, 20, 20, 20]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
