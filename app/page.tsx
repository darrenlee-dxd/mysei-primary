'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from '@/store/session'
import { STUDENTS } from '@/data/students'

export default function LoginPage() {
  const [studentId, setStudentId] = useState(STUDENTS[0].id)
  const setStudent = useSession((s) => s.setStudent)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const student = STUDENTS.find((s) => s.id === studentId)
    if (!student) return
    setStudent(student.name, student.level)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="md:w-1/2 bg-[#eff6ff] flex flex-col items-center justify-center px-6 sm:px-12 py-10 sm:py-16 gap-6 sm:gap-8">
        <div className="relative w-full max-w-[280px] sm:max-w-[420px] aspect-[4/3]">
          <Image
            src="/assets/login-mascot.png"
            alt="MySEI characters"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1f2d5c]">
            Welcome to{' '}
            <span className="text-[#3e63dd]">MySEI</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-[#404040]">
            Your space to explore your social-emotional skills
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="md:w-1/2 flex items-center justify-center px-4 sm:px-12 py-10 sm:py-0">
        <div className="bg-[#edf2fe] rounded-3xl p-6 sm:p-10 w-full max-w-[420px] flex flex-col gap-6 sm:gap-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#211f26] tracking-tight">
            Log in to MySEI
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#65636d]">
                Select a student profile
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                >
                  {STUDENTS.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.levelLabel})
                    </option>
                  ))}
                </select>
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
                Login
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
