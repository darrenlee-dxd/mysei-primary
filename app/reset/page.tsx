'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/store/session'

export default function ResetPage() {
  const reset = useSession((s) => s.reset)
  const router = useRouter()

  useEffect(() => {
    reset()
    router.replace('/')
  }, [reset, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Resetting session…</p>
    </div>
  )
}
