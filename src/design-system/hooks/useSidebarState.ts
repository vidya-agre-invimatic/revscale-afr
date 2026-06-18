'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'sendlytics-sidebar-collapsed'

/**
 * Manages sidebar collapsed/expanded state with localStorage persistence.
 * Hydrates from storage on mount; safe for SSR (storage access is deferred to useEffect).
 */
export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      try {
        setCollapsed(JSON.parse(stored) as boolean)
      } catch {
        // ignore malformed stored value
      }
    }
  }, [])

  const toggle = () => {
    setCollapsed(prev => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const setCollapsedPersisted = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setCollapsed(value)
  }

  return { collapsed, toggle, setCollapsed: setCollapsedPersisted }
}
