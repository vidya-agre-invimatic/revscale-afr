'use client'

import React, { useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react'

const VIEW_TABS = [
  { id: 'overall', label: 'Overall' },
  { id: 'flows-overview', label: 'Flows Overview' },
  { id: 'campaign-overview', label: 'Campaign Overview' },
]

const MONTHS = ['January 2023', 'February 2023', 'March 2023', 'April 2023']

const METRICS_DATA = [
  { metric: 'Total Revenue', values: ['$10,44,28,194', '$10,44,28,194', '$10,44,28,194', '$10,44,28,194'], changes: [123, 123, 123, 89], trends: ['up', 'up', 'up', 'down'] as const },
  { metric: 'Attributed Revenue', values: ['$43,982', '$43,982', '$43,982', '$43,982'], changes: [123, 123, 89, 123], trends: ['up', 'up', 'down', 'up'] as const },
  { metric: 'Attributed Revenue %', values: ['38.41%', '38.41%', '38.41%', '38.41%'], changes: [89, 123, 89, 89], trends: ['down', 'up', 'down', 'down'] as const },
  { metric: 'Total Email Orders', values: ['2194', '2194', '2194', '2194'], changes: [89, 123, 89, 89], trends: ['down', 'up', 'down', 'down'] as const },
  { metric: 'Unattributed Revenue', values: ['$5,62,683', '$5,62,683', '$5,62,683', '$5,62,683'], changes: [89, 123, 123, 123], trends: ['down', 'up', 'up', 'up'] as const },
  { metric: 'Total Orders', values: ['14,328', '14,328', '14,328', '14,328'], changes: [123, 123, 123, 123], trends: ['up', 'up', 'up', 'up'] as const },
  { metric: 'Store AOV', values: ['$40.73', '$40.73', '$40.73', '$40.73'], changes: [123, 89, 123, 89], trends: ['up', 'down', 'up', 'down'] as const },
  { metric: 'Klaviyo AOV', values: ['$62.23', '$62.23', '$62.23', '$62.23'], changes: [123, 89, 89, 123], trends: ['up', 'down', 'down', 'up'] as const },
  { metric: 'Klaviyo Recipients', values: ['55.32%', '55.32%', '55.32%', '55.32%'], changes: [123, 89, 123, 123], trends: ['up', 'down', 'up', 'up'] as const },
  { metric: 'Klaviyo Open Rate', values: ['1.63%', '1.63%', '1.63%', '1.63%'], changes: [89, 123, 123, 123], trends: ['down', 'up', 'up', 'up'] as const },
]

export function OverviewTableView() {
  const [activeTab, setActiveTab] = useState('overall')

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex items-center gap-1">
        {VIEW_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-sendlytics-primary-blue text-white'
                : 'text-sendlytics-grey-400 hover:text-sendlytics-text-default'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-sendlytics-text-default">
          {VIEW_TABS.find(t => t.id === activeTab)?.label ?? 'Overall'}
        </h3>
        <button className="inline-flex items-center gap-2 border border-sendlytics-grey-200 rounded-md px-4 py-2 text-sm font-medium text-sendlytics-text-default hover:bg-sendlytics-grey-50">
          <Settings size={14} />
          Manage Metrics
        </button>
      </div>

      <p className="text-xs text-sendlytics-grey-400 italic">
        *Manage Metrics allows you to show or hide metric columns based on your preferences
      </p>

      {/* Table */}
      <div className="bg-white rounded-lg border border-sendlytics-grey-200 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-sendlytics-grey-200">
              <th className="text-left text-sm font-semibold text-sendlytics-text-default py-4 px-6 sticky left-0 bg-white min-w-[200px]">Metrics</th>
              {MONTHS.map(month => (
                <th key={month} className="text-left text-sm font-semibold text-sendlytics-text-default py-4 px-6 min-w-[200px]">{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS_DATA.map((row) => (
              <tr key={row.metric} className="border-b border-sendlytics-grey-100">
                <td className="text-sm font-medium text-sendlytics-text-default py-4 px-6 sticky left-0 bg-white">{row.metric}</td>
                {row.values.map((val, i) => (
                  <td key={i} className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-sendlytics-text-default">{val}</span>
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded ${
                          row.trends[i] === 'up'
                            ? 'text-sendlytics-growth bg-[#ECFDF5]'
                            : 'text-sendlytics-loss bg-[#FEF2F2]'
                        }`}
                      >
                        {row.trends[i] === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {row.changes[i]}%
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
