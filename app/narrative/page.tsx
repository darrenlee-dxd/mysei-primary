'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav/NavBar'
import { useSession } from '@/store/session'

export default function NarrativePage() {
  const userName = useSession((s) => s.userName)
  const router = useRouter()

  useEffect(() => {
    if (!userName) router.replace('/')
  }, [userName, router])

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <main className="max-w-[1128px] mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/profile" className="hover:underline">Strengths and Growth Areas</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">Emotion regulation</span>
        </nav>
        <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-8">
          ← Back
        </Link>

        {/* Hero section */}
        <div className="flex flex-col items-center gap-6 text-center mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 max-w-lg leading-snug">
            You have just completed a survey about your<br />
            <span className="text-[#2563eb]">Emotion Regulation</span> skill
          </h1>

          <div className="relative w-40 h-40">
            <Image src="/assets/narrative-cactus.png" alt="Character" fill className="object-contain" />
          </div>

          <span className="px-5 py-2 bg-[#dbeafe] text-[#1e40af] rounded-full text-sm font-medium">
            Starting out
          </span>

          <p className="text-base text-gray-700 max-w-xl leading-relaxed">
            From your responses, you are{' '}
            <strong>learning how to manage your feelings.</strong>
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 max-w-xl w-full flex items-start gap-4 text-left">
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Emotion Regulation</strong> is about understanding and managing your feelings.
                When you can manage your feelings, you stay in control of what you say and do
                even when the situation is difficult.
              </p>
            </div>
            <div className="relative w-16 h-16 shrink-0">
              <Image src="/assets/skill-er.png" alt="Emotion Regulation" fill className="object-contain" />
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-12" />

        {/* Growth tips */}
        <div className="flex flex-col gap-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            How can you grow in this skill?
          </h2>

          <GrowthTip
            tip="Be aware of how your body feels when you are happy, sad, or angry — this can help you name your feelings."
            speechBubble="Smile and laugh, dance to music, heartbeat faster, shout at others."
            character="/assets/narrative-char2.png"
            bg="bg-[#fef9c3]"
          />

          <GrowthTip
            tip="Talk to a trusted adult, like a parent or teacher, when you feel unsure about your feelings."
            speechBubble="Tell your parents what you are going through."
            character="/assets/narrative-char4.png"
            bg="bg-[#dbeafe]"
            reverse
          />
        </div>

        {/* Find more strategies */}
        <div className="bg-gray-50 rounded-2xl p-6 flex items-center gap-6 mb-12">
          <div className="relative w-20 h-20 shrink-0">
            <Image src="/assets/skill-er.png" alt="target" fill className="object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Find more strategies that fit you</h3>
          </div>
          <a
            href="#"
            className="px-5 py-2.5 rounded-full bg-[#2563eb] text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            See more strategies ↗
          </a>
        </div>

        <hr className="border-gray-100 mb-12" />

        {/* Next up */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Next up for you</h2>
          <div className="grid grid-cols-2 gap-4">
            <NextSurveyCard
              title="Emotion regulation"
              description="Recognise, express, and regulate your emotions appropriately"
              image="/assets/survey-card-er.png"
              href="/survey/intro"
            />
            <NextSurveyCard
              title="Self-control"
              description="Control your actions to avoid excessive, addictive or other inappropriate behaviours"
              image="/assets/survey-card-sc.png"
              href="/survey/intro"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function GrowthTip({
  tip, speechBubble, character, bg, reverse,
}: {
  tip: string
  speechBubble: string
  character: string
  bg: string
  reverse?: boolean
}) {
  return (
    <div className={`${bg} rounded-2xl p-6`}>
      <div className={`flex items-center gap-6 ${reverse ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-lg">💡</span>
            <p className="text-base text-gray-700 leading-relaxed">{tip}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white rounded-2xl px-4 py-3 text-sm text-gray-600 max-w-[180px] shadow-sm">
            {speechBubble}
          </div>
          <div className="relative w-24 h-24">
            <Image src={character} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

function NextSurveyCard({
  title, description, image, href,
}: {
  title: string
  description: string
  image: string
  href: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 flex justify-between items-center gap-4 bg-white">
      <div className="flex flex-col gap-3 flex-1">
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <span>📋</span> 6 items
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#171717] text-white text-sm font-medium w-fit hover:bg-[#383838] transition-colors"
        >
          Start survey
        </Link>
      </div>
      <div className="relative w-24 h-24 shrink-0">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
    </div>
  )
}
