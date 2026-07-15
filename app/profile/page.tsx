'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'
import { SKILLS, STATUS_COLORS } from '@/data/profile'
import { SURVEY_QUESTIONS_BY_LEVEL } from '@/data/survey'
import type { SkillBand } from '@/data/narrative'
import { computeEmotionRegulationScore, getEmotionRegulationBand } from '@/lib/scoring'

export default function ProfilePage() {
  const userName = useSession((s) => s.userName)
  const studentLevel = useSession((s) => s.studentLevel)
  const answers = useSession((s) => s.answers)
  const emotionRegulationCompletedAt = useSession((s) => s.emotionRegulationCompletedAt)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths'>('overview')

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  // Only trust the computed score once the student has actually answered
  // every question — a partial/unstarted survey should fall back to the
  // placeholder result instead of scoring as "Starting out".
  const hasAttemptedEmotionRegulation =
    Object.keys(answers).length >= SURVEY_QUESTIONS_BY_LEVEL[studentLevel].length

  const skills = SKILLS.map((skill) => {
    if (skill.id !== 'emotion-regulation' || !hasAttemptedEmotionRegulation || !emotionRegulationCompletedAt) {
      return skill
    }
    const score = computeEmotionRegulationScore(answers, studentLevel)
    const band = getEmotionRegulationBand(score, studentLevel)
    const date = new Date(emotionRegulationCompletedAt).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
    return { ...skill, results: [{ date, status: band }, ...skill.results.slice(1)] }
  })

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="max-w-[1200px] mx-auto px-4 py-8 sm:py-10 flex flex-col gap-8 sm:gap-12">
        {/* Page title */}
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 text-center tracking-tight">
          MySEI Profile
        </h1>

        {/* Tab switcher */}
        <div className="bg-[#f5f5f5] rounded-xl p-1 flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl mx-auto gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-2.5 py-2 sm:py-[5.5px] rounded-[10px] text-xs sm:text-sm font-medium transition-all text-center ${
              activeTab === 'overview'
                ? 'bg-white text-[#0a0a0a] shadow-sm'
                : 'text-[#0a0a0a] hover:bg-white/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M3 3v18h18"/><path d="M7 16h2"/><path d="M11 11h2"/><path d="M15 6h2"/>
            </svg>
            Overview of My Social Emotional Skills
          </button>
          <button
            onClick={() => setActiveTab('strengths')}
            className={`flex-1 flex items-center justify-center gap-2 px-2.5 py-2 sm:py-[5.5px] rounded-[10px] text-xs sm:text-sm font-medium transition-all text-center ${
              activeTab === 'strengths'
                ? 'bg-white text-[#0a0a0a] shadow-sm'
                : 'text-[#0a0a0a] hover:bg-white/50'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            My Strengths and Areas for Growth
          </button>
        </div>

        {/* Content */}
        {activeTab === 'strengths' && (
          <div className="flex flex-col gap-6 max-w-[824px] mx-auto w-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                My Strengths and Areas for Growth
              </h2>
              <p className="text-gray-500 mt-1">
                Revisit the insights and strategies from your past surveys.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-[#f8f9ff] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative w-11 h-11 sm:w-14 sm:h-14 shrink-0">
                      <Image src={skill.icon} alt={skill.name} fill className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{skill.name}</h3>
                      <p className="text-sm sm:text-base text-gray-500 mt-0.5">{skill.description}</p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <p className="text-base font-medium text-gray-600">View your past results insights for:</p>

                  <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col items-center gap-4 sm:gap-6 w-full">
                    {skill.results.map((result, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                        <div className="flex items-center gap-3 flex-wrap">
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
                            className="text-sm font-medium text-[#2563eb] border border-[#2563eb] px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors w-fit"
                          >
                            See insights →
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-gray-300 border border-gray-200 px-4 py-1.5 rounded-full cursor-not-allowed w-fit">
                            See insights →
                          </span>
                        )}
                      </div>
                    ))}
                    {skill.results.length > 1 && (
                      <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
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

// Maps the sentence-case bands used by the survey scoring logic to the
// title-case statuses used across this overview.
const BAND_TO_SKILL_STATUS: Record<SkillBand, SkillStatus> = {
  'Starting out': 'Starting out',
  'Making progress': 'Making Progress',
  'Getting there': 'Getting There',
  'Doing well': 'Doing Well',
}

const LEAF_COUNT: Record<SkillStatus, number> = {
  'Starting out': 1, 'Making Progress': 2, 'Getting There': 3, 'Doing Well': 4,
}

// Blue fill level for each tier, used by the bar graph view.
const FILL_PCT: Record<SkillStatus, number> = {
  'Starting out': 30,
  'Making Progress': 50,
  'Getting There': 70,
  'Doing Well': 100,
}

// Water level within the watering can's body, as a percentage of the body's height.
const WATER_LEVEL_PCT: Record<SkillStatus, number> = {
  'Starting out': 25,
  'Making Progress': 50,
  'Getting There': 75,
  'Doing Well': 100,
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

// Body geometry, traced from public/assets/watering-can-base2.png (2048x2048
// source). Only this region reflects the water level — the spout, handle,
// and rim are always shown at full color, matching the reference art.
const CAN_BODY = { x: 871, y: 405, width: 517, height: 1345, bottomRadius: 60 }
const CAN_BODY_PATH = `M ${CAN_BODY.x} ${CAN_BODY.y}
  L ${CAN_BODY.x + CAN_BODY.width} ${CAN_BODY.y}
  L ${CAN_BODY.x + CAN_BODY.width} ${CAN_BODY.y + CAN_BODY.height - CAN_BODY.bottomRadius}
  Q ${CAN_BODY.x + CAN_BODY.width} ${CAN_BODY.y + CAN_BODY.height} ${CAN_BODY.x + CAN_BODY.width - CAN_BODY.bottomRadius} ${CAN_BODY.y + CAN_BODY.height}
  L ${CAN_BODY.x + CAN_BODY.bottomRadius} ${CAN_BODY.y + CAN_BODY.height}
  Q ${CAN_BODY.x} ${CAN_BODY.y + CAN_BODY.height} ${CAN_BODY.x} ${CAN_BODY.y + CAN_BODY.height - CAN_BODY.bottomRadius}
  Z`

// Colors sampled directly from the reference image.
const CAN_COLOR = {
  filledMain: '#17A3E0', filledHighlight: '#98D8F4', filledShade: '#167DB8',
  emptyMain: '#CBD5E1', emptyHighlight: '#E2E8F0', emptyShade: '#94A3B8',
  rim: '#E2E8F0', hole: '#1B628E',
}

// Builds a rippled waterline: a horizontal run of alternating bezier humps
// starting and ending at y, so the fill boundary reads as water rather than
// a flat cut.
function buildWaterlinePath(x: number, y: number, width: number, amplitude: number, humps: number) {
  const segmentWidth = width / humps
  let d = `M ${x} ${y}`
  for (let i = 0; i < humps; i++) {
    const direction = i % 2 === 0 ? -1 : 1
    const cp1x = x + i * segmentWidth + segmentWidth / 4
    const cp2x = x + i * segmentWidth + (segmentWidth * 3) / 4
    const endX = x + (i + 1) * segmentWidth
    const cpY = y + direction * amplitude
    d += ` C ${cp1x} ${cpY}, ${cp2x} ${cpY}, ${endX} ${y}`
  }
  return d
}

function WateringCanIcon({ status }: { status: SkillStatus }) {
  const fillPct = WATER_LEVEL_PCT[status]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  const bodyBottom = CAN_BODY.y + CAN_BODY.height
  const filledHeight = (CAN_BODY.height * fillPct) / 100
  const filledY = bodyBottom - filledHeight
  const waterlineOverflow = bodyBottom + 20
  const filledClipPath =
    `${buildWaterlinePath(CAN_BODY.x, filledY, CAN_BODY.width, 16, 3)}` +
    ` L ${CAN_BODY.x + CAN_BODY.width} ${waterlineOverflow} L ${CAN_BODY.x} ${waterlineOverflow} Z`

  return (
    <div className="relative w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]">
      <svg viewBox="0 0 2048 2048" className="w-full h-full" role="img" aria-label={`Watering can, ${fillPct}% full`}>
        <defs>
          <clipPath id={`can-outline-${uid}`}>
            <path d={CAN_BODY_PATH} />
          </clipPath>
          <clipPath id={`can-filled-${uid}`}>
            <path d={filledClipPath} />
          </clipPath>
        </defs>

        {/* Handle */}
        <path
          d="M 1350 920 C 1650 950, 1820 1080, 1770 1330 C 1740 1500, 1600 1580, 1350 1600"
          fill="none"
          stroke={CAN_COLOR.emptyShade}
          strokeWidth="115"
          strokeLinecap="round"
        />

        {/* Spout */}
        <path
          d="M 270 430 Q 550 660 950 1000"
          fill="none"
          stroke={CAN_COLOR.emptyShade}
          strokeWidth="142"
          strokeLinecap="round"
        />
        <ellipse cx="255" cy="425" rx="72" ry="50" fill={CAN_COLOR.emptyHighlight} transform="rotate(-40 255 425)" />
        <g fill={CAN_COLOR.hole}>
          <circle cx="225" cy="400" r="9" />
          <circle cx="260" cy="392" r="9" />
          <circle cx="292" cy="405" r="9" />
          <circle cx="240" cy="435" r="9" />
          <circle cx="278" cy="440" r="9" />
        </g>

        {/* Rim, drawn before the body so only its top arc peeks above the cylinder */}
        <ellipse cx={CAN_BODY.x + CAN_BODY.width / 2} cy={CAN_BODY.y} rx={CAN_BODY.width / 2} ry="65" fill={CAN_COLOR.rim} />
        <ellipse cx={CAN_BODY.x + CAN_BODY.width / 2} cy={CAN_BODY.y - 15} rx="130" ry="30" fill={CAN_COLOR.hole} />

        {/* Body, clipped to its rounded silhouette so overlays never overflow it */}
        <g clipPath={`url(#can-outline-${uid})`}>
          <rect x={CAN_BODY.x} y={CAN_BODY.y} width={CAN_BODY.width} height={CAN_BODY.height} fill={CAN_COLOR.emptyMain} />
          <rect x={CAN_BODY.x + 387} y={CAN_BODY.y} width={130} height={CAN_BODY.height} fill={CAN_COLOR.emptyShade} />
          <rect x={CAN_BODY.x + 59} y={CAN_BODY.y + 35} width={104} height={CAN_BODY.height - 70} rx="52" fill={CAN_COLOR.emptyHighlight} />
          <g clipPath={`url(#can-filled-${uid})`}>
            <rect x={CAN_BODY.x} y={CAN_BODY.y} width={CAN_BODY.width} height={CAN_BODY.height} fill={CAN_COLOR.filledMain} />
            <rect x={CAN_BODY.x + 387} y={CAN_BODY.y} width={130} height={CAN_BODY.height} fill={CAN_COLOR.filledShade} />
            <rect x={CAN_BODY.x + 59} y={CAN_BODY.y + 35} width={104} height={CAN_BODY.height - 70} rx="52" fill={CAN_COLOR.filledHighlight} />
          </g>
        </g>
      </svg>
    </div>
  )
}

const LEAF_PATH =
  'M11.8127 5.83333C11.8127 4.06416 11.4322 2.93633 10.9775 1.9528C10.5157 2.43573 10.0345 2.78458 9.38305 3.06592C8.55156 3.42494 7.453 3.6685 5.79931 3.98763C5.79631 3.98821 5.79321 3.98882 5.79019 3.98934C4.88874 4.14337 4.07803 4.63109 3.51895 5.35482C2.95998 6.07854 2.69347 6.98614 2.77213 7.89722C2.85085 8.80827 3.26913 9.65668 3.94392 10.2738C4.6187 10.8909 5.50073 11.2319 6.41511 11.2292H6.41682L6.67944 11.2223C9.38695 11.0766 11.8127 8.69975 11.8127 5.83333ZM12.6877 5.83333C12.6877 9.29089 9.69581 12.1032 6.41739 12.1036L6.41796 12.1042C5.28393 12.1076 4.19 11.6846 3.35318 10.9193C2.51642 10.154 1.99756 9.10217 1.89998 7.97241C1.80244 6.84259 2.13357 5.71736 2.82681 4.81991C3.51814 3.92497 4.51946 3.32133 5.63354 3.12858C7.30485 2.80605 8.3072 2.57743 9.03613 2.2627C9.73458 1.96109 10.1913 1.57598 10.7428 0.89209L10.7804 0.851074C10.873 0.762229 11.0008 0.71751 11.1302 0.731445C11.2782 0.747422 11.4083 0.838098 11.4748 0.971273C12.0721 2.16587 12.6877 3.50827 12.6877 5.83333Z'
const LEAF_PATH_2 =
  'M0.729167 12.25C0.729167 10.2877 1.95952 8.7343 4.04517 8.32105C4.69717 8.19169 5.37311 7.91852 5.96037 7.60327C6.55111 7.28615 7.02233 6.94235 7.27401 6.69067C7.44486 6.51982 7.72181 6.51982 7.89266 6.69067C8.06351 6.86153 8.06351 7.13847 7.89266 7.30933C7.561 7.64099 7.01112 8.03198 6.37394 8.37402C5.73338 8.71787 4.97447 9.0283 4.21493 9.17896C2.53228 9.51239 1.60417 10.7123 1.60417 12.25C1.60417 12.4916 1.40829 12.6875 1.16667 12.6875C0.925042 12.6875 0.729167 12.4916 0.729167 12.25Z'

function LeafIcon({ filled }: { filled: boolean }) {
  const color = filled ? '#6EE7B7' : '#D4D4D4'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d={LEAF_PATH} fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={LEAF_PATH_2} fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Leaves({ status }: { status: SkillStatus }) {
  const filledCount = LEAF_COUNT[status]
  return (
    <div className="flex gap-1 justify-center mt-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <LeafIcon key={i} filled={i < filledCount} />
      ))}
    </div>
  )
}

