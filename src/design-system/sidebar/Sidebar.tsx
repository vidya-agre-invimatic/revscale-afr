'use client'

import React from 'react'
import {
  BarChart2, Users, TrendingUp, GitBranch, Mail,
  BarChart, CheckCircle, Settings, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Logo } from './Logo'
import { NavItem } from './NavItem'
import { Avatar } from './Avatar'

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  activeItem: string
  onNavChange: (item: string) => void
  userName?: string
  userRole?: string
  onLogout?: () => void
}

const MAIN_NAV = [
  { id: 'agency-breakdown', label: 'Agency Breakdown', icon: <BarChart2 size={20} /> },
  { id: 'client-overview',  label: 'Client Overview',  icon: <Users size={20} /> },
  { id: 'trends',           label: 'Trends',           icon: <TrendingUp size={20} /> },
  { id: 'flows',            label: 'Flows',            icon: <GitBranch size={20} /> },
  { id: 'campaigns',        label: 'Campaigns',        icon: <Mail size={20} /> },
  { id: 'segment-growth',   label: 'Segment Growth',   icon: <BarChart size={20} /> },
  { id: 'deliverability',   label: 'Deliverability',   icon: <CheckCircle size={20} /> },
]

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
    <div className="relative flex flex-col h-full py-8 px-3.5 overflow-hidden">
      {/* Collapse toggle on the edge */}
      <button
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-6 z-10 w-8 h-8 flex items-center justify-center bg-sendlytics-grey-100 rounded-[5px] text-sendlytics-grey-400 hover:text-sendlytics-text-default transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="mb-5 px-5">
        <Logo collapsed={collapsed} />
      </div>

      {/* Main nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-2.5">
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
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-2.5">
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={collapsed}
          state={activeItem === 'settings' ? 'active' : 'default'}
          onClick={() => onNavChange('settings')}
        />

        <div className="border-t border-sendlytics-grey-200" />

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
