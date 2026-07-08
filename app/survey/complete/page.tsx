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

    try {
      const ctx = new AudioContext()
      const melody = [
        { freq: 523.25, t: 0.0 },
        { freq: 659.25, t: 0.15 },
        { freq: 783.99, t: 0.3 },
        { freq: 1046.5, t: 0.45 },
        { freq: 783.99, t: 0.6 },
        { freq: 1046.5, t: 0.75 },
      ]
      melody.forEach(({ freq, t }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const start = ctx.currentTime + t
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.15, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55)
        osc.start(start)
        osc.stop(start + 0.55)
      })
    } catch {}

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
      <header className="h-[60px] sm:h-[71px] border-b border-gray-200 flex items-center px-4 sm:px-8">
        <span className="text-lg sm:text-2xl font-bold text-[#3e63dd]">MySEI</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 py-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Survey completed!</h1>

        <div className="bg-gray-100 rounded-2xl px-6 sm:px-8 py-5 sm:py-6 max-w-sm">
          <p className="font-semibold text-gray-800 text-base sm:text-lg mb-2">Great job!</p>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            You're growing with every step. It's okay if you're still figuring things out. I am too! 🌱
          </p>
        </div>

        <div className="relative w-56 h-[190px] sm:w-72 sm:h-[250px]">
          <Image
            src="/assets/complete-char-v2.png"
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
