import { SURVEY_QUESTIONS } from '@/data/survey'

// Enumerate the survey steps so `output: 'export'` can prerender each
// /survey/[step] page as static HTML. The page itself is a client component.
export function generateStaticParams() {
  return SURVEY_QUESTIONS.map((_, i) => ({ step: String(i + 1) }))
}

export default function SurveyStepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
