'use client'

import { useEffect, useRef, useState } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-carousel-card]') as HTMLElement | null
    const amount = (card?.offsetWidth ?? el.clientWidth) + 16
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const firstName = userName?.split(' ')[0] || 'Amy'

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-[1128px] mx-auto px-4 py-8 sm:py-12 flex flex-col gap-10 sm:gap-16">
        {/* Hero banner */}
        <div className="bg-[#d1fae5] rounded-[32px] flex flex-col sm:flex-row items-center overflow-hidden relative">
          <div className="flex-1 pl-6 sm:pl-10 pr-6 sm:pr-0 pt-8 sm:py-8 order-2 sm:order-1 w-full">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Hi {firstName}!</h2>
            <p className="text-base sm:text-lg text-gray-600 mt-1">Welcome back, nice to see you again!</p>
          </div>
          <div className="relative h-[160px] sm:h-[220px] w-full sm:w-[500px] shrink-0 order-1 sm:order-2">
            <Image
              src="/assets/dashboard-hero.png"
              alt="MySEI characters"
              fill
              className="object-cover object-center sm:object-left rounded-t-[32px] sm:rounded-t-none sm:rounded-r-[32px]"
            />
          </div>
        </div>

        {/* New surveys carousel */}
        <section>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">New surveys</h3>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Left arrow */}
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              className="hidden sm:flex w-10 h-10 rounded-full bg-[#171717] items-center justify-center shrink-0 disabled:opacity-30 hover:bg-[#383838] transition-colors"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Cards track */}
            <div className="flex-1 overflow-hidden relative min-w-0">
              <div
                ref={trackRef}
                onScroll={updateScrollState}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
              >
                {CAROUSEL_CARDS.map((card) => (
                  <div
                    key={card.title}
                    data-carousel-card
                    className="bg-[#eff6ff] rounded-3xl p-5 sm:p-6 shrink-0 snap-start w-[85vw] sm:w-[460px] max-w-[460px] flex items-center gap-4"
                  >
                    <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0">
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
                    <div className="relative shrink-0 w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]">
                      <Image src={card.image} alt={card.title} fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Right fade gradient */}
              <div className="hidden sm:block absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              className="hidden sm:flex w-10 h-10 rounded-full bg-[#171717] items-center justify-center shrink-0 disabled:opacity-30 hover:bg-[#383838] transition-colors"
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
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Explore at your own pace</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div className={`${bg} flex items-center justify-center py-6 sm:py-8`}>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>
      <div className="p-5 sm:p-6 border border-gray-200 border-t-0 rounded-b-2xl bg-white flex flex-col gap-2">
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
