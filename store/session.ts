import { create } from 'zustand'
import type { PrimaryLevel } from '@/data/students'

interface SessionState {
  userName: string
  studentLevel: PrimaryLevel
  answers: Record<number, string>
  emotionRegulationCompletedAt: number | null
  setStudent: (name: string, level: PrimaryLevel) => void
  setAnswer: (questionIndex: number, answer: string) => void
  completeEmotionRegulationSurvey: () => void
  reset: () => void
}

export const useSession = create<SessionState>((set) => ({
  userName: '',
  studentLevel: 'P4',
  answers: {},
  emotionRegulationCompletedAt: null,
  setStudent: (name, level) => set({ userName: name, studentLevel: level }),
  setAnswer: (questionIndex, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionIndex]: answer } })),
  completeEmotionRegulationSurvey: () => set({ emotionRegulationCompletedAt: Date.now() }),
  reset: () => set({ userName: '', studentLevel: 'P4', answers: {}, emotionRegulationCompletedAt: null }),
}))
