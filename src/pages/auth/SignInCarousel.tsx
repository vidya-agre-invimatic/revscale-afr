'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

// ─── Decorative elements ────────────────────────────────────────────────────

function DotPattern({ className }: { className?: string }) {
  return (
    <svg className={className} width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={4 + col * 8} cy={4 + row * 8} r="1.5" fill="white" opacity="0.3" />
        ))
      )}
    </svg>
  )
}

function TriangleShape({ className, direction = 'right' }: { className?: string; direction?: 'right' | 'left' }) {
  const points = direction === 'right' ? '0,0 40,20 0,40' : '40,0 0,20 40,40'
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={points} fill="white" opacity="0.15" />
    </svg>
  )
}

function CircleShape({ className, size = 80 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" opacity="0.08" />
    </svg>
  )
}

// ─── Trend arrow icon ───────────────────────────────────────────────────────

function TrendArrow({ up = true, color = '#00AE1D' }: { up?: boolean; color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: up ? '' : 'rotate(180deg)' }}>
      <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill={color} />
    </svg>
  )
}

function TrendBadge({ value, up = true, variant = 'green' }: { value: string; up?: boolean; variant?: 'green' | 'red' }) {
  const bgColor = variant === 'green' ? '#ECFAEE' : '#FFF2F2'
  const textColor = variant === 'green' ? '#00AE1D' : '#FF0004'
  return (
    <div className="flex items-center gap-[2px] px-[4px] py-[2px] rounded-[3px]" style={{ background: bgColor }}>
      <TrendArrow up={up} color={textColor} />
      <span className="text-[10px] font-medium" style={{ color: textColor }}>{value}</span>
    </div>
  )
}

// ─── Slide 1 — Total Revenue ────────────────────────────────────────────────

