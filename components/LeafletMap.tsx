'use client'

import { useEffect, useRef, useState } from 'react'

// Componente que carga Leaflet directamente sin react-leaflet
export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Cargar Leaflet solo en el cliente
    if (typeof window === 'undefined') return

    const initMap = async () => {
      try {
        // Dynamic imports
        const L = (await import('leaflet')).default
        await import('leaflet/dist/leaflet.css')

        // Fix para los iconos
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        if (!mapRef.current) return

        // Destruir mapa existente
        if (map) {
          map.remove()
          setMap(null)
        }

        // Crear nuevo mapa
        const newMap = L.map(mapRef.current).setView([-17.5, -65], 6)

        // Agregar tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(newMap)

        // Agregar marcadores
        const offices = [
          {
            id: 1,
            name: 'El Alto (Central)',
            position: [-16.5100, -68.1595] as [number, number],
            address: 'Villa Bolivar B Calle Ross Telles Y #125',
            phone: '+591 78844645'
          },
          {
            id: 2,
            name: 'Tarija',
            position: [-21.5355, -64.7296] as [number, number],
            address: 'Oficina Central Tarija',
            phone: '+591 62544242'
          },
          {
            id: 3,
            name: 'Bermejo',
            position: [-22.7321, -64.3372] as [number, number],
            address: 'Calle Real Madrid y Cochabamba',
            phone: '+591 74847672'
          }
        ]

        offices.forEach(office => {
          const marker = L.marker(office.position).addTo(newMap)
          marker.bindPopup(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; color: #152342; margin-bottom: 8px;">${office.name}</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${office.address}</p>
              <p style="font-size: 14px; color: #4ec3b3; font-weight: 500; margin-bottom: 8px;">${office.phone}</p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${office.position[0]},${office.position[1]}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="display: inline-block; background: #4ec3b3; color: white; padding: 4px 12px; border-radius: 8px; text-decoration: none; font-size: 12px;"
              >
                Cómo llegar
              </a>
            </div>
          `)
        })

        setMap(newMap)
        setIsLoaded(true)

        // Ajustar el mapa después de que se renderice
        setTimeout(() => {
          newMap.invalidateSize()
        }, 100)

      } catch (error) {
        console.error('Error loading map:', error)
      }
    }

    initMap()

    // Cleanup
    return () => {
      if (map) {
        map.remove()
        setMap(null)
      }
    }
  }, []) // Solo ejecutar una vez

  return (
    <div 
      ref={mapRef} 
      className="h-[400px] w-full rounded-3xl bg-gray-100"
      style={{ 
        borderRadius: '24px',
        overflow: 'hidden'
      }}
    >
      {!isLoaded && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ec3b3] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      )}
    </div>
  )
}