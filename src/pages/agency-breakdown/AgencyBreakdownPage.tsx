'use client'

import React, { useState } from 'react'
import { ChevronDown, Calendar, Search, SlidersHorizontal, ArrowUp, ArrowDown, X } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BarEntry {
  name: string
  value: number
  highlighted?: boolean
}

interface LinePoint {
  label: string
  value: number
}

type Trend = 'green' | 'red'

interface MetricCell {
  value: string
  trend: Trend
  pct: number
}

interface ClientRow {
  name: string
  totalRevenue: MetricCell
  attributedRevenue: MetricCell
  unattributedRevenue: MetricCell
  campaignRevenue: MetricCell
  flowRevenue: MetricCell
  attributedRevenuePct: MetricCell
  flowOpenRate: MetricCell
  campaignOpenRate: MetricCell
  flowClickRate: MetricCell
  campaignRPR: MetricCell
  flowCVR: MetricCell
  campaignCVR: MetricCell
}

type MetricKey = keyof Omit<ClientRow, 'name'>

// ─── All Clients dropdown options ────────────────────────────────────────────

const ALL_CLIENTS_OPTIONS = [
  'Total Revenue',
  'Attributed Revenue',
  'Attributed Revenue %',
  'Total Email Orders',
  'Unattributed Revenue',
  'Total Orders',
  'Store AOV',
  'Klaviyo AOV',
  'Klaviyo Recipients',
  'Klaviyo Open Rate',
  'Klaviyo Click Rate',
  'Klaviyo RPR',
]

// ─── All metric columns ───────────────────────────────────────────────────────

const ALL_METRIC_COLUMNS: { key: MetricKey; label: string; defaultVisible: boolean }[] = [
  { key: 'totalRevenue',         label: 'Total Revenue',         defaultVisible: true  },
  { key: 'attributedRevenue',    label: 'Attributed Revenue',    defaultVisible: true  },
  { key: 'unattributedRevenue',  label: 'Unattributed Revenue',  defaultVisible: true  },
  { key: 'campaignRevenue',      label: 'Campaign Revenue',      defaultVisible: true  },
  { key: 'flowRevenue',          label: 'Flow Revenue',          defaultVisible: true  },
  { key: 'attributedRevenuePct', label: 'Attributed Revenue %',  defaultVisible: false },
  { key: 'flowOpenRate',         label: 'Flow Open Rate',        defaultVisible: false },
  { key: 'campaignOpenRate',     label: 'Campaign Open Rate',    defaultVisible: false },
  { key: 'flowClickRate',        label: 'Flow Click Rate',       defaultVisible: false },
  { key: 'campaignRPR',          label: 'Campaign RPR',          defaultVisible: false },
  { key: 'flowCVR',              label: 'Flow CVR',              defaultVisible: false },
  { key: 'campaignCVR',          label: 'Campaign CVR',          defaultVisible: false },
]

// ─── Static data ──────────────────────────────────────────────────────────────

const ALL_CLIENTS: BarEntry[] = [
  { name: 'Fling', value: 80 },
  { name: '1620 Workwear', value: 62 },
  { name: 'Amla Green', value: 73 },
  { name: 'Based', value: 70, highlighted: true },
  { name: 'Bloombox Club', value: 67 },
  { name: 'Lifepro', value: 37 },
  { name: 'Fabulove', value: 65 },
  { name: 'Pet Cove', value: 15 },
  { name: 'Hormones', value: 60 },
  { name: 'Stars + Honey', value: 29 },
]

const TOP_PERFORMING: BarEntry[] = [
  { name: 'Fling', value: 80 },
  { name: '1620 Work...', value: 73 },
  { name: 'Amla Green', value: 69 },
  { name: 'Based', value: 63 },
  { name: 'Bloombox Club', value: 59 },
]

const WORST_PERFORMING: BarEntry[] = [
  { name: 'Fabulove', value: 50 },
  { name: 'Lifepro', value: 40 },
  { name: 'Pet Cove', value: 32 },
  { name: 'Hormones', value: 26 },
  { name: 'Stars + Honey', value: 19 },
]

