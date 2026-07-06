import type { PrimaryLevel } from './students'

export interface SurveyQuestion {
  id: number
  text: string
  tooltip: string
  bg: string
}

export interface SurveyTip {
  header: string
  examples: string[]
}

// Primary 4 copy (current/default) — Middle Primary content, from "MySEI_MP
// survey items" (14 Apr 2026). Primary 5 uses the same copy as Primary 4.
const SURVEY_QUESTIONS_P4: SurveyQuestion[] = [
  {
    id: 1,
    text: 'I can name the feelings that I experience.',
    tooltip:
      'Naming your feelings means being able to say what emotion you are experiencing, like happy, sad, angry, or excited.',
    bg: '/assets/survey-bg-q1.jpg',
  },
  {
    id: 2,
    text: 'I know what causes me to have comfortable or uncomfortable feelings.',
    tooltip:
      'Comfortable feelings (like happy or excited) feel good, while uncomfortable feelings (like sad, angry, or scared) feel unpleasant. Knowing what causes them helps you understand yourself better.',
    bg: '/assets/survey-bg-q2.jpg',
  },
  {
    id: 3,
    text: 'I know ways to manage my feelings.',
    tooltip:
      'Managing your feelings means finding ways to calm yourself down or express yourself — like talking to someone, counting to ten, or taking a short break.',
    bg: '/assets/survey-bg-q3.jpg',
  },
  {
    id: 4,
    text: 'I manage my uncomfortable feelings using ways that are helpful for everyone involved.',
    tooltip:
      '"Everyone involved" includes yourself and the people around you. This means managing your feelings in ways that don\'t hurt yourself or others.',
    bg: '/assets/survey-bg-q4.jpg',
  },
  {
    id: 5,
    text: 'When I face problems, I know who I can ask for help.',
    tooltip:
      'Knowing who to turn to — like family members, teachers, or school counsellors — when you face a problem is an important skill.',
    bg: '/assets/survey-bg-q5.jpg',
  },
  {
    id: 6,
    text: 'When I face problems, I know when to ask for help.',
    tooltip:
      'Recognising the right moment to ask for help means noticing when a problem needs support, instead of waiting too long.',
    bg: '/assets/survey-bg-q6.jpg',
  },
  {
    id: 7,
    text: 'When I face problems, I know how to ask for help.',
    tooltip:
      'Knowing how to ask for help means being able to clearly explain what you\'re going through and what kind of support you need.',
    bg: '/assets/survey-bg-q1.jpg',
  },
]

const SURVEY_TIPS_P4: SurveyTip[] = [
  {
    header: 'Some examples:',
    examples: [
      'When I cannot stop smiling, I know I am happy.',
      'When my heart beats fast and I feel like shouting, I know I am angry.',
      'When my body feels full of energy, I know I am excited.',
      'When my heart feels heavy and I feel like crying, I know I am sad.',
    ],
  },
  {
    header: 'Some examples:',
    examples: [
      'I feel happy when I win a game.',
      'I am excited about going to the adventure park with my family.',
      'I am angry that my friend took my things without asking first.',
      'I had a nightmare, and I woke up feeling scared.',
      'I am sad that my team lost the game.',
    ],
  },
  {
    header: 'Some examples:',
    examples: [
      'When I am excited about a school learning journey, I talk to my family to express my feelings.',
      'When I am angry because someone took my things without asking first, I count to ten to help myself calm down.',
      'When I feel frustrated doing my homework, I take a short break before I continue.',
    ],
  },
  {
    header: 'Some examples of "ways that are helpful for everyone involved":',
    examples: [
      'I feel angry when my friend takes my things without asking, but I calmly tell him to ask before borrowing.',
      'I am scared that my parents will be angry with me for my mistakes, so I talk to them and apologise.',
      'I am sad that my team lost, so I talk to my teacher. This helps me feel better and prevents her from worrying.',
    ],
  },
  {
    header: 'Some examples:',
    examples: [
      'Some examples of problems: feeling unwell, trouble with schoolwork, feeling left out by friends, or disagreement with friends.',
      'Some examples of who I can ask for help: family members, teachers, or school counsellors.',
    ],
  },
  {
    header: 'Some examples of "when to ask for help":',
    examples: [
      'When I am not feeling well, I immediately inform my family.',
      'If I still cannot do my schoolwork after trying a few times, I know it is time to ask for help.',
      'When I feel left out by my friends for a few weeks and do not know what to do, I know it is time to talk to my teachers.',
    ],
  },
  {
    header: 'Some examples of "how to ask for help":',
    examples: [
      'My friend said something hurtful to me, so I ask for help from my parents by saying, "I am upset about what my friend said. Can we talk about it?"',
      'I fell and injured myself, so I go to a teacher and say, "I\'ve hurt my knee. Please help me."',
      'My friend left me out, so I tell my Form Teacher, "I feel hurt because I am being left out. Can we talk about it?"',
    ],
  },
]

