'use client'

import React from 'react'
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react'
import type { OverviewMetricCard } from '../types/overview.types'

interface OverviewSummaryCardProps {
  metric: OverviewMetricCard
}

export function OverviewSummaryCard({ metric }: OverviewSummaryCardProps) {
  const isUp = metric.trend === 'up'

  return (
    <div className="bg-white rounded-lg border border-sendlytics-grey-200 p-5 flex flex-col gap-2 min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-sendlytics-grey-400">
          {metric.title}
        </span>
        {metric.hasLink && (
          <ExternalLink size={16} className="text-sendlytics-grey-400" />
        )}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-[13px] font-medium text-sendlytics-text-default">$</span>
        <span className="text-[28px] font-semibold text-sendlytics-text-default leading-tight">
          {metric.value}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
            isUp ? 'text-sendlytics-growth' : 'text-sendlytics-loss'
          }`}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(metric.changePercent)}%
        </span>
        <span className="text-xs font-medium text-sendlytics-grey-400">
          vs {metric.comparisonValue}
        </span>
      </div>

      <div className="border-t border-sendlytics-grey-100 mt-1 pt-3 flex flex-col gap-2.5">
        {metric.subMetrics.map((sub) => (
          <div key={sub.label} className="flex items-center justify-between">
            <span className="text-xs font-medium text-sendlytics-grey-400">{sub.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-sendlytics-text-default">{sub.value}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                  sub.trend === 'up' ? 'text-sendlytics-growth' : 'text-sendlytics-loss'
                }`}
              >
                {sub.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(sub.changePercent)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
