"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createShipment } from "./actions"
import Step1Items from "./components/Step1Items"
import Step2Payment from "./components/Step2Payment"
import Step3Receipt from "./components/Step3Receipt"
import ResumenSidebar from "./components/ResumenSidebar"

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")

  // Estados
  const [items, setItems] = useState<any[]>([])
  const [sender, setSender] = useState({ name: "", ci: "", phone: "" })
  const [receiver, setReceiver] = useState({ name: "", phone: "", city: "tarija" })
  const [guiaGenerada, setGuiaGenerada] = useState("")

  useEffect(() => {
    const type = searchParams.get("type")
    const weight = searchParams.get("weight")

    if (type && weight && items.length === 0) {
      const newItem = {
        id: Date.now(),
        type: type,
        weight: weight,
        length: searchParams.get("length") || "",
        width: searchParams.get("width") || "",
        height: searchParams.get("height") || "",
        fragile: searchParams.get("fragile") === "true",
        price: Number(searchParams.get("price")) || 0,
        description: searchParams.get("description") || "",
        quantity: 1,
      }
      setItems([newItem])
    }
  }, [searchParams, items.length])

  // Calculadora de precio individual
  const calculateItemPrice = (item: any) => {
    let price = 0

    if (item.type === "documento") {
      price = 10 * (item.quantity || 1)
    } else {
      const weight = Number.parseFloat(item.weight) || 0
      const length = Number.parseFloat(item.length) || 0
      const width = Number.parseFloat(item.width) || 0
      const height = Number.parseFloat(item.height) || 0
      const volWeight = (length * width * height) / 5000
      const chargeableWeight = Math.max(weight, volWeight)
      price = Math.max(10, chargeableWeight * 3) * (item.quantity || 1)
    }

    if (item.fragile && item.type === "paquete") {
      price = price * 1.2
    }

    return Number.parseFloat(price.toFixed(2))
  }

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        type: "paquete",
        weight: "",
        length: "",
        width: "",
        height: "",
        fragile: false,
        price: 0,
        description: "",
        quantity: 1,
      },
    ])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const updateItem = (id: number, field: string, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (["weight", "length", "width", "height", "type", "quantity", "fragile"].includes(field)) {
            updated.price = calculateItemPrice(updated)
          }
          return updated
        }
        return item
      }),
    )
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0)

  const handleConfirmPayment = async (selectedPaymentMethod: string) => {
    // Validaciones
    if (items.length === 0) {
      toast({
        title: "Faltan Paquetes",
        description: "Por favor, agrega al menos un paquete o documento a la lista antes de continuar.",
        variant: "destructive",
      })
      return
    }

    const missingFields = []
    if (!sender.name) missingFields.push("Nombre del Remitente")
    if (!sender.phone) missingFields.push("Celular del Remitente")
    if (!receiver.name) missingFields.push("Nombre del Consignatario")
    if (!receiver.phone) missingFields.push("Celular del Consignatario")

    if (missingFields.length > 0) {
      toast({
        title: "Datos Incompletos",
        description: `Por favor completa los siguientes campos obligatorios: ${missingFields.join(", ")}.`,
        variant: "destructive",
      })
      return
    }

    const invalidItems = items.filter(item => {
      if (item.type === "documento") {
        return false
      } else {
        const weight = Number.parseFloat(item.weight)
        return isNaN(weight) || weight <= 0
      }
    })

    if (invalidItems.length > 0) {
      toast({
        title: "Pesos inválidos",
        description: "Por favor ingresa pesos válidos para todos los paquetes.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    setPaymentMethod(selectedPaymentMethod)

    const aggregatedDescription = items
      .map((item, index) => {
        const desc = item.description || "Sin descripción"
        const quantityText = item.quantity > 1 ? ` (${item.quantity}x)` : ''
        const fragileText = item.fragile ? ' [FRÁGIL]' : ''
        return items.length > 1 ? `Bulto ${index + 1}: ${desc}${quantityText}${fragileText}` : `${desc}${quantityText}${fragileText}`
      })
      .join(" | ")

    const result = await createShipment({
      items,
      sender,
      receiver,
      totalPrice,
      contentDesc: aggregatedDescription || `${items.length} bulto(s)`,
    })

    if (result.success) {
      setGuiaGenerada(result.guia)
      setStep(3)
      toast({
        title: "¡Pago Exitoso!",
        description: `Tu envío ha sido registrado correctamente con la guía ${result.guia}.`,
        className: "bg-green-50 border-green-200 text-green-800",
      })
    } else {
      toast({
        title: "Error en el Pago",
        description: result.error || "Ocurrió un problema al procesar tu pago. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Step1Items
                items={items}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
                sender={sender}
                setSender={setSender}
                receiver={receiver}
                setReceiver={setReceiver}
              />
            </div>
            <div className="lg:col-span-1">
              <ResumenSidebar 
                items={items} 
                totalPrice={totalPrice} 
                onContinue={() => setStep(2)}
                disabled={items.length === 0}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <Step2Payment
            totalPrice={totalPrice}
            onConfirmPayment={handleConfirmPayment}
            loading={loading}
          />
        )
      case 3:
        return (
          <Step3Receipt
            guiaGenerada={guiaGenerada}
            sender={sender}
            receiver={receiver}
            totalPrice={totalPrice}
            paymentMethod={paymentMethod}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          {step === 1 ? "Reserva de Envíos" : step === 2 ? "Método de Pago" : "Comprobante de Envío"}
        </h1>
        
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= stepNumber ? 'bg-[#4ec3b3] text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-[#4ec3b3]' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-500 mt-2">
            <span>Detalles</span>
            <span>Pago</span>
            <span>Comprobante</span>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <BookingContent />
    </Suspense>
  )
}