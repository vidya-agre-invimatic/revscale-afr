'use client'

import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import type { SubjectLineEntry } from '../types/overview.types'

const TABS = [
  { id: 'flows', label: 'Flows' },
  { id: 'campaign', label: 'Campaign' },
]

const SAMPLE_DATA: SubjectLineEntry[] = [
  { subjectLine: 'Discover Joint Flow Gummies', value: 0.95 },
  { subjectLine: 'Revitalize Your Liver Health with the Power of Milk Thistle', value: 0.72 },
  { subjectLine: 'Upgrade Your Liver Health with Happy Liver!', value: 0.65 },
  { subjectLine: 'Sugar Guard: Your Natural Ally In Balancing Blood Sugar Levels', value: 0.55 },
  { subjectLine: 'This One Secret To Improving Your Liver Health...', value: 0.48 },
  { subjectLine: "Here's All You Need To Know About Keeping Your Liver Healthy", value: 0.42 },
  { subjectLine: 'Breaking Down Lutein Vision', value: 0.35 },
  { subjectLine: 'Healthy eyes equals happy you.', value: 0.22 },
  { subjectLine: 'A Revolutionary Solution For Joint Pain Relief', value: 0.15 },
]

interface OverviewSubjectLinesProps {
  data?: SubjectLineEntry[]
}

export function OverviewSubjectLines({ data = SAMPLE_DATA }: OverviewSubjectLinesProps) {
  const [activeTab, setActiveTab] = useState('flows')

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center gap-4 border-b border-sendlytics-grey-200 pb-4">
        <h3 className="text-lg font-semibold text-sendlytics-text-default">Subject Line Analysis</h3>
        <div className="flex items-center gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-sendlytics-primary-blue text-white'
                  : 'text-sendlytics-grey-400 hover:text-sendlytics-text-default'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-semibold text-sendlytics-text-default">Flow Open Rate</h4>
          <div className="flex items-center gap-2 border border-sendlytics-grey-200 rounded-md px-3 py-1.5">
            <span className="text-xs font-medium text-sendlytics-text-default">Open Rate</span>
            <ChevronDown size={12} className="text-sendlytics-grey-400" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 220, right: 20, top: 0, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal={false} vertical />
            <XAxis
              type="number"
              domain={[0, 1]}
              tickFormatter={(v: number) => `${v.toFixed(1)}`}
              tick={{ fontSize: 11, fill: '#82868C' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="subjectLine"
              tick={{ fontSize: 11, fill: '#222329', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={210}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E3E6EB' }}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={idx === 0 ? '#53A669' : '#0284C7'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