function Slide1() {
  return (
    <div className="relative w-full h-full">
      {/* Decorative shapes */}
      <CircleShape className="absolute -top-4 -right-4" size={100} />
      <CircleShape className="absolute top-[120px] left-[20px]" size={60} />
      <TriangleShape className="absolute bottom-[80px] left-[10px]" direction="left" />
      <DotPattern className="absolute bottom-4 right-4" />

      {/* Main Total Revenue Card */}
      <div className="absolute left-[120px] top-[20px] w-[316px] bg-white rounded-[10px] p-7 shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col gap-[14px]">
          <p className="text-[18px] font-normal text-[#222329]">Total Revenue</p>
          <div className="flex flex-col gap-[9px]">
            <div className="flex items-end">
              <span className="text-[20px] font-semibold text-[#222329]">$</span>
              <span className="text-[32px] font-semibold text-[#222329] tracking-[-0.7px]">2,532,779</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <TrendBadge value="23%" up variant="green" />
              <span className="text-[16px] font-medium text-[#808080]">vs $10,44,28,194</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attributed Revenue card */}
      <div className="absolute left-[70px] top-[200px] w-[280px] bg-white rounded-[6px] p-[10px] shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-[#222329] w-[103px]">Attributed Revenue</p>
          <div className="flex items-end gap-[5px]">
            <p>
              <span className="text-[12px] font-medium text-[#222329]">$</span>
              <span className="text-[16px] font-semibold text-[#222329]">237,003.23</span>
            </p>
            <TrendBadge value="10%" up variant="green" />
          </div>
        </div>
      </div>

      {/* Attributed Revenue % card */}
      <div className="absolute left-[130px] top-[270px] w-[280px] bg-white rounded-[6px] p-[10px] shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-[#222329] w-[103px]">Attributed Revenue %</p>
          <div className="flex items-end gap-[5px]">
            <span className="text-[16px] font-semibold text-[#222329]">34.52%</span>
            <TrendBadge value="16%" up={false} variant="red" />
          </div>
        </div>
      </div>

      {/* Unattributed Revenue card */}
      <div className="absolute left-[190px] top-[340px] w-[280px] bg-white rounded-[6px] p-[10px] shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-[#222329] w-[103px]">Unattributed Revenue</p>
          <div className="flex items-end gap-[5px]">
            <p>
              <span className="text-[12px] font-medium text-[#222329]">$</span>
              <span className="text-[16px] font-semibold text-[#222329]">24,003.23</span>
            </p>
            <TrendBadge value="18%" up variant="green" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 2 — Campaign Revenue ─────────────────────────────────────────────

function Slide2() {
  const months = ['Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 'Jul 24']
  const barHeights = [73, 64, 55, 73, 82, 62]
  const maxH = 90

  return (
    <div className="relative w-full h-full">
      <CircleShape className="absolute -top-4 -right-4" size={100} />
      <TriangleShape className="absolute bottom-[60px] left-[10px]" direction="left" />
      <CircleShape className="absolute bottom-[20px] right-[30px]" size={50} />
      <DotPattern className="absolute bottom-4 right-4" />

      {/* Campaign Revenue Card */}
      <div className="absolute left-[120px] top-[20px] w-[316px] bg-white rounded-[10px] p-7 shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-[16px] font-semibold text-[#222329] w-[83px]">Campaign Revenue</p>
          <div className="flex flex-col items-end gap-3">
            <p>
              <span className="text-[12px] font-semibold text-[#222329]">$</span>
              <span className="text-[18px] font-semibold text-[#222329]">2.23M</span>
            </p>
            <div className="flex items-center gap-1">
              <TrendBadge value="10%" up variant="green" />
              <span className="text-[10px] font-medium text-[#808080]">vs $2.21M</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between h-[82px] mb-1 relative">
          {barHeights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-[10px] relative">
              <div
                className="w-[14px] rounded-full opacity-20"
                style={{ height: `${(h / maxH) * 82}px`, background: '#91DAFF' }}
              />
            </div>
          ))}
          {/* Line chart overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 82" preserveAspectRatio="none">
            <polyline
              points="15,20 58,35 101,45 144,20 187,10 230,30"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="15,30 58,25 101,40 144,35 187,15 230,25"
              fill="none"
              stroke="#91DAFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E3E6EB] mb-3" />

        {/* Month labels */}
        <div className="flex justify-between mb-4">
          {months.map(m => (
            <span key={m} className="text-[10px] font-medium text-[#222329] text-center">{m}</span>
          ))}
        </div>

        {/* Tooltip */}
        <div className="absolute right-[-20px] top-[100px] bg-white rounded-[3px] px-[10px] py-[9px] shadow-[2px_14px_14px_rgba(0,0,0,0.12)] z-10">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] font-medium text-[#222329]">Month</span>
              <span className="text-[13px] font-semibold text-[#222329]">May 24</span>
            </div>
            <div className="flex items-center gap-[18px]">
              <span className="text-[13px] font-medium text-[#222329]">Campaign Revenue</span>
              <span className="text-[13px] font-semibold text-[#222329]">$2.23M</span>
            </div>
          </div>
        </div>

        {/* Stats rows */}
        <div className="flex flex-col gap-[18px] mt-2">
          <div className="bg-white rounded-[6px] p-[10px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-medium text-[#222329] w-[103px]">Campaign Open Rate</p>
              <div className="flex items-end gap-[5px]">
                <span className="text-[16px] font-semibold text-[#222329]">34.52%</span>
                <TrendBadge value="38%" up variant="green" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[6px] p-[10px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-medium text-[#222329] w-[103px]">Campaign Click Rate</p>
              <div className="flex items-end gap-[5px]">
                <span className="text-[16px] font-semibold text-[#222329]">18.28%</span>
                <TrendBadge value="104%" up variant="green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 3 — Flow Table ───────────────────────────────────────────────────

function Slide3() {
  return (
    <div className="relative w-full h-full">
      <CircleShape className="absolute -top-4 left-[20px]" size={80} />
      <TriangleShape className="absolute bottom-[60px] right-[10px]" direction="right" />
      <DotPattern className="absolute bottom-4 left-4" />

      {/* Tab strip */}
      <div className="absolute left-[200px] top-[14px] flex items-center gap-[14px] bg-white rounded-[8px] p-[15px] shadow-[2px_14px_14px_rgba(0,0,0,0.12)] z-10">
        <div className="bg-[#0284C7] rounded-[6px] px-5 py-[6px]">
          <span className="text-[14px] font-semibold text-white">Week</span>
        </div>
        <div className="border border-[#9B9B9B] rounded-[6px] px-5 py-[6px]">
          <span className="text-[14px] font-semibold text-[#222329]">Month</span>
        </div>
        <div className="border border-[#9B9B9B] rounded-[6px] px-5 py-[6px]">
          <span className="text-[14px] font-semibold text-[#222329]">Year</span>
        </div>
      </div>

      {/* Flow table card */}
      <div className="absolute left-[120px] top-[30px] w-[316px] bg-white rounded-[10px] overflow-hidden shadow-[2px_14px_14px_rgba(0,0,0,0.12)]">
        <div className="p-[7px]">
          {/* Table header */}
          <div className="flex items-center border-b border-[#E3E6EB]">
            <div className="w-[110px] px-1 py-[9px]">
              <div className="flex items-center gap-[7px]">
                <span className="text-[12px] font-normal text-[#222329]">Flows</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none"><path d="M3 0L6 4H0L3 0ZM3 11L0 7H6L3 11Z" fill="#808080"/></svg>
              </div>
            </div>
            <div className="w-[118px] px-[7px] py-[9px]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-normal text-[#222329]">Revenue</span>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none"><path d="M3 0L6 4H0L3 0ZM3 11L0 7H6L3 11Z" fill="#808080"/></svg>
              </div>
            </div>
            <div className="w-[100px] px-[7px] py-[9px]">
              <span className="text-[12px] font-normal text-[#222329]">Open Rate</span>
            </div>
          </div>

          {/* Row 1 — Flow SMS #1 */}
          <div className="bg-[#FAFAFA] py-1">
            <div className="flex items-center">
              <div className="w-[110px] px-[7px] py-[9px]">
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[12px] font-semibold text-[#222329]">Flow SMS #1</span>
                  <div className="flex items-center gap-[3px]">
                    <span className="text-[10px] font-semibold text-[#0284C7]">Flow Breakdown</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 7L7 1M7 1H2M7 1V6" stroke="#0284C7" strokeWidth="1.2"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-[118px] px-[7px] py-[9px]">
                <div className="flex items-center gap-[6px]">
                  <p>
                    <span className="text-[9px] font-medium text-[#222329]">$</span>
                    <span className="text-[12px] font-medium text-[#222329]">10,44,194</span>
                  </p>
                  <div className="flex items-center gap-1 bg-[#ECFAEE] px-1 py-[1px] rounded-[3px]">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="#00AE1D"/></svg>
                    <span className="text-[9px] font-semibold text-[#00AE1D]">72%</span>
                  </div>
                </div>
              </div>
              <div className="w-[100px] px-[7px] py-[9px]">
                <div className="flex items-center gap-[6px]">
                  <p>
                    <span className="text-[9px] font-medium text-[#222329]">$</span>
                    <span className="text-[12px] font-medium text-[#222329]">14,194</span>
                  </p>
                  <div className="flex items-center gap-1 bg-[#ECFAEE] px-1 py-[1px] rounded-[3px]">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="#00AE1D"/></svg>
                    <span className="text-[9px] font-semibold text-[#00AE1D]">36%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 — Flow SMS #2 */}
          <div className="border-b border-[#F5F5F5] py-1">
            <div className="flex items-center">
              <div className="w-[110px] px-[7px] py-[9px]">
                <span className="text-[12px] font-semibold text-[#222329]">Flow SMS #2</span>
              </div>
              <div className="w-[118px] px-[7px] py-[9px]">
                <div className="flex items-center gap-[6px]">
                  <p>
                    <span className="text-[9px] font-medium text-[#222329]">$</span>
                    <span className="text-[12px] font-medium text-[#222329]">42,03,748</span>
                  </p>
                  <div className="flex items-center gap-1 bg-[#ECFAEE] px-1 py-[1px] rounded-[3px]">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="#00AE1D"/></svg>
                    <span className="text-[9px] font-semibold text-[#00AE1D]">32%</span>
                  </div>
                </div>
              </div>
              <div className="w-[100px] px-[7px] py-[9px]">
                <div className="flex items-center gap-[6px]">
                  <p>
                    <span className="text-[9px] font-medium text-[#222329]">$</span>
                    <span className="text-[12px] font-medium text-[#222329]">32,141</span>
                  </p>
                  <div className="flex items-center gap-1 bg-[#ECFAEE] px-1 py-[1px] rounded-[3px]">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="#00AE1D"/></svg>
                    <span className="text-[9px] font-semibold text-[#00AE1D]">36%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton rows */}
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="border-b border-[#F5F5F5] py-1">
              <div className="flex items-center">
                <div className="w-[110px] px-[7px] py-[9px]">
                  <div className="h-[10px] w-[92px] rounded-[4px] bg-gradient-to-r from-[#F1F1F1] to-[rgba(217,217,217,0.1)]" />
                </div>
                <div className="w-[118px] px-[7px] py-[9px]">
                  <div className="h-[10px] w-[92px] rounded-[4px] bg-gradient-to-r from-[#F1F1F1] to-[rgba(217,217,217,0.1)]" />
                </div>
                <div className="w-[100px] px-[7px] py-[9px]">
                  <div className="flex items-center gap-[6px]">
                    <div className="h-[10px] w-[92px] rounded-[4px] bg-gradient-to-r from-[#F1F1F1] to-[rgba(217,217,217,0.1)]" />
                    <div className="flex items-center gap-1 bg-[#ECFAEE] px-1 py-[1px] rounded-[3px]">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="#00AE1D"/></svg>
                      <span className="text-[9px] font-semibold text-[#00AE1D]">36%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Slide config ────────────────────────────────────────────────────────────

type SlideComp = React.ComponentType

const SLIDES: Array<{ id: number; Component: SlideComp; heading: string; sub: string }> = [
  {
    id: 0,
    Component: Slide1,
    heading: 'Automated Reporting For Klaviyo Agencies',
    sub: 'Analytics for the performance of campaigns, flows, and segments over any timeframe.',
  },
  {
    id: 1,
    Component: Slide2,
    heading: 'Monitor Campaigns Perfomance',
    sub: "Monitor the performance of all your client's campaigns and lists in a single dashboard.",
  },
  {
    id: 2,
    Component: Slide3,
    heading: 'Daily, Weekly and Monthly Overviews',
    sub: 'Track daily, weekly, or monthly performance to monitor trends and changes.',
  },
]

// ─── Carousel ────────────────────────────────────────────────────────────────

export function SignInCarousel() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const currentRef = useRef(0)
  const animatingRef = useRef(false)

  const goToSlide = useCallback((index: number) => {
    if (animatingRef.current) return
    animatingRef.current = true
    setVisible(false)
    setTimeout(() => {
      setCurrent(index)
      currentRef.current = index
      setVisible(true)
      setTimeout(() => { animatingRef.current = false }, 300)
    }, 100)
  }, [])

  useEffect(() => {
    const id = setInterval(() => goToSlide((currentRef.current + 1) % SLIDES.length), 4000)
    return () => clearInterval(id)
  }, [goToSlide])

  const slide = SLIDES[current]

  return (
    <div className="flex flex-col h-full">
      {/* Illustration zone */}
      <div
        className="flex-1 relative px-7 pt-8 pb-4 min-h-0 overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(-12px)',
          transition: visible
            ? 'opacity 300ms ease, transform 300ms ease'
            : 'opacity 100ms ease, transform 100ms ease',
        }}
      >
        <slide.Component />
      </div>

      {/* Text block */}
      <div
        className="px-8 pb-5 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: visible ? 'opacity 300ms ease' : 'opacity 100ms ease',
        }}
      >
        <h2 className="text-[28px] font-semibold text-white leading-snug mb-2">
          {slide.heading}
        </h2>
        <p className="text-[16px] font-normal text-white leading-relaxed">
          {slide.sub}
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-[6px] pb-8">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={[
              'h-[4px] rounded-[2px] transition-all duration-300',
              current === i ? 'w-[36px] bg-white' : 'w-[8px] bg-white',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
