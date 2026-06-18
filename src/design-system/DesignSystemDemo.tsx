'use client'

/**
 * Developer-only visual reference for all SENDLYTICS design system components.
 * NOT wired into the app router — open it directly during development for review.
 */

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

import { Logo } from './sidebar/Logo'
import { NavItem } from './sidebar/NavItem'
import { NavSection } from './sidebar/NavSection'
import { Avatar } from './sidebar/Avatar'
import { Sidebar } from './sidebar/Sidebar'
import { SidebarShell } from './layout/SidebarShell'
import { TrendIndicator } from './table/TrendIndicator'
import type { DataTableColumn } from './table/DataTable';
import { DataTable } from './table/DataTable'
import { Button } from './ui/Button'
import { Toggle } from './ui/Toggle'
import { TabsToggle } from './ui/TabsToggle'
import { DropdownMenu } from './ui/DropdownMenu'
import { PageHeader } from './ui/PageHeader'
import { LogoutModal } from './ui/LogoutModal'

// ---------------------------------------------------------------------------
// Sample data for DataTable demo
// ---------------------------------------------------------------------------

interface SampleRow {
  client: string
  revenue: string
  change: number
  trend: 'green' | 'red' | 'invisible'
}

const SAMPLE_ROWS: SampleRow[] = [
  { client: 'Acme Corp',    revenue: '$12,400', change: 8.2,  trend: 'green' },
  { client: 'Beta LLC',     revenue: '$9,100',  change: 3.1,  trend: 'red' },
  { client: 'Gamma Inc',    revenue: '$5,500',  change: 0,    trend: 'invisible' },
  { client: 'Delta Co',     revenue: '$18,200', change: 14.7, trend: 'green' },
]

const COLUMNS: DataTableColumn<SampleRow>[] = [
  { key: 'client',  label: 'Client',   sortable: true },
  { key: 'revenue', label: 'Revenue',  sortable: true, align: 'right' },
  {
    key: 'change',
    label: 'Change',
    align: 'right',
    render: row => <TrendIndicator value={row.change} variant={row.trend} />,
  },
]

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-sendlytics-text-default border-b border-sendlytics-grey-200 pb-2 mb-6">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>
}

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

