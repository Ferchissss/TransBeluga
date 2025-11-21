'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false)
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false)
  const pathname = usePathname()

  const transparentHeaderPages = ['/', '/services', '/tracking']
  const isTransparentPage = transparentHeaderPages.includes(pathname)
  const shouldShowSolidHeader = isScrolled || !isTransparentPage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Efecto para cargar Google Translate
  useEffect(() => {
    // Si ya está cargado, no hacer nada
    if (window.google?.translate) {
      setGoogleTranslateLoaded(true)
      return
    }

    // Función global para inicializar Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'es',
          includedLanguages: 'es,en,pt,fr,de,it,ja,ko,zh-CN,ru,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element')
      }
      setGoogleTranslateLoaded(true)
    }

    // Cargar el script solo si no existe
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.head.appendChild(script)
    }

    // Cleanup más seguro
    return () => {
      // No eliminamos la propiedad para evitar errores
      // En su lugar, manejamos el estado con flags
    }
  }, [])

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/services' },
    { label: 'Rastreo', href: '/tracking' },
    { label: 'Nosotros', href: '/fleet', hasSubmenu: true },
    { label: 'Contacto', href: '/contact' },
  ]

  const nosotrosSubmenu = [
    { label: 'Sobre Nosotros', href: '/fleet' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      shouldShowSolidHeader
        ? 'bg-white/80 dark:bg-[#0f1922]/80 backdrop-blur-md border-b border-gray-200/20 dark:border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo único con imagen que cambia según el fondo */}
        <Link href="/" className="flex items-center">
          <img 
            src={shouldShowSolidHeader ? "/logo1.PNG" : "/logo2.PNG"} 
            alt="Beluga Transporte"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            item.hasSubmenu ? (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setIsNosotrosOpen(true)}
                onMouseLeave={() => setIsNosotrosOpen(false)}
              >
                <button className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  shouldShowSolidHeader
                    ? 'text-muted-foreground hover:text-foreground' 
                    : 'text-white hover:text-white/80'
                }`}>
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform ${isNosotrosOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown submenu */}
                <div className={`absolute left-0 mt-0 w-48 bg-white dark:bg-[#1a2a3a] rounded-lg shadow-lg border border-gray-200/20 dark:border-white/10 overflow-hidden transition-all duration-200 ${
                  isNosotrosOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                }`}>
                  {nosotrosSubmenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors first:border-b border-gray-200/20 dark:border-white/5"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  shouldShowSolidHeader
                    ? 'text-muted-foreground hover:text-foreground' 
                    : 'text-white hover:text-white/80'
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Google Translate Widget */}
          <div 
            id="google_translate_element" 
            className={`google-translate-custom ${shouldShowSolidHeader ? 'text-foreground' : 'text-white'}`}
          />
          
          <ThemeToggle />
          <Link 
            href="/quote"
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
            shouldShowSolidHeader
              ? 'bg-[#4ec3b3] text-[#152342] hover:bg-opacity-90'
              : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
          }`}>
            Solicitar Cotización
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Google Translate en móvil - versión simplificada */}
          <div className="relative">
            <select 
              onChange={(e) => {
                if (e.target.value && window.google && window.google.translate) {
                  const translateElement = new window.google.translate.TranslateElement({
                    pageLanguage: 'es',
                    includedLanguages: 'es,en,pt,fr,de,it,ja,ko,zh-CN,ru,ar',
                    autoDisplay: false
                  })
                  // Simular cambio de idioma
                  const frame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement
                  if (frame && frame.contentWindow) {
                    frame.contentWindow.postMessage({
                      type: 'changeLanguage',
                      language: e.target.value
                    }, '*')
                  }
                }
              }}
              className={`text-sm px-2 py-1 rounded border bg-transparent ${
                shouldShowSolidHeader 
                  ? 'text-foreground border-gray-300' 
                  : 'text-white border-white/30'
              }`}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
            </select>
          </div>
          
          <ThemeToggle />
          <button
            className={`p-2 transition-colors ${
              shouldShowSolidHeader ? 'text-foreground' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-t transition-colors ${
          shouldShowSolidHeader
            ? 'bg-white/95 dark:bg-[#0f1922]/95 border-gray-200/20' 
            : 'bg-[#152342]/95 backdrop-blur-md border-white/10'
        }`}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {menuItems.map((item) => (
              <div key={item.href} className="flex flex-col gap-2">
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    shouldShowSolidHeader
                      ? 'text-muted-foreground hover:text-foreground' 
                      : 'text-white hover:text-white/80'
                  }`}
                  onClick={() => !item.hasSubmenu && setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.hasSubmenu && (
                  <div className="flex flex-col gap-2 pl-4 border-l border-white/20">
                    {nosotrosSubmenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={`text-sm transition-colors ${
                          shouldShowSolidHeader
                            ? 'text-muted-foreground hover:text-foreground' 
                            : 'text-white hover:text-white/80'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/quote"
              className={`w-full px-6 py-2 rounded-lg font-medium text-center transition-all ${
              shouldShowSolidHeader
                ? 'bg-[#4ec3b3] text-[#152342] hover:bg-opacity-90'
                : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
            } mt-2`}
              onClick={() => setIsOpen(false)}
            >
              Solicitar Cotización
            </Link>
          </nav>
        </div>
      )}

      {/* Estilos para personalizar Google Translate */}
      <style jsx global>{`
        /* Ocultar el logo de Google */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
        
        /* Estilos para el selector de idiomas */
        .goog-te-gadget .goog-te-combo {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid;
          background: transparent;
          color: inherit;
          font-size: 14px;
          cursor: pointer;
          min-width: 120px;
        }
        
        /* Estilos cuando el header es transparente */
        header:not(.bg-white) .goog-te-gadget .goog-te-combo {
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
        }
        
        /* Estilos cuando el header es sólido */
        header.bg-white .goog-te-gadget .goog-te-combo {
          border-color: rgba(0, 0, 0, 0.2);
          color: #374151;
        }
        
        /* Ocultar el texto "Select Language" */
        .goog-logo-link, .goog-te-gadget span {
          display: none !important;
        }
        
        /* Estilos para el dropdown */
        .goog-te-menu-frame {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          border: none;
        }
        
        /* Ajustes para móvil */
        @media (max-width: 768px) {
          .goog-te-gadget .goog-te-combo {
            padding: 4px 8px;
            font-size: 12px;
            min-width: 100px;
          }
        }

        /* Ocultar el banner de Google */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }

        .goog-te-gadget-icon {
          display: none !important;
        }
      `}</style>
    </header>
  )
}

// Extender la interfaz Window para TypeScript
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
