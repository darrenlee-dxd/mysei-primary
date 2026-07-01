'use client'

import { useEffect, useState } from 'react'
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
        <div className="flex rounded-full border border-gray-200 overflow-hidden w-full max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Overview of My SE Skills
          </button>
          <button
            onClick={() => setActiveTab('strengths')}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'strengths'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🏠 My Strengths and Areas for Growth
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
                        <Link
                          href="/narrative"
                          className="text-sm font-medium text-[#2563eb] border border-[#2563eb] px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          See insights →
                        </Link>
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

type SkillStatus = 'Getting started' | 'Making Progress' | 'Getting There' | 'Doing Well'

interface OverviewSkill {
  name: string
  status: SkillStatus
}

const STAR_COUNT: Record<SkillStatus, number> = {
  'Getting started': 1, 'Making Progress': 2, 'Getting There': 3, 'Doing Well': 4,
}

// How much of the can remains "grey" (white overlay from top), as a percentage
const GREY_TOP_PCT: Record<SkillStatus, number> = {
  'Getting started': 72,
  'Making Progress': 45,
  'Getting There':   18,
  'Doing Well':       0,
}

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
      {[1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= count ? '#3b82f6' : '#e5e7eb'}>
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

function SkillGroup({
  title, description, skills, bg,
}: {
  title: string; description: string; skills: OverviewSkill[]; bg: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((s) => <SkillCard key={s.name} skill={s} bg={bg} />)}
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Overview of My SE Skills</h2>
        <p className="text-gray-500 text-sm">Just like a vibrant garden, your emotional well-being thrives when it's nurtured.</p>
        <div className="relative w-full max-w-md h-48 rounded-2xl overflow-hidden">
          <Image src="/assets/dashboard-hero.png" alt="MySEI characters" fill className="object-cover" />
        </div>
      </div>

      {/* Section 1 */}
      <SkillGroup
        title="Understanding and managing myself"
        description="These skills help you recognize what you're feeling, stay hopeful, and make intentional choices."
        bg="bg-[#dbeafe]"
        skills={[
          { name: 'Emotion Regulation', status: 'Getting started' },
          { name: 'Self-control', status: 'Making Progress' },
          { name: 'Positivity', status: 'Getting There' },
          { name: 'Self-motivation', status: 'Doing Well' },
        ]}
      />

      {/* Section 2 */}
      <SkillGroup
        title="Building relationships"
        description="These skills are about connecting with the people around you. They help you understand different perspectives, care about your community, and tune into how others are feeling."
        bg="bg-[#fef3c7]"
        skills={[
          { name: 'Appreciating diversity', status: 'Getting started' },
          { name: 'Civic consciousness', status: 'Making Progress' },
          { name: 'Empathy', status: 'Getting There' },
        ]}
      />

      {/* Section 3 */}
      <SkillGroup
        title="Making responsible choices"
        description="These skills help you think through decisions and figure out what's right. They're about working through challenges, weighing different options, and making choices that align with your values."
        bg="bg-[#dcfce7]"
        skills={[
          { name: 'Problem-solving', status: 'Getting started' },
          { name: 'Moral reasoning and action', status: 'Making Progress' },
        ]}
      />
    </div>
  )
}
