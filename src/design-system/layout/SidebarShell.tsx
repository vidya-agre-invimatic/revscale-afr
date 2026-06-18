'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface SidebarShellProps {
  collapsed: boolean
  sidebar?: ReactNode
  children: ReactNode
}

const SIDEBAR_EXPANDED = 240
const SIDEBAR_COLLAPSED = 80

export function SidebarShell({ collapsed, sidebar, children }: SidebarShellProps) {
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          transition: 'width 200ms ease, min-width 200ms ease',
        }}
        className="h-screen bg-white shadow-[0px_16px_12px_rgba(0,0,0,0.07)] overflow-hidden flex-shrink-0"
      >
        {sidebar}
      </aside>
      <main className="flex-1 bg-sendlytics-grey-50 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
