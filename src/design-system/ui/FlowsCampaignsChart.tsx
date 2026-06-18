'use client'

import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'

const SAMPLE_DATA = [
  { month: 'Feb 24', campaignRevenue: 150000, flowRevenue: 50000 },
  { month: 'Mar 24', campaignRevenue: 200000, flowRevenue: 100000 },
  { month: 'Apr 24', campaignRevenue: 80000,  flowRevenue: 50000 },
  { month: 'May 24', campaignRevenue: 150000, flowRevenue: 50000 },
  { month: 'Jun 24', campaignRevenue: 170000, flowRevenue: 60000 },
  { month: 'Jul 24', campaignRevenue: 100000, flowRevenue: 50000 },
  { month: 'Aug 24', campaignRevenue: 170000, flowRevenue: 60000 },
]

function formatYAxis(value: number) {
  return `$${value / 1000}K`
}

interface FlowsCampaignsChartProps {
  data?: typeof SAMPLE_DATA
}

export function FlowsCampaignsChart({ data = SAMPLE_DATA }: FlowsCampaignsChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-[6px_12px_20px_rgba(0,0,0,0.06)] p-6 w-full">
      <div className="flex flex-col gap-4 mb-8">
        <h3 className="text-base font-semibold text-sendlytics-text-default">Flows vs Campaigns</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-sendlytics-secondary-blue" />
            <span className="text-xs font-medium text-sendlytics-grey-800">Campaign Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-sendlytics-primary-blue" />
            <span className="text-xs font-medium text-sendlytics-grey-800">Flow Revenue</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={-12}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E3E6EB"
            horizontal
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fontWeight: 500, fill: '#222329' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12, fontWeight: 300, fill: '#222329' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 250000]}
            ticks={[0, 50000, 100000, 150000, 200000, 250000]}
          />
          <Bar
            dataKey="campaignRevenue"
            fill="#91DAFF"
            radius={[38, 38, 38, 38]}
            barSize={16}
          />
          <Bar
            dataKey="flowRevenue"
            fill="#0284C7"
            radius={[38, 38, 38, 38]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
