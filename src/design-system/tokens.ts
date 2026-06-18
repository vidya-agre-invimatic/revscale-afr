/** Design tokens for the SENDLYTICS analytics dashboard. Single source of truth for colors and typography scales. */

export const colors = {
  primary: {
    green: '#53A669',
    blue: '#0284C7',
  },
  text: {
    default: '#222329',
    white: '#FFFFFF',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E3E6EB',
    400: '#82868C',
    500: '#3A3C40',
    600: '#9B9B9B',
  },
  growth: '#00AE1D',
  loss: '#FF0004',
} as const

export const typography = {
  display1:  { fontSize: 68, fontWeight: 800 },
  display2:  { fontSize: 32, fontWeight: 800 },
  title1:    { fontSize: 28, fontWeight: 600 },
  title2:    { fontSize: 24, fontWeight: 600 },
  title3:    { fontSize: 18, fontWeight: 600 },
  title4:    { fontSize: 14, fontWeight: 600 },
  title4v2:  { fontSize: 16, fontWeight: 600 },
  body: {
    semibold18: { fontSize: 18, fontWeight: 600 },
    semibold14: { fontSize: 14, fontWeight: 600 },
    medium14:   { fontSize: 14, fontWeight: 500 },
    semibold13: { fontSize: 13, fontWeight: 600 },
    medium13:   { fontSize: 13, fontWeight: 500 },
    medium12:   { fontSize: 12, fontWeight: 500 },
    italic12:   { fontSize: 12, fontWeight: 400, fontStyle: 'italic' as const },
    semibold12: { fontSize: 12, fontWeight: 600 },
    medium10:   { fontSize: 10, fontWeight: 500 },
  },
  button: {
    semibold12: { fontSize: 12, fontWeight: 600 },
  },
} as const

export const spacing = {
  sidebar: {
    expanded: 240,
    collapsed: 80,
  },
} as const
