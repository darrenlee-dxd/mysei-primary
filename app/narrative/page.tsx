'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

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
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <NavBar />

      <main className="max-w-[1128px] mx-auto px-4 py-10 flex flex-col gap-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 flex items-center gap-1">
          <Link href="/profile" className="hover:underline text-[#737373]">Strengths and Growth Areas</Link>
          <span className="text-gray-400">›</span>
          <span className="text-[#0a0a0a]">Emotion regulation</span>
        </nav>

        {/* Hero section */}
        <div className="flex flex-col items-center gap-6 text-center max-w-[880px] mx-auto w-full">
          <h1 className="text-[30px] font-semibold text-[#211f26] tracking-tight">
            Emotion Regulation
          </h1>

          <div className="relative h-[250px] w-[342px]">
            <Image src="/assets/narrative-hero-char.png" alt="Emotion Regulation character" fill className="object-contain" />
          </div>

          <span className="px-6 py-3 bg-[#cffafe] text-[#211f26] rounded-full text-base font-semibold">
            Starting out
          </span>

          <p className="text-lg text-[#171717]">
            From your responses, you are{' '}
            <strong className="font-semibold">learning how to manage your feelings.</strong>
          </p>

          {/* Summary card */}
          <div className="bg-[#dbeafe] rounded-3xl h-[134px] flex items-center justify-between px-8 w-full overflow-hidden">
            <p className="text-base text-[#171717] leading-6 flex-1 text-left">
              <strong className="font-semibold">Emotion Regulation</strong>
              {' '}is about understanding and managing your feelings.{' '}
              When you can manage your feelings, you stay in control of what you say and do even when the situation is difficult.
            </p>
            <div className="relative shrink-0 w-[160px] h-[160px]">
              <Image src="/assets/survey-er-v2.png" alt="Emotion Regulation" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="max-w-[880px] mx-auto w-full h-px bg-[#d0cdd7]" />

        {/* How can you grow */}
        <div className="flex flex-col gap-10 max-w-[880px] mx-auto w-full">
          <h2 className="text-2xl font-semibold text-[#211f26] text-center tracking-tight">
            How can you grow in this skill?
          </h2>

          <div className="flex flex-col items-start w-full">
            {/* Tip 1 — offset right */}
            <ScrollReveal direction="right" delay={0}>
            <div className="pr-16 w-full">
              <div className="bg-[#fef3c7] rounded-3xl p-10 flex flex-col gap-6 w-full">
                <div className="flex items-start gap-4">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-xl font-semibold text-[#0a0a0a] leading-6">
                    Be aware of how your body feels when you are happy, sad, or angry — this can help you name your feelings.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-6">
                  {/* Speech bubble */}
                  <div className="relative">
                    <div className="bg-white rounded-3xl p-6 w-[287px]">
                      <p className="text-lg font-medium text-[#211f26] leading-relaxed">
                        Smile and laugh, dance to music, heartbeat faster, shout at others.
                      </p>
                    </div>
                    {/* Arrow pointing right */}
                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white" />
                  </div>
                  <div className="relative h-[250px] w-[312px] shrink-0">
                    <Image src="/assets/narrative-tip1-char.png" alt="Tip character" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Connector path */}
            <ScrollReveal delay={100}>
            <div className="h-[80px] w-full flex items-center justify-center opacity-20">
              <svg width="400" height="80" viewBox="0 0 400 80" fill="none">
                <path d="M320 0 C320 40, 80 40, 80 80" stroke="#7C3AED" strokeWidth="3" fill="none" strokeDasharray="8 4"/>
              </svg>
            </div>
            </ScrollReveal>

            {/* Tip 2 — offset left */}
            <ScrollReveal direction="left" delay={0}>
            <div className="pl-16 w-full">
              <div className="bg-[#e0f2fe] rounded-3xl p-10 flex flex-col gap-6 w-full">
                <div className="flex items-start gap-4">
                  <span className="text-lg shrink-0">💡</span>
                  <p className="text-xl font-semibold text-[#0a0a0a] leading-6">
                    Talk to a trusted adult, like a parent or teacher, when you feel unsure about your feelings.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-[232px] w-[384px] shrink-0">
                    <Image src="/assets/narrative-tip2-char.png" alt="Tip character" fill className="object-contain" />
                  </div>
                  {/* Speech bubble */}
                  <div className="relative">
                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white" />
                    <div className="bg-white rounded-3xl p-6 w-[321px]">
                      <p className="text-lg font-medium text-[#211f26] leading-relaxed">
                        Tell your parents what you are going through.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Find more strategies */}
        <div className="max-w-[880px] mx-auto w-full flex items-center gap-6">
          <div className="relative w-[200px] h-[200px] shrink-0">
            <Image src="/assets/narrative-strategies-img.png" alt="Strategies" fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[30px] font-semibold text-[#0a0a0a] tracking-tight leading-snug">
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
        <div className="flex flex-col gap-10 max-w-[880px] mx-auto w-full">
          <h2 className="text-2xl font-semibold text-[#211f26] text-center tracking-tight">
            Next up for you
          </h2>
          <div className="grid grid-cols-2 gap-6">
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
    <div className="bg-[#eff6ff] rounded-3xl p-8 flex justify-between items-start gap-4 h-[291px] overflow-hidden relative">
      <div className="flex flex-col justify-between h-full w-[257px] shrink-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold text-[#0a0a0a] truncate">{title}</h4>
            <p className="text-base text-[#404040] leading-6 line-clamp-3">{description}</p>
          </div>
          <p className="text-lg font-medium text-[#65636d] flex items-center gap-2">
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
      <div className="absolute right-8 top-8 w-[160px] h-[160px]">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
    </div>
  )
}
