'use client'

import React from 'react'

interface LogoProps {
  /** When true renders an icon-only version; when false renders the full wordmark */
  collapsed: boolean
}

/**
 * SENDLYTICS wordmark / icon-only logo for the sidebar header.
 * Switches between full text (expanded) and a circular initial (collapsed).
 */
export function Logo({ collapsed }: LogoProps) {
  if (collapsed) {
    return (
      <div className="w-10 h-10 rounded-full bg-sendlytics-primary-blue flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm font-semibold">S</span>
      </div>
    )
  }

  return (
    <span className="text-sendlytics-primary-blue text-2xl font-semibold tracking-wide select-none">
      SENDLYTICS
    </span>
  )
}
