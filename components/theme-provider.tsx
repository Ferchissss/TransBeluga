'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    // Detectar preferencia del sistema
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    // Usar tema guardado o el del sistema
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || systemTheme
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return children

  return (
    <>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            }
          `,
        }}
      />
    </>
  )
}

export function useTheme() {
  return {
    toggleTheme: () => {
      const html = document.documentElement
      const isDark = html.classList.contains('dark')
      if (isDark) {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      } else {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
      window.dispatchEvent(new Event('themechange'))
    },
  }
}
