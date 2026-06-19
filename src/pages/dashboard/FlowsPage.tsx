'use client'

import React, { useState } from 'react'
import { ChevronDown, Calendar, Search, SlidersHorizontal } from 'lucide-react'
import { FlowsTable } from '@/features/flows/components/FlowsTable'
import { FlowBreakdownModal } from '@/features/flows/components/FlowBreakdownModal'
import type { FlowRow } from '@/features/flows/types/flow.types'

const MOCK_FLOWS: FlowRow[] = [
  {
    id: '1',
    name: 'Welcome Series | SMS | (Rev-Scale) - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '2',
    name: 'Welcome Series - Vegan Collagen - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '3',
    name: 'Welcome Series - Unique Discount w/ Reminder (SMS Only) - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '4',
    name: 'Welcome Series - Thyroid Power - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '5',
    name: 'Welcome Series - Sugar Guard - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '6',
    name: 'Welcome Series - Unique Discount w/ Reminder (SMS Only) - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: '7',
    name: 'Welcome Series - Thyroid Power - Fling',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
  },
  {
    id: 'total',
    name: 'Total',
    revenue: '10,44,28,194',
    rpr: '2,451',
    cvr: '81.94%',
    openRate: '94.21%',
    clickRate: '68.94%',
    trendValue: 123,
    trendVariant: 'green',
    isTotal: true,
  },
]

export default function FlowsPage() {
  const [selectedFlow, setSelectedFlow] = useState<FlowRow | null>(null)

  return (
    <div className="flex flex-col gap-5 p-8 min-h-full">

      {/* Client selector */}
      <div>
        <button className="flex items-center justify-between bg-white border border-[rgba(0,161,179,0.25)] rounded-[6px] h-[45px] w-[227px] px-5 gap-2">
          <span className="text-sm font-semibold text-sendlytics-text-default">Fling</span>
          <ChevronDown size={11} className="text-sendlytics-text-default flex-shrink-0" />
        </button>
      </div>

      {/* Page title + date controls */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-semibold text-sendlytics-text-default">Flows</h1>

          <div className="flex items-start gap-[60px]">
            {/* Date range */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-xs font-medium text-sendlytics-grey-800">
                Date
                <ChevronDown size={10} className="text-sendlytics-grey-800" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-[5px] border border-sendlytics-grey-600 rounded-[6px] px-2.5 py-1.5">
                  <Calendar size={10} className="text-sendlytics-text-default" />
                  <span className="text-sm font-semibold text-sendlytics-text-default">10/23/24</span>
                </div>
                <div className="flex items-center gap-[5px] border border-sendlytics-grey-600 rounded-[6px] px-2.5 py-1.5">
                  <Calendar size={10} className="text-sendlytics-text-default" />
                  <span className="text-sm font-semibold text-sendlytics-text-default">12/29/24</span>
                </div>
              </div>
            </div>

            {/* Compare to */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-sendlytics-grey-800">
                Compare to
                <ChevronDown size={10} className="text-sendlytics-grey-800" />
              </div>
              <div className="flex items-center gap-[5px] text-sendlytics-text-default whitespace-nowrap">
                <span className="text-base font-semibold">Previous Period</span>
                <span className="text-xs font-medium">(08/24/22 - 08/19/24)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sendlytics-grey-200" />
      </div>

      {/* Flows overview card */}
      <div className="bg-white rounded-[6px] p-5 flex flex-col gap-6">

        {/* Card header */}
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-sendlytics-text-default py-1">
            Flows Overview
          </h2>

          <div className="flex flex-col gap-2.5 items-end">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-3 border border-sendlytics-grey-600 rounded-[8px] px-[15px] py-2.5 w-[277px]">
                <Search size={16} className="text-sendlytics-grey-600 flex-shrink-0" />
                <span className="text-sm font-normal text-sendlytics-grey-600">Search Flow</span>
              </div>

              {/* Manage Metrics */}
              <button className="flex items-center gap-3 bg-white border border-sendlytics-grey-600 rounded-[8px] px-[15px] py-2.5 cursor-pointer">
                <SlidersHorizontal size={16} className="text-sendlytics-text-default flex-shrink-0" />
                <span className="text-sm font-semibold text-sendlytics-text-default">Manage Metrics</span>
              </button>
            </div>

            <p className="text-xs italic font-normal text-sendlytics-grey-600 max-w-[498px] text-right">
              *Manage Metrics allows you to show or hide metric columns based on your preferences
            </p>
          </div>
        </div>

        {/* Table */}
        <FlowsTable rows={MOCK_FLOWS} onFlowBreakdownClick={setSelectedFlow} />
      </div>

      <FlowBreakdownModal flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
    </div>
  )
}
