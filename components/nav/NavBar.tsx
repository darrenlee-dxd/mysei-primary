'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession } from '@/store/session'

export function NavBar() {
  const pathname = usePathname()
  const userName = useSession((s) => s.userName)

  const links = [
    { href: '/dashboard', label: 'Home' },
    { href: '/surveys', label: 'Surveys' },
    { href: '/profile', label: 'MySEI Profile' },
  ]

  return (
    <nav className="h-[71px] bg-white border-b border-gray-200 flex items-center px-8 justify-between sticky top-0 z-40">
      <div className="flex items-center gap-12">
      <span className="text-2xl font-bold text-[#3e63dd]">MySEI</span>

      <div className="flex items-center gap-6">
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
              className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
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

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">{userName || 'Amy Lee Xi Qi'}</span>
        <div className="w-9 h-9 rounded-full bg-[#d1fae5] flex items-center justify-center overflow-hidden">
          <Image src="/assets/avatar.png" alt="avatar" width={36} height={36} className="object-cover" />
        </div>
      </div>
    </nav>
  )
}
