'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Usa dynamic import con ssr: false para evitar problemas con window
const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ec3b3] mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando mapa...</p>
      </div>
    </div>
  )
})

interface MapWrapperProps {
  isVisible?: boolean
}

export default function MapWrapper({ isVisible = true }: MapWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    } else {
      // Delay unmount para evitar problemas
      const timer = setTimeout(() => setShouldRender(false), 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!shouldRender) {
    return (
      <div className="h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Mapa no disponible</p>
        </div>
      </div>
    )
  }

  return <InteractiveMap />
}