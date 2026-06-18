'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import { Button } from './Button'

interface LogoutModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Sign-out confirmation modal — 450×257px card centred over a semi-transparent backdrop.
 * Renders nothing when `open` is false so it can safely stay in the component tree.
 */
export function LogoutModal({ open, onConfirm, onCancel }: LogoutModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        className="relative bg-white rounded-xl shadow-2xl flex flex-col items-center gap-4 px-10 py-8"
        style={{ width: 450, minHeight: 257 }}
      >
        <div className="text-sendlytics-primary-blue">
          <LogOut size={32} />
        </div>

        <h2
          id="logout-title"
          className="text-lg font-semibold text-sendlytics-text-default"
        >
          Sign out?
        </h2>

        <p className="text-sm font-medium text-sendlytics-grey-400 text-center">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-3 mt-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
