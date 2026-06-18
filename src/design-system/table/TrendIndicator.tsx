'use client'

import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface TrendIndicatorProps {
  /** Percentage value — sign is ignored when variant is 'red' (use absolute value) */
  value: number
  /** green = growth (up arrow), red = loss (down arrow), invisible = neutral/empty state */
  variant: 'green' | 'red' | 'invisible'
}

/**
 * Displays a trend percentage with a directional arrow icon.
 * Used in table cells to show growth, loss, or neutral status.
 */
export function TrendIndicator({ value, variant }: TrendIndicatorProps) {
  if (variant === 'invisible') {
    return (
      <span className="inline-flex items-center text-xs font-medium text-sendlytics-grey-400">
        {Math.abs(value)}%
      </span>
    )
  }

  const isGreen = variant === 'green'

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        isGreen ? 'text-sendlytics-growth' : 'text-sendlytics-loss'
      }`}
    >
      {isGreen ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {Math.abs(value)}%
    </span>
  )
}
