import type { PrimaryLevel } from '@/data/students'
import { ANSWER_OPTIONS, SURVEY_QUESTIONS_BY_LEVEL } from '@/data/survey'
import type { SkillBand } from '@/data/narrative'

// Score bands from "Draft ER narratives" (8 Jun 2026). Middle Primary (P4/P5)
// has 7 questions worth 1-4 points each; Upper Primary (P6) has 6.
const EMOTION_REGULATION_BANDS: Record<'middle' | 'upper', { max: number; band: SkillBand }[]> = {
  middle: [
    { max: 11, band: 'Starting out' },
    { max: 17, band: 'Making progress' },
    { max: 23, band: 'Getting there' },
    { max: Infinity, band: 'Doing well' },
  ],
  upper: [
    { max: 9, band: 'Starting out' },
    { max: 14, band: 'Making progress' },
    { max: 19, band: 'Getting there' },
    { max: Infinity, band: 'Doing well' },
  ],
}

function tierForLevel(level: PrimaryLevel): 'middle' | 'upper' {
  return level === 'P6' ? 'upper' : 'middle'
}

export function computeEmotionRegulationScore(
  answers: Record<number, string>,
  level: PrimaryLevel
): number {
  const questions = SURVEY_QUESTIONS_BY_LEVEL[level]
  return questions.reduce((total, question) => {
    const points = ANSWER_OPTIONS.indexOf(answers[question.id]) + 1
    return total + Math.max(points, 0)
  }, 0)
}

export function getEmotionRegulationBand(score: number, level: PrimaryLevel): SkillBand {
  const bands = EMOTION_REGULATION_BANDS[tierForLevel(level)]
  return bands.find((tier) => score <= tier.max)!.band
}
