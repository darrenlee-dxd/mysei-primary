'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

const SURVEY_CARDS = [
  {
    title: 'Emotion regulation',
    description: 'Recognise, express, and regulate your emotions appropriately',
    icon: '/assets/skill-er.png',
    isImage: true,
  },
  {
    title: 'Self-control',
    description: 'Control your actions to avoid excessive, addictive or other inappropriate behaviours',
    icon: '/assets/skill-gauge.png',
    isImage: true,
  },
  {
    title: 'Self-motivation',
    description: 'Believe in yourself and your abilities and strive to improve yourself to achieve your goals and potential',
    icon: '/assets/skill-ladder.png',
    isImage: true,
  },
  {
    title: 'Positivity',
    description: 'Be grateful, hopeful and trying to see the bright side of things',
    icon: '/assets/skill-sun.png',
    isImage: true,
  },
  {
    title: 'Appreciating diversity',
    description: 'Value everyone\'s strengths as well as their similarities and differences through learning from and working well with them',
    icon: '🌍',
    isImage: false,
  },
  {
    title: 'Empathy',
    description: 'Understand one another\'s thoughts, feelings, needs, and concerns without judging them',
    icon: '🫶',
    isImage: false,
  },
  {
    title: 'Interpersonal communication',
    description: 'Interact with others by listening actively and expressing your thoughts and feelings clearly and respectfully so as to build healthy relationships',
    icon: '💬',
    isImage: false,
  },
  {
    title: 'Civic consciousness',
    description: 'Know about what is happening in Singapore, the region and the world.',
    icon: '🌱',
    isImage: false,
  },
  {
    title: 'Problem-solving',
    description: 'Think through problems, consider different solutions and decide on appropriate courses of action',
    icon: '🧩',
    isImage: false,
  },
  {
    title: 'Moral reasoning and action',
    description: 'Determine why a decision, or an action is right or wrong and to explain clearly the reasons for one\'s decisions and actions',
    icon: '🧭',
    isImage: false,
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

      <main className="max-w-[1128px] mx-auto px-4 py-10 flex flex-col gap-10">
        {/* Page header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-gray-900">My Surveys</h1>
          <p className="text-gray-500 text-base">Only your teacher will see your answers so they know how to help you.</p>
        </div>

        {/* Info banner */}
        <div className="flex items-center gap-6 max-w-2xl mx-auto w-full">
          <div className="relative w-28 h-28 shrink-0">
            <Image src="/assets/narrative-cactus.png" alt="Cactus character" fill className="object-contain" />
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-5 flex-1">
            <p className="font-semibold text-gray-800 mb-1">You're always learning and changing</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Answer honestly and think about your experiences at home, in school, and in your community.
            </p>
          </div>
        </div>

        {/* Survey card grid */}
        <div className="grid grid-cols-2 gap-4">
          {SURVEY_CARDS.map((card) => (
            <div key={card.title} className="bg-[#eff6ff] rounded-2xl p-6 flex justify-between items-center gap-4">
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{card.description}</p>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span>📋</span> 6 items
                </p>
                <Link
                  href="/survey/intro"
                  className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-[#171717] text-white text-sm font-medium w-fit hover:bg-[#383838] transition-colors"
                >
                  Start survey
                </Link>
              </div>
              <div className="shrink-0 w-20 h-20 flex items-center justify-center">
                {card.isImage ? (
                  <div className="relative w-20 h-20">
                    <Image src={card.icon} alt={card.title} fill className="object-contain" />
                  </div>
                ) : (
                  <span className="text-5xl">{card.icon}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
