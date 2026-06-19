export interface FlowRow {
  id: string
  name: string
  revenue: string
  rpr: string
  cvr: string
  openRate: string
  clickRate: string
  trendValue: number
  trendVariant: 'green' | 'red' | 'invisible'
  isTotal?: boolean
}
