'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

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
    <div ref={ref} className="h-full" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const SURVEY_CARDS = [
  {
    title: 'Emotion regulation',
    description: 'Recognise, express, and regulate your emotions appropriately',
    icon: '/assets/survey-er-v2.png',
  },
  {
    title: 'Self-control',
    description: 'Control your actions to avoid excessive, addictive or other inappropriate behaviours',
    icon: '/assets/survey-sc.png',
  },
  {
    title: 'Self-motivation',
    description: 'Believe in yourself and your abilities and strive to improve yourself to achieve your goals and potential',
    icon: '/assets/survey-sm.png',
  },
  {
    title: 'Positivity',
    description: 'Be grateful, hopeful and trying to see the bright side of things',
    icon: '/assets/survey-pos-v2.png',
  },
  {
    title: 'Appreciating diversity',
    description: 'Value everyone\'s strengths as well as their similarities and differences through learning from and working well with them',
    icon: '/assets/survey-ad.png',
  },
  {
    title: 'Empathy',
    description: 'Understand one another\'s thoughts, feelings, needs, and concerns without judging them',
    icon: '/assets/survey-emp.png',
  },
  {
    title: 'Interpersonal communication',
    description: 'Interact with others by listening actively and expressing your thoughts and feelings clearly and respectfully so as to build healthy relationships',
    icon: '/assets/survey-ic.png',
  },
  {
    title: 'Civic consciousness',
    description: 'Know about what is happening in Singapore, the region and the world.',
    icon: '/assets/survey-cc.png',
  },
  {
    title: 'Problem-solving',
    description: 'Think through problems, consider different solutions and decide on appropriate courses of action',
    icon: '/assets/survey-ps.png',
  },
  {
    title: 'Moral reasoning and action',
    description: 'Determine why a decision, or an action is right or wrong and to explain clearly the reasons for one\'s decisions and actions',
    icon: '/assets/survey-mr.png',
  },
]

export default function SurveysPage() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="max-w-[1128px] mx-auto px-4 py-8 sm:py-10 flex flex-col gap-8 sm:gap-10">
        {/* Page header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">My Surveys</h1>
        </div>

        {/* Info banner */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-2xl mx-auto w-full">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0">
            <Image src="/assets/surveys-cactus.png" alt="Cactus character" fill className="object-contain" />
          </div>
          <div className="bg-gray-100 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 flex-1 text-center sm:text-left">
            <p className="font-semibold text-gray-800 text-base sm:text-lg mb-1">You're always learning and changing</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Answer honestly and think about your experiences at home, in school, and in your community.
            </p>
          </div>
        </div>

        {/* Survey card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SURVEY_CARDS.map((card, idx) => (
            <ScrollReveal key={card.title} delay={(idx % 2) * 80}>
              <div className="bg-[#eff6ff] rounded-2xl p-5 sm:p-6 flex justify-between items-center gap-4 h-full">
                <div className="flex flex-col justify-between gap-3 flex-1 min-w-0 h-full">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">{card.title}</h3>
                      <p className="text-base text-gray-500 mt-1 leading-relaxed">{card.description}</p>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <span>📋</span> 6 items
                    </p>
                  </div>
                  {card.title === 'Emotion regulation' ? (
                    <Link
                      href="/survey/intro"
                      className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-[#171717] text-white text-sm font-medium w-fit hover:bg-[#383838] transition-colors"
                    >
                      Start survey
                    </Link>
                  ) : (
                    <span className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-[#d4d4d4] text-white text-sm font-medium w-fit cursor-not-allowed">
                      Start survey
                    </span>
                  )}
                </div>
                <div className="relative shrink-0 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
                  <Image src={card.icon} alt={card.title} fill className="object-contain" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
