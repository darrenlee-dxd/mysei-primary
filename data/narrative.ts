import type { PrimaryLevel } from './students'

export interface NarrativeTip {
  text: string
  bubble: string
}

export interface NarrativeContent {
  statusBlurb: string
  summaryDescription: string
  tip1: NarrativeTip
  tip2: NarrativeTip
  tip3?: NarrativeTip
}

// Middle Primary copy (current/default), used for Primary 4. Primary 5 uses
// the same copy as Primary 4.
const EMOTION_REGULATION_NARRATIVE_P4: NarrativeContent = {
  statusBlurb: 'learning how to manage your feelings.',
  summaryDescription:
    'is about understanding and managing your feelings. When you can manage your feelings, you stay in control of what you say and do even when the situation is difficult.',
  tip1: {
    text: 'Be aware of how your body feels when you are happy, sad, or angry — this can help you name your feelings.',
    bubble: 'Smile and laugh, dance to music, heartbeat faster, shout at others.',
  },
  tip2: {
    text: 'Talk to a trusted adult, like a parent or teacher, when you feel unsure about your feelings.',
    bubble: 'Tell your parents what you are going through.',
  },
}

// Upper Primary copy — "Starting out" band, from "Draft ER narratives" (8 Jun 2026).
const EMOTION_REGULATION_NARRATIVE_P6: NarrativeContent = {
  statusBlurb: 'learning how to manage your feelings.',
  summaryDescription:
    'is about understanding and managing your feelings. When you can manage your feelings, you stay in control of what you say and do even when the situation is difficult.',
  tip1: {
    text: 'Notice what makes you feel stressed.',
    bubble: 'Know what causes your body to feel tense, get headaches, or act differently than usual — like being unable to sleep.',
  },
  tip2: {
    text: 'Try one simple way to calm yourself.',
    bubble: 'Take deep breaths, do physical activities, or have a rest.',
  },
  tip3: {
    text: 'Talk to one person you feel comfortable asking for help, like a parent or teacher.',
    bubble: 'Tell your parents what you are going through.',
  },
}

export const EMOTION_REGULATION_NARRATIVE_BY_LEVEL: Record<PrimaryLevel, NarrativeContent> = {
  P4: EMOTION_REGULATION_NARRATIVE_P4,
  P5: EMOTION_REGULATION_NARRATIVE_P4,
  P6: EMOTION_REGULATION_NARRATIVE_P6,
}
