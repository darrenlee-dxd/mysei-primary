'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

export default function Dashboard() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  const firstName = userName?.split(' ')[0] || 'Amy'

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-[1128px] mx-auto px-4 py-12 flex flex-col gap-16">
        {/* Hero banner */}
        <div className="bg-[#d1fae5] rounded-[32px] flex items-center overflow-hidden min-h-[200px] relative">
          <div className="flex-1 pl-10 py-8">
            <h2 className="text-2xl font-semibold text-gray-800">Hi {firstName}!</h2>
            <p className="text-lg text-gray-600 mt-1">Welcome back, nice to see you again!</p>
          </div>
          <div className="relative h-[220px] w-[500px] flex-shrink-0">
            <Image
              src="/assets/dashboard-hero.png"
              alt="MySEI characters"
              fill
              className="object-cover object-left rounded-r-[32px]"
            />
          </div>
        </div>

        {/* New surveys */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">New surveys</h3>
          <div className="grid grid-cols-2 gap-4">
            <SurveyCard
              title="Emotion regulation"
              description="Recognise, express, and regulate your emotions appropriately"
              items={6}
              image="/assets/survey-card-er.png"
              href="/survey/intro"
              highlight
            />
            <SurveyCard
              title="Self-control"
              description="Control your actions to avoid excessive, addictive or other inappropriate behaviours"
              items={6}
              image="/assets/survey-card-sc.png"
              href="/survey/intro"
            />
          </div>
        </section>

        {/* Explore */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Explore at your own pace</h3>
          <div className="grid grid-cols-2 gap-4">
            <ExploreCard
              title="Surveys"
              description="Assess your SE competencies"
              image="/assets/explore-surveys.png"
              href="/survey/intro"
              buttonLabel="See surveys"
              bg="bg-[#dbeafe]"
            />
            <ExploreCard
              title="Strengths & Growth areas"
              description="See insights from your surveys"
              image="/assets/explore-insights.png"
              href="/profile"
              buttonLabel="See insights"
              bg="bg-[#fef9c3]"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function SurveyCard({
  title, description, items, image, href, highlight,
}: {
  title: string
  description: string
  items: number
  image: string
  href: string
  highlight?: boolean
}) {
  return (
    <div className={`rounded-2xl border border-gray-200 p-6 flex justify-between items-center gap-4 ${highlight ? 'bg-white shadow-sm' : 'bg-[#f8faff]'}`}>
      <div className="flex flex-col gap-3 flex-1">
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <span>📋</span> {items} items
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#171717] text-white text-sm font-medium w-fit hover:bg-[#383838] transition-colors"
        >
          Start survey
        </Link>
      </div>
      <div className="relative w-28 h-28 flex-shrink-0">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
    </div>
  )
}

function ExploreCard({
  title, description, image, href, buttonLabel, bg,
}: {
  title: string
  description: string
  image: string
  href: string
  buttonLabel: string
  bg: string
}) {
  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col`}>
      <div className={`${bg} flex items-center justify-center py-8`}>
        <div className="relative w-24 h-24">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>
      <div className="p-6 border border-gray-200 border-t-0 rounded-b-2xl bg-white flex flex-col gap-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#171717] text-white text-sm font-medium hover:bg-[#383838] transition-colors"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
