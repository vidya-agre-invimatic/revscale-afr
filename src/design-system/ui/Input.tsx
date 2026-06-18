'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', id, ...rest }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-base font-semibold text-sendlytics-text-default">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 text-lg text-sendlytics-text-default border border-sendlytics-grey-600 rounded-md outline-none focus:border-sendlytics-primary-blue transition-colors ${className}`}
        {...rest}
      />
    </div>
  )
}