const OVER_TIME: LinePoint[] = [
  { label: 'Jul 24', value: 67 },
  { label: 'Aug 24', value: 77 },
  { label: 'Sep 24', value: 10 },
  { label: 'Oct 24', value: 43 },
  { label: 'Nov 24', value: 52 },
  { label: 'Dec 24', value: 67 },
]

function makeRow(
  name: string,
  total: [string, Trend, number],
  attr: [string, Trend, number],
  unattr: [string, Trend, number],
  camp: [string, Trend, number],
  flow: [string, Trend, number],
  attrPct: [string, Trend, number],
  flowOpen: [string, Trend, number],
  campOpen: [string, Trend, number],
  flowClick: [string, Trend, number],
  campRPR: [string, Trend, number],
  flowCVR: [string, Trend, number],
  campCVR: [string, Trend, number],
): ClientRow {
  const c = (t: [string, Trend, number]): MetricCell => ({ value: t[0], trend: t[1], pct: t[2] })
  return {
    name,
    totalRevenue:         c(total),
    attributedRevenue:    c(attr),
    unattributedRevenue:  c(unattr),
    campaignRevenue:      c(camp),
    flowRevenue:          c(flow),
    attributedRevenuePct: c(attrPct),
    flowOpenRate:         c(flowOpen),
    campaignOpenRate:     c(campOpen),
    flowClickRate:        c(flowClick),
    campaignRPR:          c(campRPR),
    flowCVR:              c(flowCVR),
    campaignCVR:          c(campCVR),
  }
}

const CLIENT_ROWS: ClientRow[] = [
  makeRow('Fling',         ['$10,44,28,194','green',123], ['$85,30,236','green',123], ['$2,67,93,632','green',123], ['$5,72,543','green',123], ['$7,54,010','green',123], ['34.52%','green',16],  ['42.3%','green', 8], ['51.2%','red',  5],  ['12.4%','green',11], ['$2.43','green',19], ['3.21%','red',  7],  ['4.56%','green',14]),
  makeRow('1620 Workwear', ['$10,44,28,194','green',123], ['$85,30,236','red',   89], ['$2,67,93,632','green',123], ['$5,72,543','green',123], ['$7,54,010','green',123], ['28.91%','red',  12], ['38.1%','green',14], ['47.3%','green',9],  ['10.8%','red',  6],  ['$1.89','red',  8],  ['2.87%','green',15], ['3.92%','red',  5] ),
  makeRow('Amla Green',    ['$10,44,28,194','green',123], ['$85,30,236','red',   89], ['$2,67,93,632','green',123], ['$5,72,543','red',   89], ['$7,54,010','green',123], ['31.04%','green',9],  ['40.5%','red',  3],  ['52.1%','green',7],  ['11.2%','green',18], ['$2.11','green',6],  ['3.05%','red',  9],  ['4.12%','green',11]),
  makeRow('Based',         ['$10,44,28,194','red',   89], ['$85,30,236','green',123], ['$2,67,93,632','red',   89], ['$5,72,543','red',   89], ['$7,54,010','green',123], ['29.77%','red',  14], ['44.2%','green',11], ['49.8%','red',  4],  ['9.7%','red',   2],  ['$2.28','red',  5],  ['2.94%','green',10], ['3.78%','red',  8] ),
  makeRow('Bloombox Club', ['$10,44,28,194','green',123], ['$85,30,236','green',123], ['$2,67,93,632','red',   89], ['$5,72,543','green',123], ['$7,54,010','green',123], ['33.18%','green',7],  ['39.9%','green',6],  ['53.4%','green',12], ['13.1%','red',  4],  ['$2.67','green',22], ['3.41%','red',  6],  ['4.89%','green',16]),
  makeRow('Lifepro',       ['$10,44,28,194','green',123], ['$85,30,236','red',   89], ['$2,67,93,632','red',   89], ['$5,72,543','red',   89], ['$7,54,010','green',123], ['26.43%','red',  18], ['36.7%','red',  9],  ['44.6%','red',  7],  ['8.9%','red',   8],  ['$1.72','red',  11], ['2.63%','red',  13], ['3.45%','red',  9] ),
  makeRow('Fabulove',      ['$10,44,28,194','red',   89], ['$85,30,236','green',123], ['$2,67,93,632','green',123], ['$5,72,543','red',   89], ['$7,54,010','green',123], ['35.91%','green',21], ['43.8%','green',17], ['50.9%','green',3],  ['14.6%','green',23], ['$2.91','green',8],  ['3.74%','green',12], ['5.13%','green',19]),
  makeRow('Pet Cove',      ['$10,44,28,194','red',   89], ['$85,30,236','green',123], ['$2,67,93,632','red',   89], ['$5,72,543','red',   89], ['$7,54,010','green',123], ['27.85%','red',  10], ['37.4%','red',  5],  ['46.1%','red',  6],  ['10.1%','red',  10], ['$1.94','red',  4],  ['2.78%','red',  8],  ['3.62%','red',  12]),
  makeRow('Tabs',          ['$10,44,28,194','green',123], ['$85,30,236','green',123], ['$2,67,93,632','green',123], ['$5,72,543','green',123], ['$7,54,010','green',123], ['32.67%','green',13], ['41.6%','green',9],  ['54.2%','green',15], ['12.9%','green',7],  ['$2.54','green',17], ['3.18%','green',5],  ['4.37%','green',8] ),
  makeRow('Hormones',      ['$10,44,28,194','green',123], ['$85,30,236','red',   89], ['$2,67,93,632','green',123], ['$5,72,543','green',123], ['$7,54,010','green',123], ['30.22%','red',  8],  ['40.1%','green',12], ['48.7%','green',10], ['11.5%','green',14], ['$2.19','green',9],  ['3.07%','green',11], ['4.01%','red',  6] ),
]

