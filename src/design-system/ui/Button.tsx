'use client'

import type { ReactNode, ButtonHTMLAttributes } from 'react';
import React from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
  leftIcon?: ReactNode
}

const variantClasses: Record<string, string> = {
  primary: 'bg-sendlytics-primary-green text-white border-transparent hover:bg-[#478f59] active:bg-[#3d7e4f]',
  outline: 'bg-white text-sendlytics-text-default border border-sendlytics-grey-200 hover:bg-sendlytics-grey-50',
  ghost:   'bg-transparent text-sendlytics-grey-400 border-transparent hover:bg-sendlytics-grey-100',
}

const sizeClasses: Record<string, string> = {
  md: 'h-[41px] px-4',
  sm: 'h-8 px-3',
}

/**
 * Base button component with three semantic variants (primary, outline, ghost) and two sizes.
 */
export function Button({
  variant,
  size = 'md',
  children,
  leftIcon,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        ${sizeClasses[size]}
        rounded-md border text-xs font-semibold
        transition-colors duration-150
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...rest}
    >
      {leftIcon && (
        <span className="flex items-center flex-shrink-0">{leftIcon}</span>
      )}
      {children}
    </button>
  )
}
