'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { SURVEY_QUESTIONS, SURVEY_QUESTIONS_BY_LEVEL, SURVEY_TIPS_BY_LEVEL, ANSWER_OPTIONS } from '@/data/survey'
import { useSession } from '@/store/session'

export default function SurveyQuestion({ params }: { params: Promise<{ step: string }> }) {
  const { step } = use(params)
  const stepNum = parseInt(step, 10)
  const router = useRouter()
  const userName = useSession((s) => s.userName)
  const studentLevel = useSession((s) => s.studentLevel)
  const answers = useSession((s) => s.answers)
  const setAnswer = useSession((s) => s.setAnswer)
  const [selected, setSelected] = useState<string | null>(null)
  const [showSheet, setShowSheet] = useState(false)
  const [sheetClosing, setSheetClosing] = useState(false)

  const closeSheet = () => {
    setSheetClosing(true)
    setTimeout(() => { setShowSheet(false); setSheetClosing(false) }, 320)
  }
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [playingExample, setPlayingExample] = useState<string | null>(null)
  const [questionVisible, setQuestionVisible] = useState(false)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)

  const questions = SURVEY_QUESTIONS_BY_LEVEL[studentLevel] ?? SURVEY_QUESTIONS
  const TIPS = SURVEY_TIPS_BY_LEVEL[studentLevel]
  const question = questions[stepNum - 1]

  useEffect(() => {
    if (!userName) { router.replace('/'); return }
    if (!question) { router.replace('/dashboard'); return }
    setSelected(answers[stepNum] ?? null)
  }, [stepNum, userName, router, question, answers])

  useEffect(() => {
    if (!question) return
    setQuestionVisible(false)
    const t = setTimeout(() => setQuestionVisible(true), 80)
    return () => clearTimeout(t)
  }, [stepNum, question])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleSelect = (option: string) => {
    setSelected(option)
    setAnswer(stepNum, option)
  }

  const playChime = () => {
    try {
      const ctx = new AudioContext()
      const notes = [523.25, 659.25]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const start = ctx.currentTime + i * 0.12
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.18, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5)
        osc.start(start)
        osc.stop(start + 0.5)
      })
    } catch {}
  }

  const handleNext = () => {
    if (!selected) return
    playChime()
    if (stepNum < questions.length) {
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
        <header className="relative z-10 h-[60px] sm:h-[71px] bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-8 gap-2 shrink-0">
          <span className="text-lg sm:text-2xl font-bold text-[#3e63dd] shrink-0">MySEI</span>
          <span className="hidden sm:inline text-sm font-medium text-gray-700 truncate">
            Emotional Regulation: Question {stepNum} of {questions.length}
          </span>
          <span className="sm:hidden text-xs font-medium text-gray-700 shrink-0">
            {stepNum}/{questions.length}
          </span>
          <button
            onClick={() => setShowLeaveDialog(true)}
            className="text-xs sm:text-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-gray-300 bg-white/10 text-gray-700 hover:bg-gray-50 transition-colors shrink-0"
          >
            Exit
          </button>
        </header>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 sm:gap-10 px-4 py-6 sm:py-8">
          {/* Progress bar */}
          <div className="flex gap-2 w-[780px] max-w-full">
            {questions.map((_, i) => {
              const idx = i + 1
              const isPast = idx < stepNum
              const isActive = idx === stepNum
              return (
                <div
                  key={i}
                  className="flex-1 h-3 rounded-full shadow-md overflow-hidden"
                  style={{ backgroundColor: '#f2eff3' }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? '#2563eb' : isPast ? '#60a5fa' : 'transparent',
                      width: isActive || isPast ? '100%' : '0%',
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease',
                      transitionDelay: isActive ? `${i * 40}ms` : '0ms',
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Question + answers */}
          <div className="flex flex-col gap-6 sm:gap-8 w-[600px] max-w-full">
            {/* Question card */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={handleSpeak}
                    aria-label="Read question aloud"
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSpeaking ? 'bg-blue-500' : 'bg-blue-200 hover:bg-blue-300'}`}
                  >
                    {isSpeaking ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>
                  <p
                    className="text-base sm:text-xl font-semibold text-[#211f26] leading-snug"
                    style={{
                      opacity: questionVisible ? 1 : 0,
                      transform: questionVisible ? 'translateX(0)' : 'translateX(-16px)',
                      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                  >
                    {question.text}
                  </p>
                </div>
                <button
                  onClick={() => setShowSheet(true)}
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
            <div key={stepNum} className="flex flex-col gap-4">
              {ANSWER_OPTIONS.map((option, idx) => {
                const isSelected = selected === option
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    style={questionVisible ? {
                      animation: `optionFadeIn 0.3s ease-out ${300 + idx * 350}ms both`,
                    } : { opacity: 0, pointerEvents: 'none' }}
                    className={`w-full rounded-xl border px-4 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-medium flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'border-[#e5e5e5] bg-[#dbeafe] text-[#2563eb]'
                        : 'bg-white border-gray-200 text-[#404040] hover:border-blue-300'
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
          <div className="max-w-[1168px] mx-auto px-4 py-4 sm:py-5 flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              className={`flex-1 sm:flex-none px-6 sm:px-16 py-2.5 sm:py-3 rounded-full border border-gray-300 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors ${stepNum === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="flex-1 sm:flex-none px-6 sm:px-16 py-2.5 sm:py-3 rounded-full bg-[#2563eb] text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      {showSheet && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          onClick={closeSheet}
          style={{
            backgroundColor: sheetClosing ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.4)',
            transition: 'background-color 0.32s ease',
          }}
        >
          <div
            className="bg-white rounded-t-3xl shadow-xl w-full max-h-[60vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: sheetClosing
                ? 'sheetSlideDown 0.32s cubic-bezier(0.4,0,1,1) forwards'
                : 'sheetSlideUp 0.35s cubic-bezier(0.2,0,0,1) forwards',
            }}
          >
            {/* Handle + close */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <div />
              <button
                onClick={closeSheet}
                className="ml-auto w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto min-h-0 flex-1 px-6 pb-6 flex flex-col gap-6 items-center">
              <div className="w-full max-w-[600px] flex flex-col gap-6">
                {TIPS[stepNum - 1].map((section, sectionIdx) => (
                  <div key={sectionIdx} className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💭</span>
                      <h3 className="text-lg font-semibold text-[#5151cd]">{section.header}</h3>
                    </div>

                    {/* Examples list */}
                    <ul className="flex flex-col gap-4">
                      {section.examples.map((example, i) => {
                        const exampleKey = `${sectionIdx}-${i}`
                        return (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1 w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                          <p className="flex-1 text-base text-[#211f26] leading-6">{example}</p>
                          <button
                            onClick={() => {
                              window.speechSynthesis.cancel()
                              if (playingExample === exampleKey) {
                                setPlayingExample(null)
                              } else {
                                setPlayingExample(exampleKey)
                                const utt = new SpeechSynthesisUtterance(example)
                                utt.onend = () => setPlayingExample(null)
                                window.speechSynthesis.speak(utt)
                              }
                            }}
                            className="shrink-0 w-7 h-7 rounded-full bg-[#bfdbfe] flex items-center justify-center hover:bg-blue-300 transition-colors"
                            aria-label={playingExample === exampleKey ? 'Stop' : 'Read aloud'}
                          >
                            {playingExample === exampleKey ? (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="#1e40af">
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                              </svg>
                            )}
                          </button>
                        </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-8 pt-2 shrink-0 flex justify-center">
              <button
                onClick={closeSheet}
                className="w-full max-w-[600px] py-3 rounded-full bg-[#171717] text-white font-medium text-base hover:bg-[#383838] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave survey warning dialog */}
      {showLeaveDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowLeaveDialog(false)}
          style={{ animation: 'dialogOverlayIn 0.2s ease-out both' }}
        >
          <div
            className="bg-white border border-[#e5e5e5] rounded-[10px] shadow-xl w-full max-w-[400px] flex flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'dialogPopIn 0.25s cubic-bezier(0.2,0,0,1) both' }}
          >
            {/* Header */}
            <div className="flex justify-end p-4 w-full">
              <button
                onClick={() => setShowLeaveDialog(false)}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2.5 items-center px-6 pb-2">
              <div className="bg-orange-200 rounded-full p-3 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" /><path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#211f26] text-center">
                You&apos;re halfway there!
              </h3>
              <p className="text-lg text-[#65636d] text-center leading-[27px]">
                If you leave now, you&apos;ll lose your progress so far.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-2 items-center justify-end w-full p-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 min-h-[40px] px-6 py-2.5 rounded-full bg-[#dc2626] text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Leave for now
              </button>
              <button
                onClick={() => setShowLeaveDialog(false)}
                className="flex-1 min-h-[40px] px-6 py-2.5 rounded-full border border-[#d4d4d4] bg-white text-[#0a0a0a] text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Keep going
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
