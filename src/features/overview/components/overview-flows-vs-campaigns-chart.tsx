'use client'

import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const SAMPLE_DATA = [
  { period: 'Feb 24', campaignRevenue: 80000, flowRevenue: 30000 },
  { period: 'Mar 24', campaignRevenue: 120000, flowRevenue: 50000 },
  { period: 'Apr 24', campaignRevenue: 100000, flowRevenue: 40000 },
  { period: 'May 24', campaignRevenue: 140000, flowRevenue: 55000 },
  { period: 'Jun 24', campaignRevenue: 130000, flowRevenue: 45000 },
  { period: 'Jul 24', campaignRevenue: 90000, flowRevenue: 35000 },
  { period: 'Aug 24', campaignRevenue: 110000, flowRevenue: 42000 },
  { period: 'Sep 24', campaignRevenue: 125000, flowRevenue: 48000 },
  { period: 'Oct 24', campaignRevenue: 150000, flowRevenue: 60000 },
]

function formatYAxis(value: number) {
  if (value >= 1000) return `$${value / 1000}K`
  return `$${value}`
}

interface OverviewFlowsVsCampaignsChartProps {
  data?: typeof SAMPLE_DATA
}

export function OverviewFlowsVsCampaignsChart({ data = SAMPLE_DATA }: OverviewFlowsVsCampaignsChartProps) {
  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-sendlytics-text-default">Flows vs Campaigns</h3>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Campaign Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
          <span className="text-xs font-medium text-sendlytics-grey-400">Flow Revenue</span>
        </div>
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
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fontWeight: 400, fill: '#82868C' }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="campaignRevenue" fill="#91DAFF" radius={[20, 20, 20, 20]} barSize={14} />
          <Bar dataKey="flowRevenue" fill="#0284C7" radius={[20, 20, 20, 20]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