// ─── Shared primitives ────────────────────────────────────────────────────────

function TrendBadge({ pct, variant }: { pct: number; variant: Trend }) {
  const isGreen = variant === 'green'
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[12px] font-semibold whitespace-nowrap flex-shrink-0 ${isGreen ? 'bg-[#ecfaee] text-[#00ae1d]' : 'bg-[#fff2f2] text-[#ff0004]'}`}>
      {isGreen ? <ArrowUp size={8} /> : <ArrowDown size={8} />}
      {pct}%
    </span>
  )
}

function ChartCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-[6px] p-5 ${className}`}>{children}</div>
}

function ChartTitle({ label, bold }: { label: string; bold: string }) {
  return (
    <p className="text-base font-normal text-sendlytics-text-default mb-4 leading-snug">
      {label}: <span className="font-semibold">{bold}</span>
    </p>
  )
}

// ─── All Clients button + dropdown ───────────────────────────────────────────

function AllClientsButton() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}

        <button
          onClick={() => setOpen(o => !o)}
          className={`flex items-center gap-2 border bg-white rounded-[6px] px-4 py-2 w-fit transition-colors ${
            open
              ? 'border-sendlytics-primary-blue'
              : 'border-sendlytics-grey-200 hover:bg-sendlytics-grey-50'
          }`}
        >
          <span className="text-sm font-semibold text-sendlytics-text-default">
            {selected ?? 'All Clients'}
          </span>
          <ChevronDown
            size={12}
            className={`text-sendlytics-text-default transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-1.5 z-50 bg-white rounded-[12px] shadow-[2px_4px_8px_rgba(0,0,0,0.16)] p-[14px] w-[228px]">
            {ALL_CLIENTS_OPTIONS.map(option => (
              <button
                key={option}
                onClick={() => { setSelected(option); setOpen(false) }}
                className={`flex items-center w-full px-2 py-3 text-base text-left border-b border-[#f5f5f5] last:border-0 transition-colors hover:bg-sendlytics-grey-50 ${
                  selected === option
                    ? 'font-semibold text-sendlytics-primary-blue'
                    : 'font-normal text-sendlytics-text-default'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs text-sendlytics-grey-400">Showing 10 clients</span>
    </div>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
        checked
          ? 'bg-sendlytics-primary-blue border-sendlytics-primary-blue'
          : 'border-sendlytics-grey-400 bg-white'
      }`}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" aria-hidden="true">
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

// ─── Manage Metrics modal ─────────────────────────────────────────────────────

function ManageMetricsModal({
  visible,
  onToggle,
  onToggleAll,
  onClose,
}: {
  visible: Set<string>
  onToggle: (key: string) => void
  onToggleAll: () => void
  onClose: () => void
}) {
  const allChecked = ALL_METRIC_COLUMNS.every(col => visible.has(col.key))

  return (
    <>
      {/* Backdrop — click outside to close */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.14)] px-7 py-7 w-[388px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-normal text-sendlytics-text-default">Manage Metrics</h3>
          <button
            onClick={onClose}
            className="text-sendlytics-text-default hover:opacity-60 transition-opacity"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-sendlytics-grey-200 mb-5" />

        {/* Checklist */}
        <div className="flex flex-col gap-[19px]">
          {/* Select All */}
          <label className="flex items-center gap-[10px] cursor-pointer select-none">
            <Checkbox checked={allChecked} onChange={onToggleAll} />
            <span className="text-base text-sendlytics-text-default">Select All</span>
          </label>

          {/* Individual metrics */}
          {ALL_METRIC_COLUMNS.map(col => (
            <label key={col.key} className="flex items-center gap-[10px] cursor-pointer select-none">
              <Checkbox checked={visible.has(col.key)} onChange={() => onToggle(col.key)} />
              <span className="text-base text-sendlytics-text-default">{col.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── CSS bar chart ─────────────────────────────────────────────────────────────

interface BarChartCSSProps {
  data: BarEntry[]
  yMax: number
  yTicks: number[]
  barColor: string
  highlightColor?: string
  barWidth: number
  chartHeight: number
  tooltip?: boolean
}

function BarChartCSS({ data, yMax, yTicks, barColor, highlightColor, barWidth, chartHeight, tooltip = false }: BarChartCSSProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const sorted = [...yTicks].sort((a, b) => b - a)

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between shrink-0 w-8" style={{ height: chartHeight }}>
        {sorted.map(tick => (
          <span key={tick} className="text-[11px] font-light text-sendlytics-text-default text-right leading-none">
            {tick}%
          </span>
        ))}
      </div>

      {/* Chart area */}
      <div className="flex-1 flex flex-col gap-0">
        <div className="relative" style={{ height: chartHeight }}>
          {/* Horizontal gridlines */}
          {sorted.map(tick => (
            <div
              key={tick}
              className="absolute w-full border-t border-sendlytics-grey-200"
              style={{ bottom: `${(tick / yMax) * 100}%` }}
            />
          ))}

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between gap-1 md:gap-2">
            {data.map((entry, i) => {
              const barH = Math.max((entry.value / yMax) * chartHeight, 4)
              const fill = entry.highlighted && highlightColor ? highlightColor : barColor
              const isHovered = hoveredIdx === i

              return (
                <div
                  key={entry.name}
                  className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer"
                  onMouseEnter={() => tooltip ? setHoveredIdx(i) : undefined}
                  onMouseLeave={() => tooltip ? setHoveredIdx(null) : undefined}
                >
                  {tooltip && isHovered && (
                    <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 bg-white border border-sendlytics-grey-200 rounded-lg shadow-lg p-4 min-w-[220px]">
                      <div className="flex justify-between gap-6 text-base mb-4">
                        <span className="font-normal text-sendlytics-text-default">Client</span>
                        <span className="font-semibold text-sendlytics-text-default">{entry.name}</span>
                      </div>
                      <div className="flex justify-between gap-6 text-base">
                        <span className="font-normal text-sendlytics-text-default">Attributed Revenue %</span>
                        <span className="font-semibold text-sendlytics-text-default">{entry.value}%</span>
                      </div>
                    </div>
                  )}
                  <div
                    className="rounded-[38px] transition-opacity hover:opacity-80"
                    style={{ height: barH, width: barWidth, backgroundColor: fill }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex items-start justify-between gap-1 md:gap-2 mt-3">
          {data.map(entry => (
            <div key={entry.name} className="flex-1 text-center">
              <span className="text-[11px] font-medium text-sendlytics-text-default leading-tight block">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SVG line chart ────────────────────────────────────────────────────────────

function LineChartSVG({ data, yMax, yTicks, chartHeight }: { data: LinePoint[]; yMax: number; yTicks: number[]; chartHeight: number }) {
  const sorted = [...yTicks].sort((a, b) => b - a)
  const VW = 1000
  const VH = chartHeight

  const toX = (i: number) => (i / (data.length - 1)) * VW
  const toY = (v: number) => (1 - v / yMax) * VH

  const polylinePoints = data.map((pt, i) => `${toX(i)},${toY(pt.value)}`).join(' ')

  return (
    <div className="flex gap-3 md:gap-4">
      <div className="flex flex-col justify-between shrink-0 w-8" style={{ height: chartHeight }}>
        {sorted.map(tick => (
          <span key={tick} className="text-[11px] font-light text-sendlytics-text-default text-right leading-none">
            {tick}%
          </span>
        ))}
      </div>

      <div className="flex-1">
        <div className="relative" style={{ height: chartHeight }}>
          {sorted.map(tick => (
            <div
              key={tick}
              className="absolute w-full border-t border-sendlytics-grey-200"
              style={{ bottom: `${(tick / yMax) * 100}%` }}
            />
          ))}

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#0284C7"
              strokeWidth="6"
              strokeLinejoin="round"
              points={polylinePoints}
            />
            {data.map((pt, i) => (
              <circle
                key={i}
                cx={toX(i)}
                cy={toY(pt.value)}
                r="14"
                fill="#0284C7"
                stroke="white"
                strokeWidth="5"
              />
            ))}
          </svg>
        </div>

        <div className="flex items-start justify-between mt-3">
          {data.map(pt => (
            <span key={pt.label} className="text-[11px] font-medium text-sendlytics-text-default text-center leading-tight">
              {pt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Client Summary table ─────────────────────────────────────────────────────

function RevCell({ cell }: { cell: MetricCell }) {
  return (
    <td className="pl-2 pr-6 py-3 h-[50px]">
      <div className="flex items-center gap-2">
        <span className="text-base font-medium text-sendlytics-text-default whitespace-nowrap">{cell.value}</span>
        <TrendBadge pct={cell.pct} variant={cell.trend} />
      </div>
    </td>
  )
}

function ClientSummaryTable() {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [showModal, setShowModal] = useState(false)
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(
    () => new Set(ALL_METRIC_COLUMNS.filter(c => c.defaultVisible).map(c => c.key))
  )

  const handleToggle = (key: string) => {
    setVisibleMetrics(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleToggleAll = () => {
    const allKeys = ALL_METRIC_COLUMNS.map(c => c.key)
    const allChecked = allKeys.every(k => visibleMetrics.has(k))
    setVisibleMetrics(new Set(allChecked ? [] : allKeys))
  }

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const visibleColumns = ALL_METRIC_COLUMNS.filter(c => visibleMetrics.has(c.key))
  const rows = CLIENT_ROWS.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <ChartCard>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-sendlytics-text-default">Client Summary</h2>
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-3 border border-sendlytics-grey-600 rounded-lg px-4 py-2.5 cursor-text min-w-[200px]">
              <Search size={16} className="text-sendlytics-grey-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Client"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="text-sm text-sendlytics-grey-600 outline-none bg-transparent placeholder:text-sendlytics-grey-600 w-full"
              />
            </label>

            {/* Manage Metrics trigger */}
            <div className="relative">
              <button
                onClick={() => setShowModal(m => !m)}
                className={`flex items-center gap-3 border rounded-lg px-4 py-2.5 transition-colors ${
                  showModal
                    ? 'border-sendlytics-primary-blue bg-white'
                    : 'border-sendlytics-grey-600 bg-white hover:bg-sendlytics-grey-50'
                }`}
              >
                <SlidersHorizontal size={16} className="text-sendlytics-text-default" />
                <span className="text-sm font-semibold text-sendlytics-text-default whitespace-nowrap">Manage Metrics</span>
              </button>

              {showModal && (
                <ManageMetricsModal
                  visible={visibleMetrics}
                  onToggle={handleToggle}
                  onToggleAll={handleToggleAll}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>
          </div>
          <p className="text-xs italic text-sendlytics-grey-600 max-w-[500px] text-right leading-relaxed">
            *Manage Metrics allows you to show or hide metric columns based on your preferences
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              {/* Sticky Client Name column */}
              <th
                onClick={() => handleSort('name')}
                className="text-left h-[50px] px-2 pl-1 border-b border-sendlytics-grey-200 text-base font-normal text-sendlytics-text-default cursor-pointer select-none whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  Client Name
                  <ChevronDown
                    size={10}
                    className={`text-sendlytics-grey-400 transition-transform ${sortKey === 'name' && sortDir === 'desc' ? 'rotate-180' : ''}`}
                  />
                </div>
              </th>
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left h-[50px] px-2 border-b border-sendlytics-grey-200 text-base font-normal text-sendlytics-text-default cursor-pointer select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    <ChevronDown
                      size={10}
                      className={`text-sendlytics-grey-400 transition-transform ${sortKey === col.key && sortDir === 'desc' ? 'rotate-180' : ''}`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-sendlytics-grey-200 hover:bg-sendlytics-grey-50 transition-colors">
                <td className="pl-1 pr-2 py-3 h-[50px] text-base font-semibold text-sendlytics-text-default whitespace-nowrap">
                  {row.name}
                </td>
                {visibleColumns.map(col => (
                  <RevCell key={col.key} cell={row[col.key]} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  )
}

// ─── Page header ──────────────────────────────────────────────────────────────

const SORT_BY_OPTIONS = ['Day', 'Week', 'Month', 'Year']
const COMPARE_TO_OPTIONS = ['Previous Period', 'Previous Year']

function AgencyHeader() {
  const [sortBy, setSortBy] = useState('Month')
  const [sortByOpen, setSortByOpen] = useState(false)
  const [compareTo, setCompareTo] = useState('Previous Period')
  const [compareToOpen, setCompareToOpen] = useState(false)

  return (
    <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 px-6 pt-2 pb-4 border-b border-sendlytics-grey-200 bg-sendlytics-grey-50 flex-shrink-0">
      <h1 className="text-2xl font-semibold text-sendlytics-text-default">Agency Breakdown</h1>

      <div className="flex flex-wrap items-start gap-x-14 gap-y-3">
        {/* Date range */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#808080]">Date</span>
            <ChevronDown size={8} className="text-[#808080]" />
          </button>
          <div className="flex items-center gap-2">
            {(['10/23/24', '12/29/24'] as const).map(date => (
              <button key={date} className="flex items-center gap-1.5 border border-sendlytics-grey-600 rounded-[6px] px-2.5 py-1.5 hover:bg-white transition-colors">
                <Calendar size={11} className="text-sendlytics-text-default" />
                <span className="text-sm font-semibold text-sendlytics-text-default">{date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div className="relative flex flex-col gap-1.5 items-start">
          {sortByOpen && <div className="fixed inset-0 z-40" onClick={() => setSortByOpen(false)} />}
          <button
            onClick={() => setSortByOpen(o => !o)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xs font-medium text-[#808080]">Sort by</span>
            <ChevronDown
              size={8}
              className={`text-[#808080] transition-transform duration-200 ${sortByOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <span className="text-base font-semibold text-sendlytics-text-default">{sortBy}</span>

          {sortByOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-50 bg-white rounded-[12px] shadow-[2px_4px_8px_rgba(0,0,0,0.16)] p-[14px] w-[140px]">
              {SORT_BY_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => { setSortBy(option); setSortByOpen(false) }}
                  className={`flex items-center w-full px-2 py-3 text-base text-left border-b border-[#f5f5f5] last:border-0 transition-colors hover:bg-sendlytics-grey-50 ${
                    sortBy === option
                      ? 'font-semibold text-sendlytics-primary-blue'
                      : 'font-normal text-sendlytics-text-default'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Compare to */}
        <div className="relative flex flex-col gap-1.5 items-start">
          {compareToOpen && <div className="fixed inset-0 z-40" onClick={() => setCompareToOpen(false)} />}
          <button
            onClick={() => setCompareToOpen(o => !o)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xs font-medium text-[#808080]">Compare to</span>
            <ChevronDown
              size={8}
              className={`text-[#808080] transition-transform duration-200 ${compareToOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-base font-semibold text-sendlytics-text-default whitespace-nowrap">{compareTo}</span>
            {compareTo === 'Previous Period' && (
              <span className="text-xs font-medium text-sendlytics-text-default whitespace-nowrap">(08/24/22 - 08/19/24)</span>
            )}
          </div>

          {compareToOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-50 bg-white rounded-[12px] shadow-[2px_4px_8px_rgba(0,0,0,0.16)] p-[14px] w-[194px]">
              {COMPARE_TO_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => { setCompareTo(option); setCompareToOpen(false) }}
                  className={`flex items-center w-full px-2 py-3 text-base text-left border-b border-[#f5f5f5] last:border-0 transition-colors hover:bg-sendlytics-grey-50 ${
                    compareTo === option
                      ? 'font-semibold text-sendlytics-primary-blue'
                      : 'font-normal text-sendlytics-text-default'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AgencyBreakdownPage() {
  return (
    <div className="flex flex-col h-full bg-sendlytics-grey-50">
      <AgencyHeader />

      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-4">
        {/* View-by filter */}
        <AllClientsButton />

        {/* Main bar chart */}
        <ChartCard>
          <ChartTitle label="Attributed Revenue %" bold="All Clients" />
          <BarChartCSS
            data={ALL_CLIENTS}
            yMax={80}
            yTicks={[0, 20, 40, 60, 80]}
            barColor="#91daff"
            highlightColor="#0284C7"
            barWidth={32}
            chartHeight={300}
            tooltip
          />
        </ChartCard>

        {/* 3-column chart row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChartCard>
            <ChartTitle label="Attributed Revenue %" bold="Top Performing Clients" />
            <BarChartCSS
              data={TOP_PERFORMING}
              yMax={80}
              yTicks={[20, 40, 60, 80]}
              barColor="#bde7bd"
              barWidth={16}
              chartHeight={200}
            />
          </ChartCard>

          <ChartCard>
            <ChartTitle label="Attributed Revenue %" bold="Worst Performing Clients" />
            <BarChartCSS
              data={WORST_PERFORMING}
              yMax={60}
              yTicks={[0, 20, 40, 60]}
              barColor="#ffb6b3"
              barWidth={16}
              chartHeight={200}
            />
          </ChartCard>

          <ChartCard>
            <ChartTitle label="Attributed Revenue %" bold="Over Time" />
            <LineChartSVG
              data={OVER_TIME}
              yMax={80}
              yTicks={[0, 20, 40, 60, 80]}
              chartHeight={200}
            />
          </ChartCard>
        </div>

        {/* Client summary table */}
        <ClientSummaryTable />
      </div>
    </div>
  )
}
