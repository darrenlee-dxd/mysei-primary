'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'
import { SKILLS, STATUS_COLORS } from '@/data/profile'

export default function ProfilePage() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths'>('overview')

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="max-w-[1200px] mx-auto px-4 py-10 flex flex-col gap-12">
        {/* Page title */}
        <h1 className="text-5xl font-semibold text-gray-900 text-center tracking-tight">
          MySEI Profile
        </h1>

        {/* Tab switcher */}
        <div className="bg-[#f5f5f5] rounded-xl p-1 flex items-center w-full max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-2.5 py-[5.5px] rounded-[10px] text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-[#0a0a0a] shadow-sm'
                : 'text-[#0a0a0a] hover:bg-white/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/><path d="M7 16h2"/><path d="M11 11h2"/><path d="M15 6h2"/>
            </svg>
            Overview of My SE Skills
          </button>
          <button
            onClick={() => setActiveTab('strengths')}
            className={`flex-1 flex items-center justify-center gap-2 px-2.5 py-[5.5px] rounded-[10px] text-sm font-medium transition-all ${
              activeTab === 'strengths'
                ? 'bg-white text-[#0a0a0a] shadow-sm'
                : 'text-[#0a0a0a] hover:bg-white/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            My Strengths and Areas for Growth
          </button>
        </div>

        {/* Content */}
        {activeTab === 'strengths' && (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                My Strengths and Areas for Growth
              </h2>
              <p className="text-gray-500 mt-1">
                Revisit the insights and strategies from your past surveys.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {SKILLS.map((skill) => (
                <div key={skill.id} className="bg-[#f8f9ff] rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{skill.description}</p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <p className="text-sm font-medium text-gray-600">View your past results insights for:</p>

                  <div className="flex flex-col gap-3">
                    {skill.results.map((result, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-700">{result.date}</span>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[result.status]}`}
                          >
                            {result.status}
                          </span>
                        </div>
                        {skill.id === 'emotion-regulation' ? (
                          <Link
                            href="/narrative"
                            className="text-sm font-medium text-[#2563eb] border border-[#2563eb] px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                          >
                            See insights →
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-gray-300 border border-gray-200 px-4 py-1.5 rounded-full cursor-not-allowed">
                            See insights →
                          </span>
                        )}
                      </div>
                    ))}
                    {skill.results.length > 1 && (
                      <button className="text-sm text-gray-500 hover:text-gray-700 text-left flex items-center gap-1">
                        View more ↓
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab />}
      </main>
    </div>
  )
}

type SkillStatus = 'Starting out' | 'Making Progress' | 'Getting There' | 'Doing Well'

interface OverviewSkill {
  name: string
  status: SkillStatus
}

const STAR_COUNT: Record<SkillStatus, number> = {
  'Starting out': 1, 'Making Progress': 2, 'Getting There': 3, 'Doing Well': 4,
}

// Blue fill level for each tier, used by both the watering can and the bar graph view.
const FILL_PCT: Record<SkillStatus, number> = {
  'Starting out': 30,
  'Making Progress': 50,
  'Getting There': 70,
  'Doing Well': 100,
}

// How much of the can remains "grey" (white overlay from top), as a percentage — the inverse of FILL_PCT.
const GREY_TOP_PCT: Record<SkillStatus, number> = {
  'Starting out': 70,
  'Making Progress': 50,
  'Getting There':   30,
  'Doing Well':       0,
}

const TIER_ICON: Record<SkillStatus, string> = {
  'Starting out': '/assets/tier-starting-out.png',
  'Making Progress': '/assets/tier-making-progress.png',
  'Getting There': '/assets/tier-getting-there.png',
  'Doing Well': '/assets/tier-doing-well.png',
}

const ALL_SKILLS: OverviewSkill[] = [
  { name: 'Emotion Regulation', status: 'Starting out' },
  { name: 'Self-control', status: 'Making Progress' },
  { name: 'Positivity', status: 'Getting There' },
  { name: 'Self-motivation', status: 'Doing Well' },
  { name: 'Appreciating diversity', status: 'Starting out' },
  { name: 'Civic consciousness', status: 'Making Progress' },
  { name: 'Empathy', status: 'Getting There' },
  { name: 'Problem-solving', status: 'Starting out' },
  { name: 'Moral reasoning and action', status: 'Making Progress' },
]

