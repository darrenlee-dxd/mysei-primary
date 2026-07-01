import { create } from 'zustand'

interface SessionState {
  userName: string
  answers: Record<number, string>
  setUserName: (name: string) => void
  setAnswer: (questionIndex: number, answer: string) => void
  reset: () => void
}

export const useSession = create<SessionState>((set) => ({
  userName: '',
  answers: {},
  setUserName: (name) => set({ userName: name }),
  setAnswer: (questionIndex, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionIndex]: answer } })),
  reset: () => set({ userName: '', answers: {} }),
}))
