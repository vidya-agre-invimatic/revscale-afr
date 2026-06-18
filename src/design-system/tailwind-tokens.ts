/**
 * Tailwind class mappings for SENDLYTICS design tokens.
 * Consume these strings inline to keep component styles tied to the token system.
 * All class names are complete strings so Tailwind's content scanner picks them up.
 */

export const twColors = {
  primary: {
    green: {
      bg:     'bg-sendlytics-primary-green',
      text:   'text-sendlytics-primary-green',
      border: 'border-sendlytics-primary-green',
    },
    blue: {
      bg:     'bg-sendlytics-primary-blue',
      text:   'text-sendlytics-primary-blue',
      border: 'border-sendlytics-primary-blue',
    },
  },
  text: {
    default: { text: 'text-sendlytics-text-default' },
    white:   { text: 'text-sendlytics-text-white', bg: 'bg-sendlytics-text-white' },
  },
  grey: {
    50:  { bg: 'bg-sendlytics-grey-50',  text: 'text-sendlytics-grey-50',  border: 'border-sendlytics-grey-50' },
    100: { bg: 'bg-sendlytics-grey-100', text: 'text-sendlytics-grey-100', border: 'border-sendlytics-grey-100' },
    200: { bg: 'bg-sendlytics-grey-200', text: 'text-sendlytics-grey-200', border: 'border-sendlytics-grey-200' },
    400: { bg: 'bg-sendlytics-grey-400', text: 'text-sendlytics-grey-400', border: 'border-sendlytics-grey-400' },
    500: { bg: 'bg-sendlytics-grey-500', text: 'text-sendlytics-grey-500', border: 'border-sendlytics-grey-500' },
    600: { bg: 'bg-sendlytics-grey-600', text: 'text-sendlytics-grey-600', border: 'border-sendlytics-grey-600' },
  },
  growth: { bg: 'bg-sendlytics-growth', text: 'text-sendlytics-growth' },
  loss:   { bg: 'bg-sendlytics-loss',   text: 'text-sendlytics-loss' },
} as const

export const twTypography = {
  display1:  'text-[68px] font-extrabold',
  display2:  'text-[32px] font-extrabold',
  title1:    'text-[28px] font-semibold',
  title2:    'text-2xl font-semibold',
  title3:    'text-lg font-semibold',
  title4:    'text-sm font-semibold',
  title4v2:  'text-base font-semibold',
  body: {
    semibold18: 'text-lg font-semibold',
    semibold14: 'text-sm font-semibold',
    medium14:   'text-sm font-medium',
    semibold13: 'text-[13px] font-semibold',
    medium13:   'text-[13px] font-medium',
    medium12:   'text-xs font-medium',
    italic12:   'text-xs font-normal italic',
    semibold12: 'text-xs font-semibold',
    medium10:   'text-[10px] font-medium',
  },
  button: {
    semibold12: 'text-xs font-semibold',
  },
} as const
