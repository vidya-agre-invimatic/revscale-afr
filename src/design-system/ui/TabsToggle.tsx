'use client'

import React from 'react'

interface Tab {
  id: string
  label: string
}

interface TabsToggleProps {
  /** Up to 5 tab items */
  tabs: Tab[]
  value: string
  onChange: (id: string) => void
}

/**
 * Multi-option tab bar using the same pill-in-track pattern as Toggle.
 * All tabs share equal width; the active pill slides to the selected tab.
 */
export function TabsToggle({ tabs, value, onChange }: TabsToggleProps) {
  return (
    <div className="inline-flex items-center bg-sendlytics-grey-100 rounded-lg p-1 gap-1 h-[41px]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-3 h-[33px] rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
            value === tab.id
              ? 'bg-white shadow-sm text-sendlytics-primary-green'
              : 'bg-transparent text-sendlytics-grey-400 hover:text-sendlytics-text-default'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
