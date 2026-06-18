'use client'

import React, { useState, useCallback } from 'react'
import { SignInLayout } from './SignInLayout'
import { SignInPage } from './SignInPage'
import { SignInLoading } from './SignInLoading'
import { OnboardingModal } from './OnboardingModal'

type AuthStep = 'signin' | 'loading' | 'onboarding' | 'complete'

// ---------------------------------------------------------------------------
// Dummy dashboard behind the onboarding overlay
// ---------------------------------------------------------------------------

const DUMMY_BARS = [42, 65, 35, 88, 55, 74, 46, 92, 68, 50]

function DummyDashboard() {
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      {/* Sidebar */}
      <div className="w-[240px] flex-shrink-0 bg-sendlytics-grey-50 border-r border-sendlytics-grey-200 flex flex-col p-4 gap-1">
        <div className="h-8 w-36 bg-sendlytics-grey-200 rounded mb-6 flex-shrink-0" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-full rounded-md flex-shrink-0"
            style={{ background: i === 0 ? '#53A669' : 'transparent' }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="h-[68px] border-b border-sendlytics-grey-200 flex items-center px-6 flex-shrink-0">
          <div className="h-6 w-52 bg-sendlytics-grey-100 rounded" />
          <div className="ml-auto flex gap-2">
            <div className="h-9 w-28 bg-sendlytics-grey-100 rounded-md" />
            <div className="h-9 w-28 bg-sendlytics-primary-green rounded-md opacity-30" />
          </div>
        </div>
        <div className="flex-1 p-6 overflow-hidden">
          <div className="flex items-end gap-2 h-40 mb-6">
            {DUMMY_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-sendlytics-primary-green rounded-t opacity-20"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="border border-sendlytics-grey-200 rounded-lg overflow-hidden">
            <div className="h-12 bg-sendlytics-grey-50 border-b border-sendlytics-grey-200" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 border-b border-sendlytics-grey-200 last:border-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Completion screen
// ---------------------------------------------------------------------------

function CompleteScreen() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="text-center flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-sendlytics-primary-green flex items-center justify-center shadow-lg">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M7 14l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h1 className="text-[28px] font-semibold text-[#222329] mb-2">You&apos;re all set!</h1>
          <p className="text-sm font-medium text-[#82868C]">
            Welcome to SENDLYTICS — your analytics dashboard is ready.
          </p>
        </div>
        <div className="h-1 w-32 bg-sendlytics-grey-100 rounded-full overflow-hidden">
          <div className="h-full w-full bg-sendlytics-primary-green rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Flow orchestrator
// ---------------------------------------------------------------------------

/**
 * Root auth flow — manages transitions between signin → loading → onboarding → complete.
 * All async actions are mocked with setTimeout; no real auth or routing occurs.
 */
export default function AuthFlow() {
  const [step, setStep] = useState<AuthStep>('signin')

  const handleSignIn = useCallback(() => setStep('loading'), [])

  const handleLoadingComplete = useCallback(() => setStep('onboarding'), [])

  const handleOnboardingComplete = useCallback(() => setStep('complete'), [])

  if (step === 'signin') {
    return (
      <SignInLayout
        leftContent={<SignInPage onSignIn={handleSignIn} />}
      />
    )
  }

  if (step === 'loading') {
    return <SignInLoading onComplete={handleLoadingComplete} />
  }

  if (step === 'onboarding') {
    return (
      <div className="relative">
        <DummyDashboard />
        <OnboardingModal
          open
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      </div>
    )
  }

  return <CompleteScreen />
}
