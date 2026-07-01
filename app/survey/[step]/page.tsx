'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SURVEY_QUESTIONS, ANSWER_OPTIONS } from '@/data/survey'
import { useSession } from '@/store/session'

export default function SurveyQuestion({ params }: { params: Promise<{ step: string }> }) {
  const { step } = use(params)
  const stepNum = parseInt(step, 10)
  const router = useRouter()
  const userName = useSession((s) => s.userName)
  const answers = useSession((s) => s.answers)
  const setAnswer = useSession((s) => s.setAnswer)
  const [selected, setSelected] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const question = SURVEY_QUESTIONS[stepNum - 1]

  useEffect(() => {
    if (!userName) { router.replace('/'); return }
    if (!question) { router.replace('/dashboard'); return }
    setSelected(answers[stepNum] ?? null)
  }, [stepNum, userName, router, question, answers])

  const handleSelect = (option: string) => {
    setSelected(option)
    setAnswer(stepNum, option)
  }

  const handleNext = () => {
    if (!selected) return
    if (stepNum < SURVEY_QUESTIONS.length) {
      router.push(`/survey/${stepNum + 1}`)
    } else {
      router.push('/survey/complete')
    }
  }

  const handleBack = () => {
    if (stepNum > 1) router.push(`/survey/${stepNum - 1}`)
    else router.push('/survey/intro')
  }

  const handleSpeak = () => {
    if (!question) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const utt = new SpeechSynthesisUtterance(question.text)
    utt.onend = () => setIsSpeaking(false)
    setIsSpeaking(true)
    window.speechSynthesis.speak(utt)
  }

  if (!question) return null

  return (
    <>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={question.bg}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Header nav */}
        <header className="relative z-10 h-[71px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <span className="text-2xl font-bold text-[#3e63dd]">MySEI</span>
          <span className="text-sm font-medium text-gray-700">
            Emotional Regulation: Question {stepNum} of {SURVEY_QUESTIONS.length}
          </span>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm px-6 py-2 rounded-full border border-gray-300 bg-white/10 text-gray-700 hover:bg-gray-50 transition-colors w-[110px]"
          >
            Exit
          </button>
        </header>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10 px-4 py-8">
          {/* Progress bar */}
          <div className="flex gap-2 w-[780px] max-w-full">
            {SURVEY_QUESTIONS.map((_, i) => {
              const idx = i + 1
              const isPast = idx < stepNum
              const isActive = idx === stepNum
              return (
                <div
                  key={i}
                  className="flex-1 h-3 rounded-full shadow-md"
                  style={{
                    backgroundColor: isActive
                      ? '#2563eb'
                      : isPast
                      ? '#60a5fa'
                      : '#f2eff3',
                  }}
                />
              )
            })}
          </div>

          {/* Question + answers */}
          <div className="flex flex-col gap-8 w-[600px] max-w-full">
            {/* Question card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={handleSpeak}
                    aria-label="Read question aloud"
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSpeaking ? 'bg-blue-500' : 'bg-blue-200 hover:bg-blue-300'}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSpeaking ? 'white' : '#1e40af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  </button>
                  <p className="text-xl font-semibold text-[#211f26] leading-snug">
                    {question.text}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="self-start flex items-center gap-2 bg-[#171717] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#383838] transition-colors"
                >
                  What does this mean?
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Answer options */}
            <div className="flex flex-col gap-4">
              {ANSWER_OPTIONS.map((option) => {
                const isSelected = selected === option
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full bg-white rounded-xl border px-6 py-5 text-left text-base font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#2563eb] ring-2 ring-[#2563eb] bg-blue-50 text-[#1e40af]'
                        : 'border-gray-200 text-[#404040] hover:border-blue-300'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                        isSelected ? 'bg-[#2563eb] border-[#2563eb]' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="relative z-10 bg-white border-t border-gray-200 shrink-0">
          <div className="max-w-[1168px] mx-auto px-4 py-5 flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`px-16 py-3 rounded-full border border-gray-300 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors ${stepNum === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-16 py-3 rounded-full bg-[#2563eb] text-white text-base font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">What does this mean?</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{question.tooltip}</p>
            <button
              onClick={() => setShowModal(false)}
              className="self-end px-6 py-2.5 rounded-full bg-[#2563eb] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}
