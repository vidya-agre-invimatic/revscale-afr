'use client'

import React, { useState } from 'react'
import { PlayCircle } from 'lucide-react'
import {
  PageHeader,
  TabsToggle,
  Button,
  Input,
  ColorPicker,
  FlowsCampaignsChart,
} from '@/design-system'

const SETTINGS_TABS = [
  { id: 'add-clients', label: 'Add Clients' },
  { id: 'setup-agency', label: 'Setup Agency' },
]

const BRAND_COLORS = [
  { id: 'primary', label: 'Primary Colour', color: '#0284C7' },
  { id: 'secondary', label: 'Secondary Colour', color: '#91DAFF' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('setup-agency')
  const [agencyName, setAgencyName] = useState('Invimatic Technologies Pvt Ltd')

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Settings" />

      <div className="px-8 pt-5 flex flex-col gap-8">
        {/* Tabs row */}
        <div className="flex items-center justify-between">
          <TabsToggle
            tabs={SETTINGS_TABS}
            value={activeTab}
            onChange={setActiveTab}
          />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<PlayCircle size={16} />}
          >
            Quick App Tour
          </Button>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-md p-8">
          <div className="flex gap-[70px]">
            {/* Left: Form */}
            <div className="flex flex-col gap-[60px] w-[486px]">
              <div className="flex flex-col gap-10">
                <Input
                  label="Enter Your Agency Name"
                  value={agencyName}
                  onChange={e => setAgencyName(e.target.value)}
                  placeholder="Your agency name"
                />

                <ColorPicker
                  label="Select Your Brand Colour"
                  colors={BRAND_COLORS}
                  onReset={() => {}}
                />
              </div>

              <Button variant="primary" className="w-full !bg-sendlytics-primary-blue hover:!bg-[#0270a8] active:!bg-[#025f91]">
                Save Changes
              </Button>
            </div>

            {/* Right: Chart */}
            <div className="flex-1 max-w-[516px]">
              <FlowsCampaignsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
