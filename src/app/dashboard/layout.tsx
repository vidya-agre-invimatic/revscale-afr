'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarShell, Sidebar } from '@/design-system'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const segments = (pathname ?? '').split('/')
  const section = segments.length > 2 ? segments[segments.length - 1] : 'client-overview'

  const handleNavChange = (id: string) => {
    router.push(`/dashboard/${id}`)
  }

  return (
    <SidebarShell
      collapsed={collapsed}
      sidebar={
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(c => !c)}
          activeItem={section}
          onNavChange={handleNavChange}
          userName="Invimatic Te..."
          userRole="Welcome back"
        />
      }
    >
      {children}
    </SidebarShell>
  )
}
