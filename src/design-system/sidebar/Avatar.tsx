'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'

interface AvatarProps {
  name: string
  role?: string
  collapsed: boolean
  onLogout?: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name, role, collapsed, onLogout }: AvatarProps) {
  const initials = getInitials(name)

  const circle = (
    <div className="w-10 h-10 rounded-full bg-sendlytics-primary-blue flex items-center justify-center flex-shrink-0">
      <span className="text-white text-sm font-semibold select-none">{initials}</span>
    </div>
  )

  if (collapsed) {
    return (
      <button
        onClick={onLogout}
        className="flex justify-center w-full"
        title={name}
        aria-label={`${name} — click to sign out`}
      >
        {circle}
      </button>
    )
  }

  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-3 w-full pl-[18px] text-left hover:opacity-80 transition-opacity"
      aria-label={`${name} — click to sign out`}
    >
      {circle}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-semibold text-sendlytics-grey-400 truncate">
          {role || 'Welcome back'}
        </span>
        <span className="text-sm font-medium text-sendlytics-text-default truncate">{name}</span>
      </div>
      <ChevronRight size={20} className="text-sendlytics-text-default flex-shrink-0" />
    </button>
  )
}
