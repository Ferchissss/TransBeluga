'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix para los iconos de Leaflet - debe ejecutarse solo en el cliente
const fixLeafletIcons = () => {
  if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }
}

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

export default function InteractiveMap() {
  const [isMounted, setIsMounted] = useState(false)
  const [mapKey, setMapKey] = useState(0) // Key para forzar re-montaje

  useEffect(() => {
    setIsMounted(true)
    fixLeafletIcons()
    
    // Cleanup function
    return () => {
      setIsMounted(false)
    }
  }, [])

  // Reset map key cuando el componente se monta
  useEffect(() => {
    setMapKey(prev => prev + 1)
  }, [isMounted])

  if (!isMounted) {
    return (
      <div className="h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ec3b3] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer
      key={mapKey} // Key única para forzar nuevo montaje
      center={[-17.5, -65]}
      zoom={6}
      style={{ height: '400px', width: '100%', borderRadius: '24px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {offices.map((office) => (
        <Marker key={office.id} position={office.position}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg text-[#152342]">{office.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{office.address}</p>
              <p className="text-sm text-[#4ec3b3] font-medium mt-1">{office.phone}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${office.position[0]},${office.position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm bg-[#4ec3b3] text-white px-3 py-1 rounded-lg hover:bg-[#3db3a2] transition-colors"
              >
                Cómo llegar
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}