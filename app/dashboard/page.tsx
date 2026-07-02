'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

const CAROUSEL_CARDS = [
  {
    title: 'Emotion regulation',
    description: 'Recognise, express, and regulate your emotions appropriately',
    image: '/assets/survey-er-v2.png',
  },
  {
    title: 'Self-control',
    description: 'Control your actions to avoid excessive, addictive or other inappropriate behaviours',
    image: '/assets/survey-sc.png',
  },
  {
    title: 'Self-motivation',
    description: 'Believe in yourself and your abilities and strive to improve yourself to achieve your goals and potential',
    image: '/assets/survey-sm.png',
  },
]

export default function Dashboard() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()
  const [carouselIdx, setCarouselIdx] = useState(0)

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

        {/* New surveys carousel */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">New surveys</h3>
          <div className="flex items-center gap-4">
            {/* Left arrow */}
            <button
              onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
              disabled={carouselIdx === 0}
              className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center shrink-0 disabled:opacity-30 hover:bg-[#383838] transition-colors"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Cards track */}
            <div className="flex-1 overflow-hidden relative">
              <div
                className="flex gap-4 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(calc(-${carouselIdx} * (460px + 16px)))` }}
              >
                {CAROUSEL_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="bg-[#eff6ff] rounded-3xl p-6 shrink-0 w-[460px] flex items-center gap-4"
                  >
                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-[#0a0a0a]">{card.title}</h4>
                        <p className="text-sm text-[#404040] leading-6">{card.description}</p>
                      </div>
                      <p className="text-sm font-medium text-[#65636d] flex items-center gap-2">
                        <span className="text-sm">📋</span> 6 items
                      </p>
                      {card.title === 'Emotion regulation' ? (
                        <Link
                          href="/survey/intro"
                          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#171717] text-white text-sm font-medium w-fit hover:bg-[#383838] transition-colors"
                        >
                          Start survey
                        </Link>
                      ) : (
                        <span className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#d4d4d4] text-white text-sm font-medium w-fit cursor-not-allowed">
                          Start survey
                        </span>
                      )}
                    </div>
                    {/* Illustration */}
                    <div className="relative shrink-0 w-[100px] h-[100px]">
                      <Image src={card.image} alt={card.title} fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Right fade gradient */}
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* Right arrow */}
            <button
              onClick={() => setCarouselIdx((i) => Math.min(CAROUSEL_CARDS.length - 1, i + 1))}
              disabled={carouselIdx === CAROUSEL_CARDS.length - 1}
              className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center shrink-0 disabled:opacity-30 hover:bg-[#383838] transition-colors"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
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
              href="/surveys"
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