// Primary 6 copy — from "Upper Primary survey items for Big Scale test" (14 Apr 2026).
const SURVEY_QUESTIONS_P6: SurveyQuestion[] = [
  {
    id: 1,
    text: 'I know how to manage when I feel stressed.',
    tooltip:
      'Managing stress means finding ways to calm yourself down when things feel overwhelming — like taking deep breaths, talking to someone, or doing something you enjoy.',
    bg: '/assets/survey-bg-q1.jpg',
  },
  {
    id: 2,
    text: 'I know helpful ways to manage my feelings in different situations.',
    tooltip:
      'Different situations call for different ways of handling our feelings. For example, when you feel angry at school you might take a walk, but at home you might talk to a parent.',
    bg: '/assets/survey-bg-q2.jpg',
  },
  {
    id: 3,
    text: 'I can describe how I feel when I experience different feelings at the same time.',
    tooltip:
      'Sometimes we feel more than one emotion at once — like being excited AND nervous before a performance. Being able to name both feelings helps you understand yourself better.',
    bg: '/assets/survey-bg-q3.jpg',
  },
  {
    id: 4,
    text: 'When I face difficult situations, I know who I can ask for help.',
    tooltip:
      'Knowing who to turn to — a friend, teacher, or family member — when things get hard is an important skill. It means you have a support network around you.',
    bg: '/assets/survey-bg-q4.jpg',
  },
  {
    id: 5,
    text: 'When I face difficult situations, I know when I can ask for help.',
    tooltip:
      'Recognising the right moment to reach out for help — before things get too overwhelming — is a sign of self-awareness. You don\'t have to wait until you\'re completely stuck.',
    bg: '/assets/survey-bg-q5.jpg',
  },
  {
    id: 6,
    text: 'When I face difficult situations, I know how to ask for help.',
    tooltip:
      'Knowing how to ask for help means being able to clearly explain what you\'re going through and what kind of support you need — whether that\'s advice, a listening ear, or practical help.',
    bg: '/assets/survey-bg-q6.jpg',
  },
]

const SURVEY_TIPS_P6: SurveyTip[] = [
  {
    header: 'Some examples:',
    examples: [
      'I make a to-do list to organise my tasks.',
      'I talk to a trusted adult about things that worry me.',
      'I practise deep breathing exercises to help me calm down.',
      'I take short breaks between study sessions.',
    ],
  },
  {
    header: 'Some examples of "how to manage my feelings":',
    examples: [
      'I take deep breaths to calm myself down when I am feeling nervous before a test.',
      'I count to ten before responding to avoid saying something I may regret when I am upset with someone.',
      'I stay calm and focus on my lesson now when I am excited about the inter-class games later.',
    ],
  },
  {
    header: 'Some examples:',
    examples: [
      'I am excited about joining in a new class, but I also feel nervous about having to make new friends.',
      'I feel honoured to represent my class for an inter-class competition but also feel pressured to perform well.',
      'When my best friend moves to another school, I feel sad about him leaving but also happy for his new adventure.',
    ],
  },
  {
    header: 'Some examples of "who I ask for help":',
    examples: [
      'When I feel unwell at home, I can ask someone at home for help.',
      'When I cannot do my schoolwork, I can ask my teachers for help.',
      'When I feel left out by my friends, I can talk to the school counsellor to feel better.',
      'When I have disagreement with my classmates, I can talk to my friends about it.',
    ],
  },
  {
    header: 'Some examples of "when I ask for help":',
    examples: [
      'When I am struggling to understand a new topic and it makes me want to give up, I know it is time for me to ask for help.',
      'When I am experiencing some friendship problems and my friends refused to listen to me, I know it is time for me to seek help.',
      'When I am feeling anxious about an upcoming competition and I cannot sleep, I know it is time to talk to someone.',
    ],
  },
  {
    header: 'Some examples of "how to ask for help":',
    examples: [
      'When my friend said something hurtful to me, I tell a trusted adult, "I am upset about what my friend said. Can we talk about it?"',
      'When I fall and injure myself, I go to a teacher and say, "I\'ve hurt my knee. Please help me."',
      'When my friend leaves me out, I tell my Form Teacher, "I feel hurt because I am being left out. Can we talk about it?"',
      'When I see a scary image on the computer, I tell my family members, "I saw something that scared me online. Can you look at it with me?"',
    ],
  },
]

export const SURVEY_QUESTIONS_BY_LEVEL: Record<PrimaryLevel, SurveyQuestion[]> = {
  P4: SURVEY_QUESTIONS_P4,
  P5: SURVEY_QUESTIONS_P4,
  P6: SURVEY_QUESTIONS_P6,
}

export const SURVEY_TIPS_BY_LEVEL: Record<PrimaryLevel, SurveyTip[]> = {
  P4: SURVEY_TIPS_P4,
  P5: SURVEY_TIPS_P4,
  P6: SURVEY_TIPS_P6,
}

// Used where the question count/steps are needed independent of level
// (all levels currently share the same number of questions).
export const SURVEY_QUESTIONS = SURVEY_QUESTIONS_P4

export const ANSWER_OPTIONS = [
  'Not much like me',
  'Sometimes like me',
  'Often like me',
  'A lot like me',
]
