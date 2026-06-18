'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SignInLoadingProps {
  onComplete?: () => void
}

/**
 * Full-screen transition screen shown for 1 500 ms between the sign-in
 * button click and the onboarding modal. Animates a progress bar using a
 * CSS transition triggered immediately after mount.
 */
export function SignInLoading({ onComplete }: SignInLoadingProps) {
  const [progress, setProgress] = useState(0)
  const callbackRef = useRef(onComplete)
  callbackRef.current = onComplete

  useEffect(() => {
    // Trigger progress bar transition on next paint
    const raf = requestAnimationFrame(() => setProgress(100))
    // Advance flow after 1 500 ms
    const timer = setTimeout(() => callbackRef.current?.(), 1500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-sendlytics-primary-green rounded-sm" />
        <span
          className="text-sendlytics-primary-blue tracking-tight select-none"
          style={{ fontSize: 20, fontWeight: 800 }}
        >
          SENDLYTICS
        </span>
      </div>

      {/* Status text */}
      <p className="text-sm font-medium text-sendlytics-grey-400">Signing you in…</p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-sendlytics-grey-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-sendlytics-primary-green rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 1500ms linear',
          }}
        />
      </div>
    </div>
  )
}
