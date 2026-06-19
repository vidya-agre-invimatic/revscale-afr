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

const CAMPAIGN_REVENUE_DATA = [
  { period: 'Feb 24', campaignRevenue: 6, recipients: 40000 },
  { period: 'Mar 24', campaignRevenue: 10, recipients: 65000 },
  { period: 'Apr 24', campaignRevenue: 15, recipients: 95000 },
  { period: 'May 24', campaignRevenue: 8, recipients: 55000 },
  { period: 'Jun 24', campaignRevenue: 12, recipients: 75000 },
  { period: 'Jul 24', campaignRevenue: 7, recipients: 45000 },
  { period: 'Aug 24', campaignRevenue: 9, recipients: 58000 },
  { period: 'Sep 24', campaignRevenue: 14, recipients: 88000 },
  { period: 'Oct 24', campaignRevenue: 18, recipients: 110000 },
]

const CAMPAIGN_RATE_DATA = [
  { period: 'Feb 24', openRate: 0.10, recipients: 400000 },
  { period: 'Mar 24', openRate: 0.15, recipients: 650000 },
  { period: 'Apr 24', openRate: 0.30, recipients: 1000000 },
  { period: 'May 24', openRate: 0.18, recipients: 750000 },
  { period: 'Jun 24', openRate: 0.25, recipients: 900000 },
  { period: 'Jul 24', openRate: 0.12, recipients: 500000 },
  { period: 'Aug 24', openRate: 0.17, recipients: 600000 },
  { period: 'Sep 24', openRate: 0.28, recipients: 850000 },
  { period: 'Oct 24', openRate: 0.35, recipients: 1100000 },
]

const CAMPAIGN_METRICS: FlowMetricSummary[] = [
  { label: 'Campaign Revenue', value: '$24,003.23', changePercent: 10, trend: 'up', comparisonValue: '$24,003.23' },
  { label: 'RPR', value: '$12,003.23', changePercent: 10, trend: 'up', comparisonValue: '$12,003.23' },
  { label: 'Click Rate', value: '24.32%', changePercent: 10, trend: 'up', comparisonValue: '12.34%' },
  { label: 'Clicks', value: '24.32%', changePercent: 10, trend: 'down', comparisonValue: '12.23%' },
  { label: 'Revenue Per Campaign', value: '$12,003.23', changePercent: 10, trend: 'up', comparisonValue: '$12,003.23' },
  { label: 'CTR', value: '24.32%', changePercent: 10, trend: 'down', comparisonValue: '10.23%' },
  { label: 'Open Rate', value: '38.54%', changePercent: 10, trend: 'up', comparisonValue: '29.64%' },
  { label: 'Campaign Count', value: '27', changePercent: 10, trend: 'up', comparisonValue: '23' },
]

function formatTooltip(value: ValueType | undefined) {
  if (value === undefined) return ''
  return Number(value).toLocaleString()
}

export function OverviewCampaignsSection() {
  const [activeTab, setActiveTab] = useState('emails')

  return (
    <div className="flex flex-col gap-6">
      <OverviewSectionHeader
        title="Campaign Overview"
        tabs={SECTION_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onViewAll={() => {}}
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Campaign Revenue Chart */}
        <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-sendlytics-text-default">Campaign Revenue</h4>
            <span className="text-lg font-semibold text-sendlytics-text-default">$11,231</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Campaign Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Recipients</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CAMPAIGN_REVENUE_DATA} barGap={-10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}K`} />
              <Tooltip formatter={formatTooltip} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E3E6EB' }} />
              <Bar yAxisId="left" dataKey="campaignRevenue" fill="#91DAFF" radius={[20, 20, 20, 20]} barSize={12} />
              <Bar yAxisId="right" dataKey="recipients" fill="#0284C7" radius={[20, 20, 20, 20]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Rate Chart */}
        <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-sendlytics-text-default">Campaign</h4>
            <div className="flex items-center gap-2 border border-sendlytics-grey-200 rounded-md px-3 py-1.5">
              <span className="text-xs font-medium text-sendlytics-text-default">Open Rate</span>
              <ChevronDown size={12} className="text-sendlytics-grey-400" />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#91DAFF]" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Open Rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sendlytics-primary-blue" />
              <span className="text-[10px] font-medium text-sendlytics-grey-400">Recipients</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={CAMPAIGN_RATE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#82868C' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v / 1000000}M`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E3E6EB' }} />
              <Line yAxisId="left" type="monotone" dataKey="openRate" stroke="#91DAFF" strokeWidth={2} dot={{ r: 4, fill: '#91DAFF' }} />
              <Line yAxisId="right" type="monotone" dataKey="recipients" stroke="#0284C7" strokeWidth={2} dot={{ r: 4, fill: '#0284C7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        {CAMPAIGN_METRICS.map(m => (
          <OverviewFlowMetricCard key={m.label} metric={m} />
        ))}
      </div>
    </div>
  )
}