function SkillCard({ skill, bg }: { skill: OverviewSkill; bg: string }) {
  const isEmotionRegulation = skill.name === 'Emotion Regulation'
  return (
    <div className={`${bg} rounded-3xl px-4 sm:px-8 py-4 flex flex-col items-center gap-3`}>
      <p className="text-sm font-semibold text-gray-700 text-center truncate w-full text-ellipsis overflow-hidden whitespace-nowrap">
        {skill.name}
      </p>
      <div className="bg-white rounded-3xl p-3 w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <WateringCanIcon status={skill.status} />
          <p className="text-sm sm:text-base font-semibold text-gray-800 text-center">{skill.status}</p>
          <Leaves status={skill.status} />
        </div>
        {isEmotionRegulation ? (
          <Link
            href="/narrative"
            className="inline-flex items-center justify-center min-h-10 px-6 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-blue-800 transition-colors w-fit"
          >
            View my insights
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center min-h-10 px-6 py-2.5 rounded-lg bg-gray-300 text-white text-sm font-medium cursor-not-allowed w-fit">
            View my insights
          </span>
        )}
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
    <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-[600px] mx-auto w-full">
      {skills.map((s) => <SkillCard key={s.name} skill={s} bg="bg-[#dbeafe]" />)}
    </div>
  )
}

