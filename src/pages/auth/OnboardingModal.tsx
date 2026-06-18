'use client'

import React, { useState } from 'react'
import { Button } from '@/design-system/ui/Button'

interface OnboardingModalProps {
  open: boolean
  onComplete: () => void
  onSkip: () => void
}

// ---------------------------------------------------------------------------
// Step config
// ---------------------------------------------------------------------------

interface HighlightStyle {
  top: string
  left: string
  width: string
  height: string
}

const TOTAL_STEPS = 3

const HIGHLIGHTS: HighlightStyle[] = [
  // Step 0 — bar chart
  { top: '50px', left: '60px', width: 'calc(100% - 68px)', height: '88px' },
  // Step 1 — table
  { top: '152px', left: '60px', width: 'calc(100% - 68px)', height: '124px' },
  // Step 2 — sidebar
  { top: '4px', left: '4px', width: '56px', height: 'calc(100% - 8px)' },
]

const STEP_CAPTIONS = [
  'Visualise performance with clear bar charts for every campaign and flow.',
  'Drill down with sortable data tables covering all your key email metrics.',
  'Jump between analytics modules in seconds from the collapsible sidebar.',
]

// ---------------------------------------------------------------------------
// Mock dashboard illustration
// ---------------------------------------------------------------------------

const MOCK_BARS = [42, 65, 35, 88, 55, 74, 46, 92, 68, 50]

function MockDashboard({ highlightStyle }: { highlightStyle: HighlightStyle }) {
  return (
    <div className="relative w-full h-full flex rounded-lg overflow-hidden border border-[#E3E6EB] bg-white">
      {/* Sidebar */}
      <div className="w-[60px] flex-shrink-0 flex flex-col items-center py-3 gap-2" style={{ background: '#222329' }}>
        <div className="w-8 h-8 rounded-full bg-sendlytics-primary-blue mb-1 flex-shrink-0" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            className="w-7 h-6 rounded-md flex-shrink-0"
            style={{ background: i === 0 ? '#53A669' : '#3A3C40' }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page header */}
        <div className="h-10 border-b border-[#E3E6EB] flex items-center px-4 flex-shrink-0 bg-white">
          <div className="h-4 w-40 bg-[#E3E6EB] rounded" />
          <div className="ml-auto flex gap-2">
            <div className="h-7 w-20 bg-[#F5F5F5] rounded-md" />
            <div className="h-7 w-20 bg-[#F5F5F5] rounded-md" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-20 mb-4">
            {MOCK_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-sendlytics-primary-green rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Table */}
          <div className="border border-[#E3E6EB] rounded overflow-hidden">
            {/* Header */}
            <div className="h-8 bg-[#FAFAFA] border-b border-[#E3E6EB] flex items-center px-3 gap-6">
              {['Client Name', 'Revenue', 'Change'].map(h => (
                <div key={h} className="h-2.5 bg-[#E3E6EB] rounded flex-1" />
              ))}
            </div>
            {/* Rows */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 border-b border-[#E3E6EB] last:border-0 flex items-center px-3 gap-6"
              >
                <div className="h-2 bg-[#F5F5F5] rounded flex-1" />
                <div className="h-2 bg-[#F5F5F5] rounded flex-1" />
                <div className="h-2 bg-[#F5F5F5] rounded flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated highlight box */}
      <div
        className="absolute border-2 border-sendlytics-primary-green rounded-lg pointer-events-none shadow-[0_0_0_4px_rgba(83,166,105,0.15)]"
        style={{
          top: highlightStyle.top,
          left: highlightStyle.left,
          width: highlightStyle.width,
          height: highlightStyle.height,
          transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dot indicator
// ---------------------------------------------------------------------------

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[5px] rounded-full transition-all duration-300 ${
            i === current
              ? 'w-9 bg-sendlytics-primary-green'
              : 'w-2 bg-[#E3E6EB]'
          }`}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

/**
 * 3-step onboarding tour modal shown after sign-in.
 * Renders a mock Agency Breakdown preview with an animated highlight box
 * that shifts to focus on different UI areas as the user steps through the tour.
 */
export function OnboardingModal({ open, onComplete, onSkip }: OnboardingModalProps) {
  const [step, setStep] = useState(0)

  if (!open) return null

  const isFirst = step === 0
  const isLast  = step === TOTAL_STEPS - 1

  const advance = () => {
    if (isLast) onComplete()
    else setStep(s => s + 1)
  }

  const retreat = () => {
    if (!isFirst) setStep(s => s - 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick App Tour"
        className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ width: 720, height: 544 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b border-[#E3E6EB]">
          <h2 className="text-lg font-semibold text-[#222329]">Quick App Tour</h2>
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-[#82868C] hover:text-[#222329] transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Preview area */}
        <div className="flex-1 px-6 pt-4 pb-2 min-h-0 flex flex-col gap-3">
          <div className="flex-1 min-h-0">
            <MockDashboard highlightStyle={HIGHLIGHTS[step]} />
          </div>
          <p className="text-xs font-medium text-[#82868C] text-center flex-shrink-0">
            {STEP_CAPTIONS[step]}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-t border-[#E3E6EB]">
          {/* Dots */}
          <StepDots current={step} total={TOTAL_STEPS} />

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={isFirst}
              onClick={retreat}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={advance}
            >
              {isLast ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
