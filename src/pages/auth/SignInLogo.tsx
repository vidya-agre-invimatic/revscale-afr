'use client'

import React from 'react'
import Image from 'next/image'

export function SignInLogo() {
  return (
    <div className="absolute top-8 left-8 z-10 select-none">
      <Image
        src="/images/auth/revscale-logo.svg"
        alt="RevScale"
        width={108}
        height={63}
        priority
      />
    </div>
  )
}
