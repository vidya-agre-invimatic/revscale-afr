'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ClientOverviewPage from '@/pages/dashboard/ClientOverviewPage'
import { AgencyBreakdownPage } from '@/pages/agency-breakdown/AgencyBreakdownPage'
import SettingsPage from '@/pages/dashboard/SettingsPage'
import FlowsPage from '@/pages/dashboard/FlowsPage'

const PAGES: Record<string, React.ComponentType> = {
  'client-overview': ClientOverviewPage,
  'agency-breakdown': AgencyBreakdownPage,
  'flows': FlowsPage,
  'settings': SettingsPage,
}

export default function DashboardSectionPage() {
  const params = useParams() ?? {}
  const section = (params.section as string) ?? ''
  const PageComponent = PAGES[section]

  if (!PageComponent) {
    return (
      <div className="flex items-center justify-center h-full text-sendlytics-grey-400 text-lg">
        {section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} — Coming Soon
      </div>
    )
  }

  return <PageComponent />
}
