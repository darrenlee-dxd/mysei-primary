'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/store/session'

export default function SurveyIntroStep1() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <header className="h-[60px] sm:h-[71px] border-b border-gray-200 flex items-center justify-between px-4 sm:px-8">
        <span className="text-lg sm:text-2xl font-bold text-[#3e63dd]">MySEI</span>
        <Link
          href="/surveys"
          className="text-sm px-4 sm:px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Exit
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-[#dbeafe] rounded-3xl px-6 sm:px-12 py-8 sm:py-12 flex flex-col items-center gap-6 sm:gap-8 max-w-[720px] w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="relative w-20 h-20 sm:w-[140px] sm:h-[140px] shrink-0">
              <Image src="/assets/survey-er-v2.png" alt="" fill className="object-contain" />
            </div>
            <h1 className="text-xl sm:text-[30px] font-semibold text-[#404040] leading-snug text-center sm:text-left">
              You are about to do a survey about your{' '}
              <span className="text-[#1d4ed8]">Emotion Regulation</span> skill
            </h1>
          </div>
          <Link
            href="/survey/intro/2"
            style={{ opacity: 0, animation: 'optionFadeIn 0.5s ease-out 750ms both' }}
            className="h-12 px-16 rounded-full bg-[#171717] text-white font-medium text-base flex items-center justify-center hover:bg-[#383838] transition-colors w-full sm:w-[250px]"
          >
            Next
          </Link>
        </div>
      </main>
    </div>
  )
}
