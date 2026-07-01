'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from '@/store/session'

export default function LoginPage() {
  const [name, setName] = useState('Amy Lee Xi Qi')
  const setUserName = useSession((s) => s.setUserName)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setUserName(name.trim())
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="w-1/2 bg-[#eff6ff] flex flex-col items-center justify-center px-12 py-16 gap-8">
        <div className="relative w-full max-w-[420px] aspect-[4/3]">
          <Image
            src="/assets/login-mascot.png"
            alt="MySEI characters"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1f2d5c]">
            Welcome to{' '}
            <span className="text-[#3e63dd]">MySEI</span>
          </h1>
          <p className="mt-3 text-lg text-[#404040]">
            Your space to explore your social-emotional skills
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="bg-[#edf2fe] rounded-3xl p-10 w-full max-w-[420px] flex flex-col gap-8">
          <h2 className="text-2xl font-semibold text-[#211f26] tracking-tight">
            Log in to MySEI
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#65636d]">
                Your MIMS email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="<Full_Name>"
                  className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-[#65636d] whitespace-nowrap">
                  @students.edu.sg
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-[#211f26] text-white font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#383838] transition-colors"
              >
                Get login code →
              </button>
              <p className="text-sm text-[#65636d] text-center">
                You'll get a one-time login code in your email
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
