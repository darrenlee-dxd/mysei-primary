export const SKILLS = [
  {
    id: 'emotion-regulation',
    name: 'Emotion regulation',
    description: 'Recognise, express, and regulate your emotions appropriately.',
    icon: '/assets/skill-er.png',
    results: [
      { date: '5 Nov 2027', status: 'Starting out' },
      { date: '9 Jan 2026', status: 'Starting out' },
    ],
  },
  {
    id: 'positivity',
    name: 'Positivity',
    description: 'Be grateful for what we have, stay hopeful, and try to see the bright side of things.',
    icon: '/assets/skill-sun.png',
    results: [
      { date: '9 Nov 2027', status: 'Making progress' },
      { date: '14 Nov 2026', status: 'Making progress' },
    ],
  },
  {
    id: 'self-control',
    name: 'Self-control',
    description: 'Control our actions to avoid excessive, addictive, or inappropriate behaviour.',
    icon: '/assets/skill-gauge.png',
    results: [
      { date: '9 Nov 2027', status: 'Getting there' },
      { date: '24 Jan 2026', status: 'Making progress' },
    ],
  },
  {
    id: 'self-motivation',
    name: 'Self-motivation',
    description: 'Believe in yourself and your abilities and strive to improve yourself to achieve your goals and potential.',
    icon: '/assets/skill-ladder.png',
    results: [
      { date: '9 Oct 2027', status: 'Starting out' },
    ],
  },
]

export const STATUS_COLORS: Record<string, string> = {
  'Starting out': 'bg-blue-100 text-blue-700',
  'Making progress': 'bg-yellow-100 text-yellow-700',
  'Getting there': 'bg-green-100 text-green-700',
}