function BarCard({ skill }: { skill: OverviewSkill }) {
  const pct = FILL_PCT[skill.status]
  const isEmotionRegulation = skill.name === 'Emotion Regulation'
  return (
    <div className="bg-[#dbeafe] rounded-2xl sm:rounded-[24px] px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-1.5 sm:gap-2 w-full">
      <p className="text-sm sm:text-base text-[#404040] truncate">{skill.name}</p>
      <div className="flex items-center gap-2 sm:gap-3 w-full">
        <div className="relative flex-1 min-w-0 h-9 sm:h-11 bg-white rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full bg-[#7dd3fc] ${pct >= 100 ? 'rounded-full' : 'rounded-l-full'}`}
            style={{ width: `${pct}%`, transition: 'width 0.6s ease-out' }}
          />
          <div className="relative z-10 h-full flex items-center gap-2 px-2.5 sm:px-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#e0f2fe] flex items-center justify-center overflow-hidden shrink-0">
              <Image src={TIER_ICON[skill.status]} alt="" width={24} height={24} className="object-cover" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#211f26] whitespace-nowrap">{skill.status}</span>
          </div>
        </div>
        {isEmotionRegulation ? (
          <Link
            href="/narrative"
            className="h-9 sm:h-11 shrink-0 inline-flex items-center justify-center px-4 sm:px-6 rounded-full bg-[#1D4ED8] text-white text-xs sm:text-sm font-medium hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            View insights
          </Link>
        ) : (
          <span className="h-9 sm:h-11 shrink-0 inline-flex items-center justify-center px-4 sm:px-6 rounded-full bg-gray-300 text-white text-xs sm:text-sm font-medium cursor-not-allowed whitespace-nowrap">
            View insights
          </span>
        )}
      </div>
    </div>
  )
}

