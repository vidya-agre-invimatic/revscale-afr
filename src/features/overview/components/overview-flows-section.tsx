'use client'

import React, { useState } from 'react'
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import type { FlowMetricSummary } from '../types/overview.types'
import { OverviewSectionHeader } from './overview-section-header'
import { OverviewFlowMetricCard } from './overview-flow-metric-card'

const SECTION_TABS = [
  { id: 'all', label: 'Select All' },
  { id: 'emails', label: 'Emails' },
  { id: 'sms', label: 'SMS' },
]

const FLOW_REVENUE_DATA = [
  { period: 'Feb 24', flowRevenue: 8, recipients: 50000 },
  { period: 'Mar 24', flowRevenue: 12, recipients: 80000 },
  { period: 'Apr 24', flowRevenue: 18, recipients: 120000 },
  { period: 'May 24', flowRevenue: 10, recipients: 70000 },
  { period: 'Jun 24', flowRevenue: 14, recipients: 90000 },
  { period: 'Jul 24', flowRevenue: 8, recipients: 55000 },
  { period: 'Aug 24', flowRevenue: 11, recipients: 65000 },
  { period: 'Sep 24', flowRevenue: 16, recipients: 100000 },
  { period: 'Oct 24', flowRevenue: 20, recipients: 130000 },
]

const FLOW_CVR_DATA = [
  { period: 'Feb 24', cvr: 0.12, recipients: 500000 },
  { period: 'Mar 24', cvr: 0.18, recipients: 800000 },
  { period: 'Apr 24', cvr: 0.35, recipients: 1200000 },
  { period: 'May 24', cvr: 0.22, recipients: 900000 },
  { period: 'Jun 24', cvr: 0.28, recipients: 1100000 },
  { period: 'Jul 24', cvr: 0.15, recipients: 600000 },
  { period: 'Aug 24', cvr: 0.20, recipients: 700000 },
  { period: 'Sep 24', cvr: 0.32, recipients: 1000000 },
  { period: 'Oct 24', cvr: 0.38, recipients: 1300000 },
]

const FLOW_METRICS: FlowMetricSummary[] = [
  { label: 'Flow Revenue', value: '$24,003.23', changePercent: 10, trend: 'up', comparisonValue: '$24,003.23' },
  { label: 'RPR', value: '$12,003.23', changePercent: 10, trend: 'up', comparisonValue: '$12,003.23' },
  { label: 'Click Rate', value: '24.32%', changePercent: 10, trend: 'up', comparisonValue: '12.34%' },
  { label: 'Clicks', value: '24.32%', changePercent: 10, trend: 'down', comparisonValue: '12.23%' },
  { label: 'Revenue Per Flow', value: '$12,003.23', changePercent: 10, trend: 'up', comparisonValue: '$12,003.23' },
  { label: 'CTR', value: '24.32%', changePercent: 10, trend: 'down', comparisonValue: '10.23%' },
  { label: 'Open Rate', value: '38.54%', changePercent: 10, trend: 'up', comparisonValue: '29.64%' },
  { label: 'Flow Count', value: '27', changePercent: 10, trend: 'up', comparisonValue: '23' },
]

function formatTooltip(value: ValueType | undefined) {
  if (value === undefined) return ''
  return Number(value).toLocaleString()
}

export function OverviewFlowsSection() {
  const [activeTab, setActiveTab] = useState('emails')

  return (
    <div className="flex flex-col gap-6">
      <OverviewSectionHeader
        title="Flows Overview"
        tabs={SECTION_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onViewAll={() => {}}
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Flow Revenue Chart */}
        <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-sendlytics-text-default">Flow Revenue</h4>
            <span className="text-lg font-semibold text-sendlytics-text-default">$29,342</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Flow Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Recipients</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={FLOW_REVENUE_DATA} barGap={-10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}K`} />
              <Tooltip formatter={formatTooltip} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E3E6EB' }} />
              <Bar yAxisId="left" dataKey="flowRevenue" fill="#91DAFF" radius={[20, 20, 20, 20]} barSize={12} />
              <Bar yAxisId="right" dataKey="recipients" fill="#0284C7" radius={[20, 20, 20, 20]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Flow CVR Chart */}
        <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-sendlytics-text-default">Flow</h4>
            <div className="flex items-center gap-2 border border-sendlytics-grey-200 rounded-md px-3 py-1.5">
              <span className="text-xs font-medium text-sendlytics-text-default">CVR</span>
              <ChevronDown size={12} className="text-sendlytics-grey-400" />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">CVR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Recipients</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={FLOW_CVR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v / 1000000}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E3E6EB' }} />
              <Line yAxisId="left" type="monotone" dataKey="cvr" stroke="#91DAFF" strokeWidth={2} dot={{ r: 4, fill: '#91DAFF' }} />
              <Line yAxisId="right" type="monotone" dataKey="recipients" stroke="#0284C7" strokeWidth={2} dot={{ r: 4, fill: '#0284C7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flow Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        {FLOW_METRICS.map(m => (
          <OverviewFlowMetricCard key={m.label} metric={m} />
        ))}
      </div>
    </div>
  )
}
