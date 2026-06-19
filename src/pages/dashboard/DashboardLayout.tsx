'use client'

import React, { useState } from 'react'
import { SidebarShell, Sidebar } from '@/design-system'
import SettingsPage from './SettingsPage'
import AgencyBreakdownPage from './AgencyBreakdownPage'
import ClientOverviewPage from './ClientOverviewPage'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('client-overview')

  const renderPage = () => {
    switch (activeNav) {
      case 'agency-breakdown':
        return <AgencyBreakdownPage />
      case 'client-overview':
        return <ClientOverviewPage />
      case 'settings':
        return <SettingsPage />
      default:
        return (
          <div className="flex items-center justify-center h-full text-sendlytics-grey-400 text-lg">
            {activeNav.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} — Coming Soon
          </div>
        )
    }
  }

  return (
    <SidebarShell
      collapsed={collapsed}
      sidebar={
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(c => !c)}
          activeItem={activeNav}
          onNavChange={setActiveNav}
          userName="Invimatic Te..."
          userRole="Welcome back"
        />
      }
    >
      {renderPage()}
    </SidebarShell>
  )
}