function WateringCan({ status }: { status: SkillStatus }) {
  const greyPct = GREY_TOP_PCT[status]
  const maskBlue = `linear-gradient(to bottom, transparent 0%, transparent ${greyPct}%, black ${greyPct}%)`
  const maskGrey = `linear-gradient(to bottom, black 0%, black ${greyPct}%, transparent ${greyPct}%)`
  return (
    <div className="relative w-[100px] h-[100px]">
      {/* Grey (desaturated) top portion */}
      {greyPct > 0 && (
        <img
          src="/assets/watering-can-base.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ filter: 'grayscale(1) brightness(1.1)', WebkitMaskImage: maskGrey, maskImage: maskGrey }}
        />
      )}
      {/* Blue bottom portion */}
      <img
        src="/assets/watering-can-base.png"
        alt="watering can"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={greyPct > 0 ? { WebkitMaskImage: maskBlue, maskImage: maskBlue } : {}}
      />
    </div>
  )
}

function Stars({ status }: { status: SkillStatus }) {
  const count = STAR_COUNT[status]
  return (
    <div className="flex gap-1 justify-center mt-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ))}
    </div>
  )
}

function SkillCard({ skill, bg }: { skill: OverviewSkill; bg: string }) {
  return (
    <div className={`${bg} rounded-3xl px-8 py-4 flex flex-col items-center gap-3`}>
      <p className="text-sm font-semibold text-gray-700 text-center truncate w-full text-ellipsis overflow-hidden whitespace-nowrap">
        {skill.name}
      </p>
      <div className="bg-white rounded-3xl p-3 w-full flex flex-col items-center gap-2">
        <WateringCan status={skill.status} />
        <p className="text-base font-semibold text-gray-800">{skill.status}</p>
        <Stars status={skill.status} />
      </div>
    </div>
  )
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

function SkillGroup({
  skills,
}: {
  skills: OverviewSkill[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {skills.map((s) => <SkillCard key={s.name} skill={s} bg="bg-[#dbeafe]" />)}
    </div>
  )
}

function BarCard({ skill }: { skill: OverviewSkill }) {
  const pct = FILL_PCT[skill.status]
  return (
    <div className="bg-[#dbeafe] rounded-[32px] px-8 py-5 flex flex-col gap-3 w-full">
      <p className="text-lg text-[#404040] truncate">{skill.name}</p>
      <div className="relative w-full h-16 bg-white rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full bg-[#7dd3fc] ${pct >= 100 ? 'rounded-full' : 'rounded-l-full'}`}
          style={{ width: `${pct}%`, transition: 'width 0.6s ease-out' }}
        />
        <div className="relative z-10 h-full flex items-center gap-2 px-5">
          <div className="w-8 h-8 rounded-lg bg-[#e0f2fe] flex items-center justify-center overflow-hidden shrink-0">
            <Image src={TIER_ICON[skill.status]} alt="" width={32} height={32} className="object-cover" />
          </div>
          <span className="text-lg font-semibold text-[#211f26] whitespace-nowrap">{skill.status}</span>
        </div>
      </div>
    </div>
  )
}

function BarGraphView({ skills }: { skills: OverviewSkill[] }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[824px] mx-auto">
      {skills.map((s) => <BarCard key={s.name} skill={s} />)}
    </div>
  )
}

function ViewToggle({
  view, onChange,
}: {
  view: 'cards' | 'bars'
  onChange: (v: 'cards' | 'bars') => void
}) {
  return (
    <div className="bg-[#f5f5f5] rounded-lg p-1 flex items-center gap-1">
      <button
        onClick={() => onChange('cards')}
        aria-label="Card view"
        className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
          view === 'cards' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>
      <button
        onClick={() => onChange('bars')}
        aria-label="Bar graph view"
        className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
          view === 'bars' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="20" x2="4" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="20" y1="20" x2="20" y2="14" />
        </svg>
      </button>
    </div>
  )
}

function OverviewTab() {
  const [view, setView] = useState<'cards' | 'bars'>('cards')

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-900">Overview of My SE Skills</h2>
          <ViewToggle view={view} onChange={setView} />
        </div>
        <p className="text-gray-500 text-sm">Just like a vibrant garden, your emotional well-being thrives when it's nurtured.</p>
        <div className="relative w-full max-w-md h-48 rounded-2xl overflow-hidden">
          <Image src="/assets/dashboard-hero.png" alt="MySEI characters" fill className="object-cover" />
        </div>
      </div>

      <ScrollReveal delay={0}>
        {view === 'cards' ? (
          <SkillGroup skills={ALL_SKILLS} />
        ) : (
          <BarGraphView skills={ALL_SKILLS} />
        )}
      </ScrollReveal>
    </div>
  )
}
