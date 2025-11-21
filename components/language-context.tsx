'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    setMounted(true)
    const savedLanguage = (localStorage.getItem('language') as Language) || 'es'
    setLanguageState(savedLanguage)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }))
  }

  if (!mounted) return children

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
