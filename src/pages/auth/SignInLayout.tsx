'use client'

import type { ReactNode } from 'react';
import React from 'react'
import { SignInLogo } from './SignInLogo'
import { SignInCarousel } from './SignInCarousel'

interface SignInLayoutProps {
  leftContent: ReactNode
}

export function SignInLayout({ leftContent }: SignInLayoutProps) {
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      {/* Left panel */}
      <div className="flex-1 min-w-0 flex flex-col relative bg-white">
        <SignInLogo />
        <div className="flex-1 flex items-center justify-center">
          {leftContent}
        </div>
      </div>

      {/* Right panel — 32px margin on top/right/bottom */}
      <div className="pt-8 pr-8 pb-8 flex-shrink-0">
        <div
          className="h-full w-[618px] rounded-[22px] overflow-hidden flex flex-col relative"
          style={{ background: '#0284C7' }}
        >
          <SignInCarousel />
        </div>
      </div>
    </div>
  )
}
