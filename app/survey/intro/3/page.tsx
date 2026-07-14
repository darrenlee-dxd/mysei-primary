'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/store/session'

export default function SurveyIntroStep3() {
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

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 gap-8 sm:gap-10 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 max-w-[720px] w-full">
          <div className="relative w-32 h-32 sm:w-[200px] sm:h-[200px] shrink-0">
            <Image src="/assets/survey-intro-succulent-char.png" alt="MySEI character" fill className="object-contain" />
          </div>
          <div
            className="relative bg-[#f2eff3] rounded-3xl px-5 sm:px-6 py-4 sm:py-5 flex-1 text-center sm:text-left"
            style={{ opacity: 0, animation: 'optionFadeIn 0.5s ease-out 300ms both' }}
          >
            <div className="hidden sm:block absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-[#f2eff3]" />
            <p className="font-semibold text-[#211f26] text-base sm:text-lg mb-1">You&apos;re always learning and changing</p>
            <p className="text-base sm:text-lg text-[#65636d] leading-relaxed">
              Answer honestly and think about your experiences at home, in school, and in your community.
            </p>
          </div>
        </div>

        <Link
          href="/survey/1"
          style={{ opacity: 0, animation: 'optionFadeIn 0.5s ease-out 750ms both' }}
          className="h-12 px-16 rounded-full bg-[#171717] text-white font-semibold text-base flex items-center justify-center hover:bg-[#383838] transition-colors w-full sm:w-[250px]"
        >
          Let&apos;s begin!
        </Link>
      </main>
    </div>
  )
}
