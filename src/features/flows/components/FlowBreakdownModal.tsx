'use client'

import React, { useEffect, useState } from 'react'
import { X, ChevronDown, Calendar, ArrowUp, ArrowDown } from 'lucide-react'
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import type { FlowRow } from '../types/flow.types'

// ─── Chart data ────────────────────────────────────────────────────────────────

const MONTHLY = [
  { month: 'Feb 24', revenue: 9500,  recipients: 150, rpr: 22, openRate: 22, clickRate: 20 },
  { month: 'Mar 24', revenue: 19000, recipients: 370, rpr: 36, openRate: 35, clickRate: 35 },
  { month: 'Apr 24', revenue: 7500,  recipients: 160, rpr: 14, openRate: 13, clickRate: 12 },
  { month: 'May 24', revenue: 11500, recipients: 195, rpr: 22, openRate: 22, clickRate: 18 },
  { month: 'Jun 24', revenue: 10000, recipients: 165, rpr: 22, openRate: 22, clickRate: 20 },
  { month: 'Jul 24', revenue: 11000, recipients: 190, rpr: 22, openRate: 22, clickRate: 20 },
  { month: 'Aug 24', revenue: 12000, recipients: 210, rpr: 22, openRate: 24, clickRate: 22 },
]

const SPARKLINES: Record<string, number[]> = {
  revenue:    [8, 12, 9, 14, 10, 15, 18],
  openRate:   [9, 14, 8, 12, 11, 14, 16],
  clickRate:  [7, 11, 6, 10,  9, 12, 14],
  rpr:        [14, 10, 12,  8, 11, 9,  8],
  recipients: [6, 14, 8, 10,  9, 12, 15],
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string
  value: string
  trend: number
  trendUp: boolean
  vsLabel: string
  sparkData: number[]
  sparkColor?: string
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map(v => ({ v }))
  return (
    <ResponsiveContainer width={84} height={44}>
      <LineChart data={points} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

function KpiCard({ label, value, trend, trendUp, vsLabel, sparkData, sparkColor = '#53A669' }: KpiCardProps) {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-lg border border-sendlytics-grey-200 px-4 py-3 flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-medium text-sendlytics-grey-400 truncate">{label}</span>
        <span className="text-lg font-semibold text-sendlytics-text-default truncate">{value}</span>
        <div className="flex items-center gap-1 flex-wrap">
          {trendUp
            ? <ArrowUp size={10} className="text-sendlytics-growth flex-shrink-0" />
            : <ArrowDown size={10} className="text-sendlytics-loss flex-shrink-0" />
          }
          <span className={`text-xs font-semibold ${trendUp ? 'text-sendlytics-growth' : 'text-sendlytics-loss'}`}>
            {trend}%
          </span>
          <span className="text-xs text-sendlytics-grey-400 truncate">vs {vsLabel}</span>
        </div>
      </div>
      <div className="flex-shrink-0 w-[84px]">
        <Sparkline data={sparkData} color={sparkColor} />
      </div>
    </div>
  )
}

// ─── Custom tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { dataKey: string; value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-lg shadow-md border border-sendlytics-grey-200 px-4 py-3 min-w-[200px]">
      <div className="flex justify-between gap-6 mb-2">
        <span className="text-sm text-sendlytics-grey-400">Month</span>
        <span className="text-sm font-semibold text-sendlytics-text-default">{label}</span>
      </div>
      {payload.map(entry => (
        <div key={entry.dataKey} className="flex justify-between gap-6">
          <span className="text-sm text-sendlytics-grey-400">
            {entry.dataKey === 'revenue' ? 'Flow Revenue' : 'Recipients'}
          </span>
          <span className="text-sm font-semibold text-sendlytics-text-default">
            {entry.dataKey === 'revenue'
              ? `$${Number(entry.value).toLocaleString()}`
              : Number(entry.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Chart panels ──────────────────────────────────────────────────────────────

function RevenueRecipientsChart() {
  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-sendlytics-text-default">Revenue vs Recipients</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm bg-sendlytics-secondary-blue" />
            <span className="text-xs font-medium text-sendlytics-grey-800">Flow Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm bg-sendlytics-primary-green" />
            <span className="text-xs font-medium text-sendlytics-grey-800">Recipients</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={MONTHLY} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#222329' }} axisLine={false} tickLine={false} />
          <YAxis
            yAxisId="left"
            tickFormatter={v => `$${v / 1000}K`}
            tick={{ fontSize: 11, fill: '#222329' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 20000]}
            ticks={[0, 5000, 10000, 15000, 20000]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: '#222329' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 400]}
            ticks={[0, 100, 200, 300, 400]}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar yAxisId="left" dataKey="revenue" fill="#91DAFF" radius={[38, 38, 38, 38]} barSize={16} />
          <Line yAxisId="right" type="monotone" dataKey="recipients" stroke="#53A669" strokeWidth={2} dot={{ r: 4, fill: '#53A669' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function SimpleBarChart({ title, dataKey, formatter }: { title: string; dataKey: string; formatter?: (v: number) => string }) {
  const fmt = formatter ?? ((v: number) => `${v}%`)
  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-5 flex-1">
      <h3 className="text-base font-semibold text-sendlytics-text-default mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={MONTHLY} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EB" horizontal vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#222329' }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: '#222329' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
          />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#91DAFF" radius={[38, 38, 38, 38]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Main modal ────────────────────────────────────────────────────────────────

interface FlowBreakdownModalProps {
  flow: FlowRow | null
  onClose: () => void
}

export function FlowBreakdownModal({ flow, onClose }: FlowBreakdownModalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table'>('dashboard')

  useEffect(() => {
    if (!flow) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [flow, onClose])

  if (!flow) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-[1376px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* ── Header ── */}
        <div className="px-10 pt-10 pb-0 flex flex-col gap-0">
          {/* Title row */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-sendlytics-text-default">{flow.name}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sendlytics-grey-100 transition-colors text-sendlytics-grey-400 hover:text-sendlytics-text-default flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-4 mb-5">
            {/* Flow Message dropdown */}
            <button className="flex items-center gap-2 border border-sendlytics-grey-200 rounded-[6px] px-4 py-2.5 bg-white">
              <span className="text-sm font-medium text-sendlytics-text-default">Flow Message</span>
              <ChevronDown size={14} className="text-sendlytics-grey-400" />
            </button>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              {/* Date range */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-xs font-medium text-sendlytics-grey-800">
                  Date <ChevronDown size={10} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 border border-sendlytics-grey-600 rounded-[6px] px-2.5 py-1.5">
                    <Calendar size={10} />
                    <span className="text-sm font-semibold text-sendlytics-text-default">10/23/24</span>
                  </div>
                  <div className="flex items-center gap-1.5 border border-sendlytics-grey-600 rounded-[6px] px-2.5 py-1.5">
                    <Calendar size={10} />
                    <span className="text-sm font-semibold text-sendlytics-text-default">12/29/24</span>
                  </div>
                </div>
              </div>

              {/* Sort by */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-xs font-medium text-sendlytics-grey-800">
                  Sort by <ChevronDown size={10} />
                </div>
                <span className="text-base font-semibold text-sendlytics-text-default">Month</span>
              </div>

              {/* Dashboard / Table toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-5 py-2 rounded-[6px] text-sm font-semibold transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-sendlytics-primary-blue text-white'
                      : 'text-sendlytics-text-default hover:bg-sendlytics-grey-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-5 py-2 rounded-[6px] text-sm font-semibold transition-colors ${
                    activeTab === 'table'
                      ? 'bg-sendlytics-primary-blue text-white'
                      : 'text-sendlytics-text-default hover:bg-sendlytics-grey-100'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-sendlytics-grey-200" />
        </div>

        {/* ── Body ── */}
        <div className="px-10 py-6 flex flex-col gap-5">

          {activeTab === 'dashboard' ? (
            <>
              {/* KPI Cards */}
              <div className="flex items-stretch gap-3">
                <KpiCard
                  label="Revenue"
                  value="$24,003.23"
                  trend={10}
                  trendUp
                  vsLabel="$24,003.23"
                  sparkData={SPARKLINES.revenue}
                />
                <KpiCard
                  label="Open Rate"
                  value="42.66%"
                  trend={10}
                  trendUp
                  vsLabel="38.83%"
                  sparkData={SPARKLINES.openRate}
                />
                <KpiCard
                  label="Click Rate"
                  value="24.32%"
                  trend={10}
                  trendUp
                  vsLabel="12.34%"
                  sparkData={SPARKLINES.clickRate}
                />
                <KpiCard
                  label="RPR"
                  value="$24,003.23"
                  trend={10}
                  trendUp={false}
                  vsLabel="$24,003.23"
                  sparkData={SPARKLINES.rpr}
                  sparkColor="#FF0004"
                />
                <KpiCard
                  label="Recipients"
                  value="1,015"
                  trend={10}
                  trendUp
                  vsLabel="982"
                  sparkData={SPARKLINES.recipients}
                />
              </div>

              {/* Charts row 1 */}
              <div className="flex gap-4">
                <RevenueRecipientsChart />
                <SimpleBarChart title="RPR" dataKey="rpr" />
              </div>

              {/* Charts row 2 */}
              <div className="flex gap-4">
                <SimpleBarChart title="Open Rate" dataKey="openRate" />
                <SimpleBarChart title="Click Rate" dataKey="clickRate" />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-20 text-sendlytics-grey-400 text-base">
              Table view — coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
