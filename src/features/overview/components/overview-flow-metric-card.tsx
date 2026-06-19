'use client'

import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { FlowMetricSummary } from '../types/overview.types'

interface OverviewFlowMetricCardProps {
  metric: FlowMetricSummary
}

export function OverviewFlowMetricCard({ metric }: OverviewFlowMetricCardProps) {
  const isUp = metric.trend === 'up'

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-sendlytics-grey-400">{metric.label}</span>
      <span className="text-lg font-semibold text-sendlytics-text-default">{metric.value}</span>
      <div className="flex items-center gap-1">
        <span
          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
            isUp ? 'text-sendlytics-growth' : 'text-sendlytics-loss'
          }`}
        >
          {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(metric.changePercent)}%
        </span>
        <span className="text-[10px] font-medium text-sendlytics-grey-400">vs {metric.comparisonValue}</span>
      </div>
    </div>
  )
}
