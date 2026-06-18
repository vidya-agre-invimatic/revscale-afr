'use client'

import type { ReactNode } from 'react';
import React from 'react'

interface SidebarShellProps {
  /** Whether the sidebar is in collapsed (icon-only) mode */
  collapsed: boolean
  /** Sidebar content (rendered in the left panel) */
  sidebar?: ReactNode
  /** Main content area rendered to the right of the sidebar */
  children: ReactNode
}

const SIDEBAR_EXPANDED = 240
const SIDEBAR_COLLAPSED = 80

/**
 * Root layout shell — places a collapsible sidebar panel on the left and
 * a scrollable main content area on the right. Width transitions are CSS-animated.
 */
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
        className="h-screen bg-sendlytics-grey-50 border-r border-sendlytics-grey-200 overflow-hidden flex-shrink-0"
      >
        {sidebar}
      </aside>
      <main className="flex-1 bg-white overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
