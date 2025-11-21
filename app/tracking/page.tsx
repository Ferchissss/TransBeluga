"use client"

import { useState } from "react"
import { Search, Package, Truck, MapPin, CheckCircle, Box, Calendar, User, Phone, DollarSign, Weight, Ruler, FileText, Clock } from "lucide-react"
import { getShipmentByGuia } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Definimos los estados posibles y su orden (AGREGAMOS "reservado" AL INICIO)
const STATUS_STEPS = [
  { id: "reservado", label: "Reservado", icon: Clock },
  { id: "recepcionado", label: "Recepcionado", icon: Package },
  { id: "en tránsito", label: "En Tránsito", icon: Truck },
  { id: "en destino", label: "En Destino", icon: MapPin },
  { id: "entregado", label: "Entregado", icon: CheckCircle },
]

export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [shipment, setShipment] = useState<any>(null)
  const { toast } = useToast()

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      toast({
        variant: "destructive",
        title: "Campo vacío",
        description: "Por favor ingresa un número de guía.",
      })
      return
    }

    setLoading(true)
    setShipment(null)

    try {
      const result = await getShipmentByGuia(trackingCode.trim())

      if (result.success) {
        setShipment(result.data)
      } else {
        toast({
          variant: "destructive",
          title: "No encontrado",
          description: result.error || "No pudimos encontrar ese envío.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al buscar el envío.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para determinar el estado actual del paso (completado, actual, pendiente)
  const getStepStatus = (stepId: string, currentStatus: string) => {
    const stepIndex = STATUS_STEPS.findIndex((s) => s.id === stepId)
    const currentIndex = STATUS_STEPS.findIndex((s) => s.id === currentStatus)

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "pending"
  }

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Función para contar documentos y paquetes
  const countItems = (packages: any[]) => {
    const counts = {
      documentos: 0,
      paquetes: 0
    }
    
    packages?.forEach(pkg => {
      if (pkg.package_type === 'documento') {
        counts.documentos += 1
      } else {
        counts.paquetes += 1
      }
    })
    
    return counts
  }

  // Función para agrupar paquetes idénticos
  const groupPackages = (packages: any[]) => {
    const groups: any[] = []
    
    packages?.forEach((pkg) => {
      // Crear una clave única basada en todas las propiedades
      const key = `${pkg.package_type}-${pkg.weight}-${pkg.length}-${pkg.width}-${pkg.height}-${pkg.fragile}`
      
      const existingGroup = groups.find(g => g.key === key)
      if (existingGroup) {
        existingGroup.count += 1
        // Mantener el ID original para referencia
        existingGroup.originalIds.push(pkg.id)
      } else {
        groups.push({
          ...pkg,
          key,
          count: 1,
          originalIds: [pkg.id] // Guardar IDs originales para las descripciones
        })
      }
    })
    
    return groups
  }

  // Función para obtener la descripción individual de un paquete
  const getPackageDescription = (shipment: any, packageIndex: number) => {
    if (!shipment?.content_desc) return null
    
    // Dividir la descripción por "|" para obtener descripciones individuales
    const descriptions = shipment.content_desc.split('|').map((desc: string) => desc.trim())
    
    // Buscar la descripción para este paquete específico
    const packageDesc = descriptions[packageIndex]
    
    if (!packageDesc) return null
    
    // Limpiar la descripción
    const cleaned = packageDesc
      .replace(/Bulto\s*\d+:\s*/gi, '')
      .replace(/\(\d+x\)/g, '')
      .replace(/\[FRÁGIL\]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Solo retornar si no está vacía y no es "Sin descripción"
    if (cleaned && cleaned !== 'Sin descripción' && cleaned !== 'Sin descripcion') {
      return cleaned
    }
    
    return null
  }

  // Función para obtener todas las descripciones válidas de un grupo de paquetes
  const getGroupDescriptions = (shipment: any, group: any) => {
    if (!shipment?.content_desc) return []
    
    const descriptions = shipment.content_desc.split('|').map((desc: string) => desc.trim())
    const validDescriptions: string[] = []
    
    // Para cada paquete en el grupo, obtener su descripción
    group.originalIds.forEach((id: number, index: number) => {
      const packageIndex = shipment.shipment_packages.findIndex((pkg: any) => pkg.id === id)
      const desc = getPackageDescription(shipment, packageIndex)
      if (desc) {
        validDescriptions.push(desc)
      }
    })
    
    return validDescriptions
  }

  return (
    <section
      id="tracking"
      className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-[#152342] to-[#1a2f4a] text-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Rastrear tu Envío</h2>
          <p className="text-lg text-gray-300">
            Ingresa tu número de guía para ver el estado en tiempo real.
          </p>
        </div>

        {/* Buscador */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Número de guía (ej: 418318)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ec3b3] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading}
              className="px-8 py-4 bg-[#4ec3b3] text-[#152342] rounded-xl font-bold hover:bg-[#3da89a] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#152342] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Rastrear
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resultados */}
        {shipment && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tarjeta de Estado Principal */}
            <div className="bg-white rounded-2xl p-8 text-[#152342] shadow-2xl">
              {/* Header con número de guía y estado */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Número de Guía</p>
                  <h3 className="text-3xl font-bold text-[#152342]">{shipment.guia_number}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Creado: {formatDate(shipment.created_at)}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 px-4 py-2 bg-[#4ec3b3]/10 rounded-full border border-[#4ec3b3]/20">
                  <span className="font-bold text-[#2a9b8d] uppercase tracking-wide text-sm">
                    {shipment.shipment_status}
                  </span>
                </div>
              </div>

              {/* Stepper de Progreso - AHORA CON 5 PASOS */}
              <div className="relative mb-12 px-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative">
                  {STATUS_STEPS.map((step, index) => {
                    const status = getStepStatus(step.id, shipment.shipment_status)
                    const Icon = step.icon

                    return (
                      <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-0 relative z-10">
                        {index !== STATUS_STEPS.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-[-32px] w-1 bg-gray-100 md:hidden" />
                        )}
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 bg-white",
                          status === "completed" || status === "current"
                            ? "border-[#4ec3b3] text-[#4ec3b3]"
                            : "border-gray-200 text-gray-300",
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="md:mt-4 md:text-center">
                          <p className={cn(
                            "font-bold text-sm uppercase tracking-wide",
                            status === "completed" || status === "current" ? "text-[#152342]" : "text-gray-400",
                          )}>
                            {step.label}
                          </p>
                          {status === "current" && (
                            <p className="text-xs text-[#4ec3b3] font-medium mt-1 animate-pulse">Estado Actual</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Información Detallada */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información de Contacto */}
                <div className="space-y-6">
                  <h4 className="font-bold text-lg flex items-center gap-2 border-b border-gray-200 pb-2">
                    <User className="w-5 h-5 text-[#4ec3b3]" />
                    Información de Contacto
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Remitente */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-sm text-gray-500 mb-3">REMITENTE</h5>
                      <div className="space-y-2">
                        <p className="font-medium">{shipment.sender_name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {shipment.sender_phone}
                        </p>
                        {shipment.sender_ci && (
                          <p className="text-sm text-gray-600">CI: {shipment.sender_ci}</p>
                        )}
                      </div>
                    </div>

                    {/* Consignatario */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-sm text-gray-500 mb-3">CONSIGNATARIO</h5>
                      <div className="space-y-2">
                        <p className="font-medium">{shipment.cons_name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {shipment.cons_phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ruta y Precio */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-sm text-gray-500 mb-2">RUTA</h5>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Origen:</span> El Alto / La Paz
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Destino:</span> {shipment.cons_city}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-sm text-gray-500 mb-2">PRECIO</h5>
                      <p className="text-lg font-bold text-[#4ec3b3] flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {shipment.price_total?.toFixed(2)} Bs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paquetes y Contenido */}
                <div className="space-y-6">
                  <h4 className="font-bold text-lg flex items-center gap-2 border-b border-gray-200 pb-2">
                    <Box className="w-5 h-5 text-[#4ec3b3]" />
                    Contenido del Envío
                  </h4>

                  {/* Resumen de items */}
                  {shipment.shipment_packages && shipment.shipment_packages.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-bold text-sm text-gray-500 mb-3">RESUMEN</h5>
                      <div className="grid grid-cols-2 gap-4">
                        {countItems(shipment.shipment_packages).documentos > 0 && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#4ec3b3]" />
                            <span className="font-medium">
                              {countItems(shipment.shipment_packages).documentos} 
                              {countItems(shipment.shipment_packages).documentos === 1 ? ' Documento' : ' Documentos'}
                            </span>
                          </div>
                        )}
                        {countItems(shipment.shipment_packages).paquetes > 0 && (
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#4ec3b3]" />
                            <span className="font-medium">
                              {countItems(shipment.shipment_packages).paquetes} 
                              {countItems(shipment.shipment_packages).paquetes === 1 ? ' Paquete' : ' Paquetes'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Lista detallada de paquetes AGRUPADOS con descripciones */}
                  {shipment.shipment_packages && shipment.shipment_packages.length > 0 ? (
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm text-gray-500">DETALLE DE CONTENIDO</h5>
                      {groupPackages(shipment.shipment_packages).map((pkg: any, index: number) => {
                        const groupDescriptions = getGroupDescriptions(shipment, pkg)
                        
                        return (
                          <div key={pkg.key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  {pkg.package_type === 'documento' ? (
                                    <>
                                      <FileText className="w-4 h-4 text-[#4ec3b3]" />
                                      <span className="font-medium capitalize">
                                        Documento{pkg.count > 1 && ` (${pkg.count})`}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Package className="w-4 h-4 text-[#4ec3b3]" />
                                      <span className="font-medium capitalize">
                                        Paquete{pkg.count > 1 && ` (${pkg.count})`}
                                      </span>
                                    </>
                                  )}
                                </div>
                                {pkg.fragile && (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Frágil
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Información específica del item - SOLO peso y dimensiones para paquetes */}
                            {pkg.package_type === 'paquete' && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                                {pkg.weight && (
                                  <div className="flex items-center gap-2">
                                    <Weight className="w-4 h-4 text-gray-400" />
                                    <span>{pkg.weight} kg</span>
                                  </div>
                                )}
                                {pkg.length && pkg.width && pkg.height && (
                                  <div className="flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-gray-400" />
                                    <span>{pkg.length}×{pkg.width}×{pkg.height} cm</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Descripciones del grupo SOLO para paquetes y SOLO si existen */}
                            {pkg.package_type === 'paquete' && groupDescriptions.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Descripción: </span>
                                  {groupDescriptions.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                      No hay información detallada de paquetes
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}