export interface MetricSubItem {
  label: string
  value: string
  changePercent: number
  trend: 'up' | 'down'
}

export interface OverviewMetricCard {
  title: string
  value: string
  changePercent: number
  trend: 'up' | 'down'
  comparisonValue: string
  subMetrics: MetricSubItem[]
  hasLink?: boolean
}

export interface RevenueDataPoint {
  period: string
  attributedRevenue: number
  unattributedRevenue: number
}

export interface AttributedRevenuePercentPoint {
  period: string
  campaignRevenuePercent: number
  flowRevenuePercent: number
}

export interface FlowsVsCampaignsPoint {
  period: string
  campaignRevenue: number
  flowRevenue: number
}

export interface FlowMetricSummary {
  label: string
  value: string
  changePercent: number
  trend: 'up' | 'down'
  comparisonValue: string
}

export interface SubjectLineEntry {
  subjectLine: string
  value: number
}
