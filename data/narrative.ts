import type { PrimaryLevel } from './students'

export type SkillBand = 'Starting out' | 'Making progress' | 'Getting there' | 'Doing well'

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

// Badge background per band, from "Draft ER narratives" (8 Jun 2026).
export const BAND_BADGE_BG: Record<SkillBand, string> = {
  'Starting out': 'bg-[#cffafe]',
  'Making progress': 'bg-[#fef9c3]',
  'Getting there': 'bg-[#dcfce7]',
  'Doing well': 'bg-[#ede9fe]',
}

const SUMMARY_DESCRIPTION =
  'is about understanding and managing your feelings. When you can manage your feelings, you stay in control of what you say and do even when the situation is difficult.'

// Middle Primary copy (P4/P5), from "Draft ER narratives" (8 Jun 2026).
const EMOTION_REGULATION_MIDDLE_PRIMARY: Record<SkillBand, NarrativeContent> = {
  'Starting out': {
    statusBlurb: 'you are learning how to manage your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Be aware of how your body feels when you are happy, sad, or angry — this can help you name your feelings.',
      bubble: 'Smile and laugh, dance to music, heartbeat faster, shout at others.',
    },
    tip2: {
      text: 'Talk to a trusted adult, like a parent or teacher, when you feel unsure about your feelings.',
      bubble: 'Tell your parents what you are going through.',
    },
  },
  'Making progress': {
    statusBlurb: 'you are able to manage your feelings in some ways.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Keep using the ways you know to manage your feelings, especially when you have uncomfortable feelings.',
      bubble: 'Breathing exercise, listen to music, tell yourself it will be okay.',
    },
    tip2: {
      text: 'Think about who you can turn to when you face a problem and try asking for help when you need it.',
      bubble: 'Talk to your parents or teachers.',
    },
  },
  'Getting there': {
    statusBlurb: 'you know how to manage your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Think about the ways you have used to manage your feelings and if they are helpful for everyone involved — not just yourself.',
      bubble: 'Consider if walking away makes things better or worse, think about whether not talking about the problem is helpful.',
    },
    tip2: {
      text: 'Try to use ways that have been helpful for everyone involved in new or difficult situations.',
      bubble: 'Use "I-Messages" to share how you feel when there is disagreement, take a walk to cool down and to think when facing a new and difficult situation.',
    },
  },
  'Doing well': {
    statusBlurb: 'you are doing well in managing your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Continue to look for new ways to manage feelings in different situations.',
      bubble: 'Journal how you feel by drawing/writing, take a short break to do things you like.',
    },
    tip2: {
      text: 'Support your friends by sharing what works for you.',
      bubble: 'Tell a friend how journalling helps you, share how taking a short walk helps you.',
    },
  },
}

// Upper Primary copy (P6), from "Draft ER narratives" (8 Jun 2026).
const EMOTION_REGULATION_UPPER_PRIMARY: Record<SkillBand, NarrativeContent> = {
  'Starting out': {
    statusBlurb: 'you are learning how to manage your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
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
  },
  'Making progress': {
    statusBlurb: 'you are able to manage your feelings in some ways.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Apply ways in managing your feelings in a wider range of situations, including when you experience more than one feeling at the same time.',
      bubble: 'Journal your feelings when you feel both excited and nervous, take deep breaths whether you feel anxious, frustrated or disappointed.',
    },
    tip2: {
      text: 'Practise reaching out for help earlier, before feelings become overwhelming.',
      bubble: 'Talk to your parents when you start to feel stress, tell your friend early when something they said bothered you.',
    },
  },
  'Getting there': {
    statusBlurb: 'you show ability to manage your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Apply ways in managing your feelings in more difficult situations.',
      bubble: 'Take a walk to calm down and reflect after a very disappointing experience, talk to a trusted adult when you feel too upset to handle a situation.',
    },
    tip2: {
      text: 'Reflect on whether the ways you manage your feelings are truly helpful — for yourself and for those around you.',
      bubble: 'Think about whether keeping quiet when upset helped resolve the situation or made things worse, consider if how you reacted during a conflict affected how your friend felt afterwards.',
    },
  },
  'Doing well': {
    statusBlurb: 'you are doing well in managing your feelings.',
    summaryDescription: SUMMARY_DESCRIPTION,
    tip1: {
      text: 'Continue to build on your strengths by staying open to new ways to manage feelings as you encounter more difficult situations.',
      bubble: 'If staying active helps you, try putting energy in new physical activity like frisbee to manage tensions in difficult situations, if you enjoy music, try writing your own lyrics to express and process difficult feelings.',
    },
    tip2: {
      text: 'Consider how you might support peers who are still developing these skills — sharing what works for you can make a difference to others.',
      bubble: 'Share with a friend how you calm yourself down when you feel overwhelmed, share how talking to a trusted adult helped when you were struggling with feelings.',
    },
  },
}

export const EMOTION_REGULATION_NARRATIVE_BY_LEVEL: Record<
  PrimaryLevel,
  Record<SkillBand, NarrativeContent>
> = {
  P4: EMOTION_REGULATION_MIDDLE_PRIMARY,
  P5: EMOTION_REGULATION_MIDDLE_PRIMARY,
  P6: EMOTION_REGULATION_UPPER_PRIMARY,
}
