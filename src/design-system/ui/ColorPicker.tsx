'use client'

import React from 'react'
import { RotateCcw } from 'lucide-react'

interface ColorOption {
  id: string
  label: string
  color: string
}

interface ColorPickerProps {
  label?: string
  colors: ColorOption[]
  onReset?: () => void
}

export function ColorPicker({ label, colors, onReset }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-5">
      {label && (
        <span className="text-base font-semibold text-sendlytics-text-default">{label}</span>
      )}
      <div className="flex items-center gap-[26px]">
        {colors.map(opt => (
          <div key={opt.id} className="flex flex-col items-center gap-2">
            <div
              className="w-[51px] h-[51px] rounded-full border-4 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.08)] cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: opt.color }}
            />
            <span className="text-sm font-semibold text-sendlytics-text-default text-center">
              {opt.label}
            </span>
          </div>
        ))}
        {onReset && (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onReset}
              className="w-[51px] h-[51px] rounded-full border-2 border-sendlytics-grey-200 flex items-center justify-center cursor-pointer hover:bg-sendlytics-grey-100 transition-colors"
            >
              <RotateCcw size={20} className="text-sendlytics-grey-600" />
            </button>
            <span className="text-sm font-semibold text-sendlytics-grey-800 text-center">
              Apply Default Colours
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
