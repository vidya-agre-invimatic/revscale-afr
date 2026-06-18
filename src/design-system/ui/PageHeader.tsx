'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface PageHeaderProps {
  title: string
  /** Filter controls rendered to the right of the title */
  filters?: ReactNode
  /** Action buttons rendered after the filters */
  actions?: ReactNode
}

/**
 * Top header bar present on every page — title on the left, filters and actions on the right.
 * A 1px bottom border separates it from the page body.
 */
export function PageHeader({ title, filters, actions }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between h-[68px] px-6 border-b border-sendlytics-grey-200 flex-shrink-0">
      <h1 className="text-2xl font-semibold text-sendlytics-text-default">{title}</h1>
      {(filters ?? actions) ? (
        <div className="flex items-center gap-3">
          {filters}
          {actions}
        </div>
      ) : null}
    </header>
  )
}
