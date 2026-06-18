'use client'

import React from 'react'

interface AvatarProps {
  /** Full display name — used to derive initials */
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

/**
 * User profile area at the bottom of the sidebar.
 * Expanded: avatar circle + name + role.
 * Collapsed: avatar circle only.
 */
export function Avatar({ name, role, collapsed, onLogout }: AvatarProps) {
  const initials = getInitials(name)

  const circle = (
    <div className="w-10 h-10 rounded-full bg-sendlytics-primary-green flex items-center justify-center flex-shrink-0">
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
      className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
      aria-label={`${name} — click to sign out`}
    >
      {circle}
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-sendlytics-text-default truncate">{name}</span>
        {role && (
          <span className="text-xs font-medium text-sendlytics-grey-400 truncate">{role}</span>
        )}
      </div>
    </button>
  )
}
