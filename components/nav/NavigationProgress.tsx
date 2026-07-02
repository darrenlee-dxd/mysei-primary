'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname === prevPathname.current) return
    prevPathname.current = pathname

    setWidth(0)
    setVisible(true)

    let current = 0
    const animate = () => {
      current = current < 70 ? current + 1.2 : current < 90 ? current + 0.3 : current
      setWidth(current)
      if (current < 90) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    timerRef.current = setTimeout(() => {
      setWidth(100)
      setTimeout(() => setVisible(false), 400)
    }, 600)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '3px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: 'linear-gradient(90deg, #3e63dd, #60a5fa, #3e63dd)',
          backgroundSize: '200% 100%',
          transition: width === 100 ? 'width 0.3s ease-out, opacity 0.4s ease' : 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: width === 100 ? 0 : 1,
          animation: 'shimmer 1.8s ease-in-out infinite',
          borderRadius: '0 2px 2px 0',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
