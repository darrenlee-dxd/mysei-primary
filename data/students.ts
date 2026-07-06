export type PrimaryLevel = 'P4' | 'P5' | 'P6'

export interface Student {
  id: string
  name: string
  level: PrimaryLevel
  levelLabel: string
}

export const STUDENTS: Student[] = [
  { id: 'amy-lee-xi-qi', name: 'Amy Lee Xi Qi', level: 'P4', levelLabel: 'Primary 4' },
  { id: 'luke-tan-qing-rong', name: 'Luke Tan Qing Rong', level: 'P5', levelLabel: 'Primary 5' },
  { id: 'muhammad-abdul-halim', name: 'Muhammad Abdul Halim', level: 'P6', levelLabel: 'Primary 6' },
]
