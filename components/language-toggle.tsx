'use client'

import { useLanguage } from './language-context'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="px-3 py-2 rounded-lg font-medium text-sm bg-secondary text-secondary-foreground hover:bg-opacity-80 transition-colors duration-200 flex items-center gap-2"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {language === 'es' ? (
        <>
          <span className="text-lg">🇪🇸</span>
          <span className="hidden sm:inline">ES</span>
        </>
      ) : (
        <>
          <span className="text-lg">🇬🇧</span>
          <span className="hidden sm:inline">EN</span>
        </>
      )}
    </button>
  )
}