function BarGraphView({ skills }: { skills: OverviewSkill[] }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[824px] mx-auto">
      {skills.map((s) => <BarCard key={s.name} skill={s} />)}
    </div>
  )
}

function OverviewTab() {
  const [view, setView] = useState<'cards' | 'bars'>('bars')
  const studentLevel = useSession((s) => s.studentLevel)
  const answers = useSession((s) => s.answers)

  // Only trust the computed score once the student has actually answered
  // every question — a partial/unstarted survey should fall back to the
  // placeholder status instead of scoring as "Starting out".
  const hasAttemptedEmotionRegulation =
    Object.keys(answers).length >= SURVEY_QUESTIONS_BY_LEVEL[studentLevel].length

  const skills = ALL_SKILLS.map((skill) => {
    if (skill.name !== 'Emotion Regulation' || !hasAttemptedEmotionRegulation) return skill
    const score = computeEmotionRegulationScore(answers, studentLevel)
    const band = getEmotionRegulationBand(score, studentLevel)
    return { ...skill, status: BAND_TO_SKILL_STATUS[band] }
  })

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Overview of My Social Emotional Skills</h2>
        <p className="text-gray-500 text-base px-2">Just like a vibrant garden, your emotional well-being thrives when it's nurtured.</p>
        <button
          type="button"
          onClick={() => setView((v) => (v === 'cards' ? 'bars' : 'cards'))}
          aria-label="Toggle between card and bar graph view"
          className="relative w-full max-w-md h-36 sm:h-48 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Image src="/assets/dashboard-hero.png" alt="MySEI characters" fill className="object-cover" />
        </button>
      </div>

      <ScrollReveal delay={0}>
        {view === 'cards' ? (
          <SkillGroup skills={skills} />
        ) : (
          <BarGraphView skills={skills} />
        )}
      </ScrollReveal>
    </div>
  )
}
