'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'
import { BAND_BADGE_BG, EMOTION_REGULATION_NARRATIVE_BY_LEVEL } from '@/data/narrative'
import type { SkillBand } from '@/data/narrative'
import { computeEmotionRegulationScore, getEmotionRegulationBand } from '@/lib/scoring'

const LEAF_COUNT: Record<SkillBand, number> = {
  'Starting out': 1,
  'Making progress': 2,
  'Getting there': 3,
  'Doing well': 4,
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

function Leaves({ band }: { band: SkillBand }) {
  const filledCount = LEAF_COUNT[band]
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <LeafIcon key={i} filled={i < filledCount} />
      ))}
    </div>
  )
}

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
  const growSectionRef = useRef<HTMLDivElement>(null)

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
          <h1 className="text-xl sm:text-2xl font-semibold text-[#211f26] tracking-tight">
            Emotion Regulation
          </h1>

          <span className={`px-6 py-3 ${BAND_BADGE_BG[band]} text-[#211f26] rounded-full text-xl sm:text-2xl font-semibold`}>
            {band}
          </span>

          <Leaves band={band} />

          <div className="relative h-[180px] w-[246px] sm:h-[250px] sm:w-[342px]">
            <Image src="/assets/narrative-hero-char.png" alt="Emotion Regulation character" fill className="object-contain" />
          </div>

          <p className="text-base sm:text-lg text-[#171717]">
            From your responses,{' '}
            <strong className="font-semibold">{content.statusBlurb}</strong>
          </p>

          {/* Summary card */}
          <div className="bg-[#dbeafe] rounded-3xl flex flex-col-reverse sm:flex-row sm:h-[134px] items-center justify-between px-6 sm:px-8 py-6 sm:py-0 w-full overflow-hidden gap-4 sm:gap-0">
            <p className="text-base sm:text-lg text-[#171717] leading-6 flex-1 text-left">
              <strong className="font-semibold">Emotion Regulation</strong>
              {' '}{content.summaryDescription}
            </p>
            <div className="relative shrink-0 w-[110px] h-[110px] sm:w-[160px] sm:h-[160px]">
              <Image src="/assets/survey-er-v2.png" alt="Emotion Regulation" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* Scroll-to-next-section divider */}
        <div className="max-w-[880px] mx-auto w-full flex items-center justify-center gap-4">
          <div className="hidden sm:block flex-1 h-px bg-[#d0cdd7]" />
          <button
            type="button"
            onClick={() => growSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="flex flex-col items-center gap-2 min-h-10 px-6 py-2.5 rounded-lg text-[#737373] text-sm font-medium hover:bg-gray-100 transition-colors shrink-0"
          >
            Scroll down for more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
          <div className="hidden sm:block flex-1 h-px bg-[#d0cdd7]" />
        </div>

        {/* How can you grow */}
        <div ref={growSectionRef} className="flex flex-col gap-6 sm:gap-10 max-w-[880px] mx-auto w-full scroll-mt-20">
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
            <div className="w-full">
            <ScrollReveal delay={100}>
              <Image src="/assets/narrative-path-connector.svg" alt="" width={880} height={172} className="w-full h-auto" />
            </ScrollReveal>
            </div>

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
                <div className="w-full -scale-x-100">
                <ScrollReveal delay={100}>
                  <Image src="/assets/narrative-path-connector.svg" alt="" width={880} height={172} className="w-full h-auto" />
                </ScrollReveal>
                </div>

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
            <p className="text-base text-[#404040] leading-6 line-clamp-3">{description}</p>
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
