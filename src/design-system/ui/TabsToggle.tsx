'use client'

import React from 'react'

interface Tab {
  id: string
  label: string
}

interface TabsToggleProps {
  tabs: Tab[]
  value: string
  onChange: (id: string) => void
  variant?: 'green' | 'blue'
}

const activeStyles = {
  green: 'bg-white shadow-sm text-sendlytics-primary-green',
  blue:  'bg-sendlytics-primary-blue shadow-[1px_1px_2px_rgba(0,0,0,0.16)] text-white',
}

export function TabsToggle({ tabs, value, onChange, variant = 'blue' }: TabsToggleProps) {
  return (
    <div className="inline-flex items-center bg-white border border-sendlytics-grey-100 rounded-lg p-1 gap-1 h-[41px]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 h-[33px] rounded-md text-sm font-semibold whitespace-nowrap transition-all duration-150 min-w-[137px] ${
            value === tab.id
              ? activeStyles[variant]
              : 'bg-transparent text-sendlytics-grey-800 hover:text-sendlytics-text-default'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
