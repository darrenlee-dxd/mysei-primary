'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/store/session'

export default function SurveyComplete() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()
  const confettiFired = useRef(false)

  useEffect(() => {
    if (!userName) { router.replace('/'); return }
  }, [userName, router])

  useEffect(() => {
    if (confettiFired.current) return
    confettiFired.current = true
    import('canvas-confetti').then((mod) => {
      const confetti = mod.default
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#60a5fa', '#34d399', '#fbbf24', '#f87171'],
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="h-[71px] border-b border-gray-200 flex items-center px-8">
        <span className="text-2xl font-bold text-[#3e63dd]">MySEI</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Survey completed!</h1>

        <div className="bg-gray-100 rounded-2xl px-8 py-6 max-w-sm">
          <p className="font-semibold text-gray-800 mb-2">Great job!</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            You're growing with every step. It's okay if you're still figuring things out. I am too! 🌱
          </p>
        </div>

        <div className="relative w-48 h-48">
          <Image
            src="/assets/narrative-char3.png"
            alt="Celebration character"
            fill
            className="object-contain"
          />
        </div>

        <Link
          href="/narrative"
          className="px-8 py-3 rounded-full bg-[#171717] text-white font-medium text-base hover:bg-[#383838] transition-colors"
        >
          See your insights
        </Link>
      </main>
    </div>
  )
}
