'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from '@geist-ui/icons'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex border border-secondary rounded-full p-0.5 scale-75">
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-full ${theme === 'system' ? 'text-primary' : 'text-muted-foreground'}`}
        aria-label="System theme"
      >
        <Monitor />
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-full ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`}
        aria-label="Light theme"
      >
        <Sun />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-full ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}
        aria-label="Dark theme"
      >
        <Moon />
      </button>
    </div>
  )
}

