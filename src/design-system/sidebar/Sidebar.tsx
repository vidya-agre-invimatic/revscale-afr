'use client'

import React from 'react'
import {
  BarChart2, Users, TrendingUp, GitBranch, Mail, Layers,
  BarChart, FileText, CheckCircle, Layout, Settings, Star,
  Activity, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Logo } from './Logo'
import { NavItem } from './NavItem'
import { NavSection } from './NavSection'
import { Avatar } from './Avatar'

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  /** ID of the currently active nav item */
  activeItem: string
  onNavChange: (item: string) => void
  userName?: string
  userRole?: string
  onLogout?: () => void
}

const MAIN_NAV = [
  { id: 'agency-breakdown',    label: 'Agency Breakdown',      icon: <BarChart2 size={20} /> },
  { id: 'client-overview',     label: 'Client Overview',       icon: <Users size={20} /> },
  { id: 'trends',              label: 'Trends',                icon: <TrendingUp size={20} /> },
  { id: 'flows',               label: 'Flows',                 icon: <GitBranch size={20} /> },
  { id: 'campaigns',           label: 'Campaigns',             icon: <Mail size={20} /> },
  { id: 'segments',            label: 'Segments',              icon: <Layers size={20} /> },
  { id: 'segment-growth',      label: 'Segment Growth',        icon: <BarChart size={20} /> },
  { id: 'subject-line',        label: 'Subject Line Analysis', icon: <FileText size={20} /> },
  { id: 'deliverability',      label: 'Deliverability',        icon: <CheckCircle size={20} /> },
  { id: 'message-templates',   label: 'Message Templates',     icon: <Layout size={20} /> },
]

const BOTTOM_NAV = [
  { id: 'settings',            label: 'Settings',              icon: <Settings size={20} /> },
  { id: 'premium',             label: 'Premium',               icon: <Star size={20} /> },
  { id: 'retention-analytics', label: 'Retention Analytics',   icon: <Activity size={20} /> },
]

/**
 * Fully composed sidebar: logo, collapsible toggle, main nav sections, bottom nav, and user avatar.
 */
export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeItem,
  onNavChange,
  userName = 'User',
  userRole,
  onLogout,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full py-4 px-3 overflow-hidden">
      {/* Header: logo + collapse toggle */}
      <div className="flex items-center justify-between mb-6 px-1 min-h-[40px]">
        {!collapsed && <Logo collapsed={collapsed} />}
        {collapsed && <Logo collapsed={collapsed} />}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-6 h-6 flex items-center justify-center text-sendlytics-grey-400 hover:text-sendlytics-text-default transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <NavSection label="Analytics" collapsed={collapsed}>
          {MAIN_NAV.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
              state={activeItem === item.id ? 'active' : 'default'}
              onClick={() => onNavChange(item.id)}
            />
          ))}
        </NavSection>
      </div>

      {/* Divider */}
      <div className="border-t border-sendlytics-grey-200 my-3" />

      {/* Bottom nav */}
      <div className="flex flex-col gap-0.5">
        {BOTTOM_NAV.map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            state={activeItem === item.id ? 'active' : 'default'}
            onClick={() => onNavChange(item.id)}
          />
        ))}
      </div>

      {/* User avatar */}
      <div className="mt-3 pt-3 border-t border-sendlytics-grey-200">
        <Avatar
          name={userName}
          role={userRole}
          collapsed={collapsed}
          onLogout={onLogout}
        />
      </div>
    </div>
  )
}
