'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'
import { BAND_BADGE_BG, EMOTION_REGULATION_NARRATIVE_BY_LEVEL } from '@/data/narrative'
import { computeEmotionRegulationScore, getEmotionRegulationBand } from '@/lib/scoring'

function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const initial =
    direction === 'left' ? 'translateX(-32px)'
    : direction === 'right' ? 'translateX(32px)'
    : 'translateY(28px)'

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0)' : initial,
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function NarrativePage() {
  const userName = useSession((s) => s.userName)
  const studentLevel = useSession((s) => s.studentLevel)
  const answers = useSession((s) => s.answers)
  const router = useRouter()
  const score = computeEmotionRegulationScore(answers, studentLevel)
  const band = getEmotionRegulationBand(score, studentLevel)
  const content = EMOTION_REGULATION_NARRATIVE_BY_LEVEL[studentLevel][band]

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <NavBar />

      <main className="max-w-[1128px] mx-auto px-4 py-8 sm:py-10 flex flex-col gap-10 sm:gap-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
          <Link href="/profile" className="hover:underline text-[#737373]">Strengths and Growth Areas</Link>
          <span className="text-gray-400">›</span>
          <span className="text-[#0a0a0a]">Emotion regulation</span>
        </nav>

        {/* Hero section */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 text-center max-w-[880px] mx-auto w-full">
          <h1 className="text-2xl sm:text-[30px] font-semibold text-[#211f26] tracking-tight">
            Emotion Regulation
          </h1>

          <div className="relative h-[180px] w-[246px] sm:h-[250px] sm:w-[342px]">
            <Image src="/assets/narrative-hero-char.png" alt="Emotion Regulation character" fill className="object-contain" />
          </div>

          <span className={`px-6 py-3 ${BAND_BADGE_BG[band]} text-[#211f26] rounded-full text-base font-semibold`}>
            {band}
          </span>

          <p className="text-base sm:text-lg text-[#171717]">
            From your responses,{' '}
            <strong className="font-semibold">{content.statusBlurb}</strong>
          </p>

          {/* Summary card */}
          <div className="bg-[#dbeafe] rounded-3xl flex flex-col-reverse sm:flex-row sm:h-[134px] items-center justify-between px-6 sm:px-8 py-6 sm:py-0 w-full overflow-hidden gap-4 sm:gap-0">
            <p className="text-sm sm:text-base text-[#171717] leading-6 flex-1 text-left">
              <strong className="font-semibold">Emotion Regulation</strong>
              {' '}{content.summaryDescription}
            </p>
            <div className="relative shrink-0 w-[110px] h-[110px] sm:w-[160px] sm:h-[160px]">
              <Image src="/assets/survey-er-v2.png" alt="Emotion Regulation" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="max-w-[880px] mx-auto w-full h-px bg-[#d0cdd7]" />

        {/* How can you grow */}
        <div className="flex flex-col gap-6 sm:gap-10 max-w-[880px] mx-auto w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#211f26] text-center tracking-tight">
            How can you grow in this skill?
          </h2>

          <div className="flex flex-col items-start w-full">
            {/* Tip 1 — offset right */}
            <ScrollReveal direction="right" delay={0}>
            <div className="sm:pr-16 w-full">
              <div className="bg-[#fef3c7] rounded-3xl p-6 sm:p-10 flex flex-col gap-4 sm:gap-6 w-full">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-base sm:text-xl font-semibold text-[#0a0a0a] leading-snug sm:leading-6">
                    {content.tip1.text}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 sm:gap-6">
                  {/* Speech bubble */}
                  <div className="relative order-2 sm:order-1 w-full sm:w-auto">
                    <div className="bg-white rounded-3xl p-5 sm:p-6 w-full sm:w-[287px]">
                      <p className="text-base sm:text-lg font-medium text-[#211f26] leading-relaxed">
                        {content.tip1.bubble}
                      </p>
                    </div>
                    {/* Arrow pointing right (desktop only) */}
                    <div className="hidden sm:block absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white" />
                  </div>
                  <div className="relative order-1 sm:order-2 h-[180px] w-[225px] sm:h-[250px] sm:w-[312px] shrink-0">
                    <Image src="/assets/narrative-tip1-char.png" alt="Tip character" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Connector path */}
            <ScrollReveal delay={100}>
            <div className="h-[60px] sm:h-[80px] w-full flex items-center justify-center opacity-20">
              <svg width="400" height="80" viewBox="0 0 400 80" fill="none" className="w-[240px] sm:w-[400px] h-auto">
                <path d="M320 0 C320 40, 80 40, 80 80" stroke="#7C3AED" strokeWidth="3" fill="none" strokeDasharray="8 4"/>
              </svg>
            </div>
            </ScrollReveal>

            {/* Tip 2 — offset left */}
            <ScrollReveal direction="left" delay={0}>
            <div className="sm:pl-16 w-full">
              <div className="bg-[#e0f2fe] rounded-3xl p-6 sm:p-10 flex flex-col gap-4 sm:gap-6 w-full">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-base sm:text-xl font-semibold text-[#0a0a0a] leading-snug sm:leading-6">
                    {content.tip2.text}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative h-[168px] w-[278px] sm:h-[232px] sm:w-[384px] shrink-0">
                    <Image src="/assets/narrative-tip2-char.png" alt="Tip character" fill className="object-contain" />
                  </div>
                  {/* Speech bubble */}
                  <div className="relative w-full sm:w-auto">
                    <div className="hidden sm:block absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white" />
                    <div className="bg-white rounded-3xl p-5 sm:p-6 w-full sm:w-[321px]">
                      <p className="text-base sm:text-lg font-medium text-[#211f26] leading-relaxed">
                        {content.tip2.bubble}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {content.tip3 && (
              <>
                {/* Connector path */}
                <ScrollReveal delay={100}>
                <div className="h-[60px] sm:h-[80px] w-full flex items-center justify-center opacity-20">
                  <svg width="400" height="80" viewBox="0 0 400 80" fill="none" className="w-[240px] sm:w-[400px] h-auto -scale-x-100">
                    <path d="M320 0 C320 40, 80 40, 80 80" stroke="#7C3AED" strokeWidth="3" fill="none" strokeDasharray="8 4"/>
                  </svg>
                </div>
                </ScrollReveal>

                {/* Tip 3 — offset right */}
                <ScrollReveal direction="right" delay={0}>
                <div className="sm:pr-16 w-full">
                  <div className="bg-[#dcfce7] rounded-3xl p-6 sm:p-10 flex flex-col gap-4 sm:gap-6 w-full">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-lg shrink-0">💡</span>
                      <p className="text-base sm:text-xl font-semibold text-[#0a0a0a] leading-snug sm:leading-6">
                        {content.tip3.text}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 sm:gap-6">
                      {/* Speech bubble */}
                      <div className="relative order-2 sm:order-1 w-full sm:w-auto">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 w-full sm:w-[287px]">
                          <p className="text-base sm:text-lg font-medium text-[#211f26] leading-relaxed">
                            {content.tip3.bubble}
                          </p>
                        </div>
                        {/* Arrow pointing right (desktop only) */}
                        <div className="hidden sm:block absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white" />
                      </div>
                      <div className="relative order-1 sm:order-2 h-[180px] w-[157px] sm:h-[220px] sm:w-[192px] shrink-0">
                        <Image src="/assets/narrative-hero-char.png" alt="Tip character" fill className="object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              </>
            )}
          </div>
        </div>

        {/* Find more strategies */}
        <div className="max-w-[880px] mx-auto w-full flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] shrink-0">
            <Image src="/assets/narrative-strategies-img.png" alt="Strategies" fill className="object-contain" />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-6">
            <h3 className="text-xl sm:text-[30px] font-semibold text-[#0a0a0a] tracking-tight leading-snug">
              Find more strategies that fit you
            </h3>
            <a
              href="https://go.gov.sg/emotionregulation-ls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#1d4ed8] text-white text-base font-medium hover:bg-blue-800 transition-colors w-fit"
            >
              See more strategies
              <span>↗</span>
            </a>
          </div>
        </div>

        <div className="max-w-[880px] mx-auto w-full h-px bg-[#d0cdd7]" />

        {/* Next up for you */}
        <div className="flex flex-col gap-6 sm:gap-10 max-w-[880px] mx-auto w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#211f26] text-center tracking-tight">
            Next up for you
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NextSurveyCard
              title="Emotion regulation"
              description="Recognise, express, and regulate your emotions appropriately"
              image="/assets/survey-er-v2.png"
              href="/survey/intro"
            />
            <NextSurveyCard
              title="Self-control"
              description="Control your actions to avoid excessive, addictive or other inappropriate behaviours"
              image="/assets/survey-sc.png"
              href=""
            />
          </div>
        </div>

      </main>
    </div>
  )
}

function NextSurveyCard({
  title, description, image, href,
}: {
  title: string
  description: string
  image: string
  href: string
}) {
  return (
    <div className="bg-[#eff6ff] rounded-3xl p-6 sm:p-8 flex flex-col sm:block sm:h-[291px] gap-4 overflow-hidden relative">
      <div className="relative sm:absolute sm:right-8 sm:top-8 w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] self-end">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <div className="flex flex-col justify-between sm:h-full w-full sm:w-[257px] shrink-0 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg sm:text-xl font-semibold text-[#0a0a0a] truncate">{title}</h4>
            <p className="text-sm sm:text-base text-[#404040] leading-6 line-clamp-3">{description}</p>
          </div>
          <p className="text-base sm:text-lg font-medium text-[#65636d] flex items-center gap-2">
            <span className="text-base">📋</span> 6 items
          </p>
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#171717] text-white text-base font-medium w-fit hover:bg-[#383838] transition-colors"
          >
            Start survey
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#d4d4d4] text-white text-base font-medium w-fit cursor-not-allowed">
            Start survey
          </span>
        )}
      </div>
    </div>
  )
}
