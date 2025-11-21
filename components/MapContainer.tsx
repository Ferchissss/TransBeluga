'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import con key única para forzar remount
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ec3b3] mx-auto mb-4"></div>
        <p className="text-gray-600">Preparando mapa...</p>
      </div>
    </div>
  )
})

interface MapContainerProps {
  isVisible: boolean
}

export default function MapContainer({ isVisible }: MapContainerProps) {
  const [mapKey, setMapKey] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      // Cambiar la key para forzar un nuevo montaje
      setMapKey(prev => prev + 1)
    } else {
      // Esperar un poco antes de desmontar para evitar flashes
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!shouldRender) {
    return (
      <div className="h-[400px] bg-gradient-to-br from-[#152342] to-[#1e3a5f] rounded-3xl flex items-center justify-center">
        <div className="text-center text-white p-6">
          <div className="w-16 h-16 bg-[#4ec3b3] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold mb-2">Cobertura Nacional</h4>
          <p className="text-gray-300">Haz clic para ver el mapa interactivo</p>
        </div>
      </div>
    )
  }

  return <LeafletMap key={mapKey} />
}