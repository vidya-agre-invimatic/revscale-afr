'use client'

import React, { useState } from 'react'
import { ChevronDown, Calendar, Copy } from 'lucide-react'
import type { OverviewMetricCard } from '@/features/overview/types/overview.types'
import { OverviewSummaryCard } from '@/features/overview/components/overview-summary-card'
import { OverviewRevenueChart } from '@/features/overview/components/overview-revenue-chart'
import { OverviewAttributedPercentChart } from '@/features/overview/components/overview-attributed-percent-chart'
import { OverviewFlowsVsCampaignsChart } from '@/features/overview/components/overview-flows-vs-campaigns-chart'
import { OverviewFlowsSection } from '@/features/overview/components/overview-flows-section'
import { OverviewCampaignsSection } from '@/features/overview/components/overview-campaigns-section'
import { OverviewSubjectLines } from '@/features/overview/components/overview-subject-lines'
import { OverviewTableView } from '@/features/overview/components/overview-table-view'

const CLIENT_OPTIONS = ['Fling', 'Acme Corp', 'Bella Beauty', 'Green Leaf Co', 'Nova Fitness']

const SUMMARY_METRICS: OverviewMetricCard[] = [
  {
    title: 'Total Revenue',
    value: '12,444,482',
    changePercent: 23,
    trend: 'up',
    comparisonValue: '$14,234.32',
    subMetrics: [
      { label: 'Store AOV', value: '$54,076.23', changePercent: 10, trend: 'up' },
      { label: 'Conversions', value: '34.52', changePercent: 10, trend: 'up' },
    ],
  },
  {
    title: 'Attributed Revenue',
    value: '2,532,779',
    changePercent: 23,
    trend: 'up',
    comparisonValue: '$10,44,28,194',
    subMetrics: [
      { label: 'Unattributed Revenue', value: '$24,003.23', changePercent: 10, trend: 'up' },
      { label: 'Attributed Revenue %', value: '34.52%', changePercent: 10, trend: 'up' },
    ],
  },
  {
    title: 'Flow Revenue',
    value: '29,342',
    changePercent: 12,
    trend: 'down',
    comparisonValue: '$10,44,28,194',
    hasLink: true,
    subMetrics: [
      { label: 'Flow Open Rate', value: '34.52%', changePercent: 10, trend: 'up' },
      { label: 'Flow Click Rate', value: '21.46%', changePercent: 5, trend: 'down' },
    ],
  },
  {
    title: 'Campaign Revenue',
    value: '11,231',
    changePercent: 23,
    trend: 'up',
    comparisonValue: '$10,44,28,194',
    hasLink: true,
    subMetrics: [
      { label: 'Campaign Open Rate', value: '34.52%', changePercent: 10, trend: 'up' },
      { label: 'Campaign Click Rate', value: '34.52%', changePercent: 10, trend: 'up' },
    ],
  },
]

export default function ClientOverviewPage() {
  const [selectedClient, setSelectedClient] = useState('Fling')
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'table'>('dashboard')

  return (
    <div className="flex flex-col h-full">
      {/* Top bar: Client dropdown + Dashboard/Table toggle */}
      <div className="flex items-center justify-between px-8 pt-5 pb-4">
        {/* Client Dropdown */}
        <div className="relative">
          <button
            onClick={() => setClientDropdownOpen(prev => !prev)}
            className="flex items-center gap-3 h-[44px] px-4 bg-white border border-sendlytics-grey-200 rounded-lg text-base font-medium text-sendlytics-text-default hover:bg-sendlytics-grey-50 transition-colors min-w-[180px]"
          >
            <span className="flex-1 text-left">{selectedClient}</span>
            <ChevronDown
              size={16}
              className={`text-sendlytics-grey-400 transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {clientDropdownOpen && (
            <ul className="absolute top-full left-0 mt-1 min-w-full bg-white border border-sendlytics-grey-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50 py-1">
              {CLIENT_OPTIONS.map(client => (
                <li key={client}>
                  <button
                    onClick={() => { setSelectedClient(client); setClientDropdownOpen(false) }}
                    className={`w-full text-left px-4 h-[40px] text-sm font-medium transition-colors ${
                      client === selectedClient
                        ? 'bg-sendlytics-grey-100 text-sendlytics-primary-blue'
                        : 'text-sendlytics-text-default hover:bg-sendlytics-grey-50'
                    }`}
                  >
                    {client}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dashboard / Table Toggle */}
        <div className="inline-flex items-center bg-white border border-sendlytics-grey-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${
              activeView === 'dashboard'
                ? 'bg-sendlytics-primary-blue text-white'
                : 'text-sendlytics-text-default hover:bg-sendlytics-grey-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('table')}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${
              activeView === 'table'
                ? 'bg-sendlytics-primary-blue text-white'
                : 'text-sendlytics-text-default hover:bg-sendlytics-grey-50'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Header row: Title + Filters */}
      <div className="flex items-center justify-between px-8 pb-4 border-b border-sendlytics-grey-200">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-sendlytics-text-default">Client Overview</h1>
          <button className="inline-flex items-center gap-1.5 text-xs font-medium text-sendlytics-grey-400 hover:text-sendlytics-text-default">
            <Copy size={12} />
            Copy Values
          </button>
        </div>
        <div className="flex items-center gap-6">
          {/* Date */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium text-sendlytics-grey-400">Date</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 border border-sendlytics-grey-200 rounded-md px-3 py-1.5">
                <Calendar size={12} className="text-sendlytics-grey-400" />
                <span className="text-xs font-medium text-sendlytics-text-default">10/23/24</span>
              </div>
              <div className="flex items-center gap-1.5 border border-sendlytics-grey-200 rounded-md px-3 py-1.5">
                <Calendar size={12} className="text-sendlytics-grey-400" />
                <span className="text-xs font-medium text-sendlytics-text-default">12/29/24</span>
              </div>
            </div>
          </div>

          {/* Sort by */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium text-sendlytics-grey-400">Sort by</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-sendlytics-text-default">Month</span>
              <ChevronDown size={12} className="text-sendlytics-grey-400" />
            </div>
          </div>

          {/* Compare to */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium text-sendlytics-grey-400">Compare to</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-sendlytics-text-default">Previous Period</span>
              <span className="text-xs font-medium text-sendlytics-grey-400">(08/24/22 - 08/19/24)</span>
              <ChevronDown size={12} className="text-sendlytics-grey-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeView === 'dashboard' ? (
          <div className="flex flex-col gap-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              {SUMMARY_METRICS.map(metric => (
                <OverviewSummaryCard key={metric.title} metric={metric} />
              ))}
            </div>

            {/* Revenue Chart */}
            <OverviewRevenueChart />

            {/* Attributed Revenue % + Flows vs Campaigns */}
            <div className="flex gap-6">
              <OverviewAttributedPercentChart />
              <OverviewFlowsVsCampaignsChart />
            </div>

            {/* Flows Overview */}
            <OverviewFlowsSection />

            {/* Campaign Overview */}
            <OverviewCampaignsSection />

            {/* Subject Line Analysis */}
            <OverviewSubjectLines />
          </div>
        ) : (
          <OverviewTableView />
        )}
      </div>
    </div>
  )
}
