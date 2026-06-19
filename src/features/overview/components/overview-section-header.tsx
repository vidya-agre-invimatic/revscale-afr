'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface OverviewSectionHeaderProps {
  title: string
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
  onViewAll?: () => void
}

export function OverviewSectionHeader({
  title,
  tabs,
  activeTab,
  onTabChange,
  onViewAll,
}: OverviewSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-sendlytics-grey-200 pb-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-sendlytics-text-default">{title}</h3>
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-sm font-medium text-sendlytics-primary-blue hover:underline"
        >
          View all Details
          <ArrowUpRight size={14} />
        </button>
      )}
    </div>
  )
}
