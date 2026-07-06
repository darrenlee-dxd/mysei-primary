'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from '@/store/session'

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const userName = useSession((s) => s.userName)
  const reset = useSession((s) => s.reset)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleLogout = () => {
    setMenuOpen(false)
    reset()
    router.push('/')
  }

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/surveys', label: 'Surveys' },
    { href: '/profile', label: 'MySEI Profile' },
  ]

  return (
    <nav className="h-[60px] sm:h-[71px] bg-white border-b border-gray-200 flex items-center px-3 sm:px-8 justify-between sticky top-0 z-40 gap-2">
      <div className="flex items-center gap-4 sm:gap-12 min-w-0">
        <span className="text-lg sm:text-2xl font-bold text-[#3e63dd] shrink-0">MySEI</span>

        <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const isActive =
              link.label === 'Home'
                ? pathname === '/dashboard'
                : link.label === 'Surveys'
                ? pathname === '/surveys'
                : link.label === 'MySEI Profile'
                ? pathname === '/profile'
                : false
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs sm:text-sm font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 sm:gap-3 rounded-full hover:bg-gray-50 transition-colors pl-1.5 sm:pl-2 pr-2 sm:pr-3 py-1"
        >
          <span className="hidden sm:inline text-sm font-medium text-gray-700">{userName || 'Amy Lee Xi Qi'}</span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d1fae5] flex items-center justify-center overflow-hidden shrink-0">
            <Image src="/assets/avatar.png" alt="avatar" width={36} height={36} className="object-cover" />
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-400 shrink-0 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50"
            style={{ animation: 'dialogPopIn 0.15s ease-out both' }}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">{userName || 'Amy Lee Xi Qi'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