export function DesignSystemDemo() {
  const [toggleVal, setToggleVal]       = useState<'dashboard' | 'table'>('dashboard')
  const [activeTab, setActiveTab]       = useState('overview')
  const [dropdownVal, setDropdownVal]   = useState('weekly')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav]       = useState('agency-breakdown')
  const [logoutOpen, setLogoutOpen]     = useState(false)
  const [sortKey, setSortKey]           = useState<string | undefined>()
  const [sortDir, setSortDir]           = useState<'asc' | 'desc' | undefined>()

  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    setSortKey(key)
    setSortDir(dir)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar Shell demo — full-viewport at the top                       */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Sidebar Shell (full layout)">
        <div className="h-[500px] border border-sendlytics-grey-200 rounded-lg overflow-hidden">
          <SidebarShell
            collapsed={sidebarCollapsed}
            sidebar={
              <Sidebar
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(p => !p)}
                activeItem={activeNav}
                onNavChange={setActiveNav}
                userName="Sarah Johnson"
                userRole="Agency Admin"
                onLogout={() => setLogoutOpen(true)}
              />
            }
          >
            <div className="p-6 text-sm text-sendlytics-grey-400">
              Main content area — active: <strong className="text-sendlytics-text-default">{activeNav}</strong>
            </div>
          </SidebarShell>
        </div>
      </Section>

      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* ---------------------------------------------------------------- */}
        {/* Logo                                                              */}
        {/* ---------------------------------------------------------------- */}
        <Section title="Logo">
          <Row>
            <Logo collapsed={false} />
            <Logo collapsed={true} />
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* NavItem states                                                    */}
        {/* ---------------------------------------------------------------- */}
        <Section title="NavItem — states">
          <Row>
            <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={false} state="default" />
            <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={false} state="hover" />
            <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={false} state="active" />
            <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={false} state="active" badge={3} />
          </Row>
          <div className="mt-4">
            <p className="text-xs font-medium text-sendlytics-grey-400 mb-2">Collapsed</p>
            <Row>
              <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={true} state="default" />
              <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={true} state="hover" />
              <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={true} state="active" />
            </Row>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* NavSection                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Section title="NavSection">
          <div className="w-[212px] bg-sendlytics-grey-50 p-3 rounded-lg">
            <NavSection label="Analytics" collapsed={false}>
              <NavItem icon={<Mail size={20} />} label="Campaigns" collapsed={false} state="active" />
              <NavItem icon={<Mail size={20} />} label="Segments" collapsed={false} state="default" />
            </NavSection>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Avatar                                                            */}
        {/* ---------------------------------------------------------------- */}
        <Section title="Avatar">
          <Row>
            <Avatar name="Sarah Johnson" role="Agency Admin" collapsed={false} />
            <Avatar name="Sarah Johnson" collapsed={true} />
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Button                                                            */}
        {/* ---------------------------------------------------------------- */}
        <Section title="Button — variants & sizes">
          <Row>
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">Primary sm</Button>
            <Button variant="outline" size="sm">Outline sm</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* Toggle                                                            */}
        {/* ---------------------------------------------------------------- */}
        <Section title="Toggle">
          <Toggle value={toggleVal} onChange={setToggleVal} />
          <p className="mt-2 text-xs text-sendlytics-grey-400">Active: {toggleVal}</p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* TabsToggle                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Section title="TabsToggle">
          <TabsToggle
            tabs={[
              { id: 'overview',   label: 'Overview' },
              { id: 'engagement', label: 'Engagement' },
              { id: 'revenue',    label: 'Revenue' },
              { id: 'segments',   label: 'Segments' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
          <p className="mt-2 text-xs text-sendlytics-grey-400">Active: {activeTab}</p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* DropdownMenu                                                      */}
        {/* ---------------------------------------------------------------- */}
        <Section title="DropdownMenu">
          <DropdownMenu
            label="Compare to"
            options={[
              { value: 'weekly',   label: 'Last 7 days' },
              { value: 'monthly',  label: 'Last 30 days' },
              { value: 'quarterly', label: 'Last 90 days' },
            ]}
            value={dropdownVal}
            onChange={setDropdownVal}
          />
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* PageHeader                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Section title="PageHeader">
          <div className="border border-sendlytics-grey-200 rounded-lg overflow-hidden">
            <PageHeader
              title="Agency Breakdown"
              filters={
                <DropdownMenu
                  options={[{ value: 'all', label: 'All Clients' }]}
                  value="all"
                  onChange={() => {}}
                />
              }
              actions={<Button variant="primary">Export</Button>}
            />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* TrendIndicator                                                    */}
        {/* ---------------------------------------------------------------- */}
        <Section title="TrendIndicator">
          <Row>
            <TrendIndicator value={8.2} variant="green" />
            <TrendIndicator value={3.1} variant="red" />
            <TrendIndicator value={0}   variant="invisible" />
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* DataTable                                                         */}
        {/* ---------------------------------------------------------------- */}
        <Section title="DataTable">
          <div className="border border-sendlytics-grey-200 rounded-lg overflow-hidden">
            <DataTable
              columns={COLUMNS}
              data={SAMPLE_ROWS}
              onSort={handleSort}
              sortKey={sortKey}
              sortDir={sortDir}
            />
          </div>
          <div className="mt-4 border border-sendlytics-grey-200 rounded-lg overflow-hidden">
            <p className="text-xs text-sendlytics-grey-400 p-2">Loading state</p>
            <DataTable columns={COLUMNS} data={[]} isLoading />
          </div>
          <div className="mt-4 border border-sendlytics-grey-200 rounded-lg overflow-hidden">
            <DataTable columns={COLUMNS} data={[]} emptyMessage="No campaigns found for this period." />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        {/* LogoutModal                                                       */}
        {/* ---------------------------------------------------------------- */}
        <Section title="LogoutModal">
          <Button variant="outline" onClick={() => setLogoutOpen(true)}>
            Open Sign Out Modal
          </Button>
          <LogoutModal
            open={logoutOpen}
            onConfirm={() => { alert('Signed out'); setLogoutOpen(false) }}
            onCancel={() => setLogoutOpen(false)}
          />
        </Section>
      </div>
    </div>
  )
}
