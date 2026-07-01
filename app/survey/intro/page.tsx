'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/store/session'

export default function SurveyIntro() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <header className="h-[71px] border-b border-gray-200 flex items-center justify-between px-8">
        <span className="text-2xl font-bold text-[#3e63dd]">MySEI</span>
        <Link
          href="/surveys"
          className="text-sm px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Exit
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-10 py-12">
        {/* Character + speech bubble */}
        <div className="flex items-center gap-6 max-w-[720px] w-full">
          <div className="relative w-44 h-44 shrink-0">
            <Image
              src="/assets/survey-intro-char.png"
              alt="MySEI character"
              fill
              className="object-contain"
            />
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-5 flex-1">
            <p className="font-semibold text-gray-900 mb-1">You're always learning and changing</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Answer honestly and think about your experiences at home, in school, and in your community.
            </p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center max-w-[620px] leading-snug">
          You are about to do a survey about your{' '}
          <span className="text-[#2563eb]">Emotion Regulation</span> skill
        </h1>

        {/* Skill description card */}
        <div className="bg-[#dbeafe] rounded-2xl px-8 py-6 flex items-center gap-6 max-w-[720px] w-full">
          <p className="flex-1 text-gray-800 text-base leading-relaxed">
            <strong>Emotion Regulation</strong> is about understanding and managing your feelings.
            When you can manage your feelings, you stay in control of what you say and
            do even when the situation is difficult.
          </p>
          <div className="relative w-24 h-24 shrink-0">
            <Image
              src="/assets/skill-er.png"
              alt="Emotion Regulation"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/survey/1"
          className="h-12 px-16 rounded-full bg-[#171717] text-white font-semibold text-base flex items-center justify-center hover:bg-[#383838] transition-colors"
        >
          Let's begin!
        </Link>
      </main>
    </div>
  )
}
