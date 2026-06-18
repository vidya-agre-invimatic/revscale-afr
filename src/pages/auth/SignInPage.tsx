'use client'

import React, { useState } from 'react'

interface SignInPageProps {
  onSignIn: () => void
}

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
    </svg>
  )
}

function Spinner() {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-[#E3E6EB] border-t-[#3A3C40] animate-spin" />
  )
}

interface OAuthButtonProps {
  icon: React.ReactNode
  label: string
  loading: boolean
  disabled: boolean
  onClick: () => void
}

function OAuthButton({ icon, label, loading, disabled, onClick }: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'w-full h-[46px]',
        'flex items-center justify-center gap-[15px] px-[15px] py-[10px]',
        'bg-white border-[0.5px] border-[#222329] rounded-[6px]',
        'text-[16px] font-medium text-[#222329]',
        'hover:bg-[#FAFAFA] active:bg-[#F5F5F5]',
        'transition-colors duration-150 select-none',
        loading ? 'opacity-70' : '',
        disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        {loading ? <Spinner /> : icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

export function SignInPage({ onSignIn }: SignInPageProps) {
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingMicrosoft, setLoadingMicrosoft] = useState(false)

  const handleSignIn = (provider: 'google' | 'microsoft') => {
    if (loadingGoogle || loadingMicrosoft) return
    if (provider === 'google') setLoadingGoogle(true)
    else setLoadingMicrosoft(true)
    setTimeout(() => onSignIn(), 250)
  }

  const anyLoading = loadingGoogle || loadingMicrosoft

  return (
    <div className="flex flex-col items-center gap-[36px] w-[400px]">
      <div className="flex flex-col items-center gap-[6px] w-[289px]">
        <h1 className="text-[28px] font-semibold leading-normal text-[#222329] whitespace-nowrap">
          Welcome to Rev Scale
        </h1>
        <p className="text-[18px] font-normal leading-normal text-[#222329] text-center">
          &ldquo;Track. Analyze. Optimize.&rdquo;
        </p>
      </div>

      <div className="flex flex-col gap-[16px] w-full">
        <OAuthButton
          icon={<GoogleIcon />}
          label="Sign In with Google"
          loading={loadingGoogle}
          disabled={anyLoading && !loadingGoogle}
          onClick={() => handleSignIn('google')}
        />
        <OAuthButton
          icon={<MicrosoftIcon />}
          label="Sign In with Microsoft"
          loading={loadingMicrosoft}
          disabled={anyLoading && !loadingMicrosoft}
          onClick={() => handleSignIn('microsoft')}
        />
      </div>
    </div>
  )
}
