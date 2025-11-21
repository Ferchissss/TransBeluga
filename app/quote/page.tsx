"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calculator, Package, FileText, ArrowRight, CheckCircle2, Info } from "lucide-react"
import { saveQuotation } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function QuotePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    type: "paquete", // 'documento' | 'paquete'
    weight: "",
    length: "",
    width: "",
    height: "",
    fragile: false,
    destination: "tarija",
  })

  const calculatePrice = () => {
    const weight = Number.parseFloat(formData.weight) || 0
    let price = 0

    if (formData.type === "documento") {
      price = 10
    } else {
      // Lógica Paquete
      const length = Number.parseFloat(formData.length) || 0
      const width = Number.parseFloat(formData.width) || 0
      const height = Number.parseFloat(formData.height) || 0

      // Peso Volumétrico: (L x A x A) / 5000
      const volWeight = (length * width * height) / 5000

      // Peso Facturable: max(PesoReal, PesoVol)
      const chargeableWeight = Math.max(weight, volWeight)

      // Precio: PesoFacturable * 3bs (Mínimo 10bs)
      price = Math.max(10, chargeableWeight * 3)
    }

    return Number.parseFloat(price.toFixed(2))
  }

  const handleCalculate = async () => {
    setLoading(true)
    const price = calculatePrice()
    setResult(price)

    // Guardar en base de datos
    const quotationData = {
      package_type: formData.type,
      weight: formData.type === "documento" ? 1 : Number.parseFloat(formData.weight) || 0,
      length: formData.type === "paquete" ? Number.parseFloat(formData.length) || 0 : null,
      width: formData.type === "paquete" ? Number.parseFloat(formData.width) || 0 : null,
      height: formData.type === "paquete" ? Number.parseFloat(formData.height) || 0 : null,
      fragile: formData.fragile,
      estimated_price: price,
    }

    const { success, error } = await saveQuotation(quotationData)

    if (!success) {
      toast({
        title: "Error al guardar",
        description: "Hubo un problema guardando tu cotización, pero el precio es correcto.",
        variant: "destructive",
      })
    }

    setLoading(false)
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Cotizador de Envíos</h1>
            <p className="text-slate-600">
              Calcula el costo de tu envío al instante para la ruta El Alto - Tarija - Bermejo
            </p>
          </div>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#4ec3b3]" />
                Calculadora de Tarifas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 ? (
                <div className="space-y-6">
                  {/* Tipo de Envío */}
                  <div className="space-y-3">
                    <Label>¿Qué deseas enviar?</Label>
                    <RadioGroup
                      defaultValue="paquete"
                      value={formData.type}
                      onValueChange={(val) => setFormData({ ...formData, type: val })}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="documento" id="doc" className="peer sr-only" />
                        <Label
                          htmlFor="doc"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#4ec3b3] [&:has([data-state=checked])]:border-[#4ec3b3]"
                        >
                          <FileText className="mb-3 h-6 w-6" />
                          Documento
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="paquete" id="pack" className="peer sr-only" />
                        <Label
                          htmlFor="pack"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#4ec3b3] [&:has([data-state=checked])]:border-[#4ec3b3]"
                        >
                          <Package className="mb-3 h-6 w-6" />
                          Paquete
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Destino */}
                  <div className="space-y-2">
                    <Label>Destino</Label>
                    <Select
                      value={formData.destination}
                      onValueChange={(val) => setFormData({ ...formData, destination: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tarija">Tarija</SelectItem>
                        <SelectItem value="bermejo">Bermejo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.type === "documento" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex gap-3 text-blue-800 text-sm">
                      <Info className="h-5 w-5 flex-shrink-0" />
                      <p>
                        La tarifa para documentos es fija (10 Bs). Si envía muchos documentos y el peso supera 1 kg, por
                        favor seleccione la opción <strong>"Paquete"</strong>.
                      </p>
                    </div>
                  )}

                  {/* Peso y Dimensiones */}
                  <div className="grid gap-4">
                    {formData.type === "paquete" && (
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                      </div>
                    )}

                    {formData.type === "paquete" && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Largo (cm)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={formData.length}
                            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ancho (cm)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={formData.width}
                            onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Alto (cm)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Opciones Adicionales */}
                  {formData.type === "paquete" && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="fragile"
                        checked={formData.fragile}
                        onCheckedChange={(checked) => setFormData({ ...formData, fragile: checked })}
                      />
                      <Label htmlFor="fragile">¿Es frágil?</Label>
                    </div>
                  )}

                  <Button
                    className="w-full bg-[#4ec3b3] hover:bg-[#3da89a] text-white text-lg h-12"
                    onClick={handleCalculate}
                    disabled={loading || (formData.type === "paquete" && !formData.weight)}
                  >
                    {loading ? "Calculando..." : "Calcular Tarifa"}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6 py-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-slate-600">Costo Estimado</h3>
                    <div className="text-5xl font-bold text-[#4ec3b3] mt-2">{result?.toFixed(2)} Bs</div>
                    <p className="text-sm text-slate-500 mt-2">*Tarifa sujeta a verificación física del paquete</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tipo:</span>
                      <span className="font-medium capitalize">{formData.type}</span>
                    </div>
                    {formData.type === "paquete" && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Peso:</span>
                        <span className="font-medium">{formData.weight} kg</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Destino:</span>
                      <span className="font-medium capitalize">{formData.destination}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                      Recalcular
                    </Button>
                    <Button
                      className="flex-1 bg-slate-900 text-white"
                      onClick={() => {
                        const params = new URLSearchParams({
                          type: formData.type,
                          weight: formData.weight,
                          length: formData.length,
                          width: formData.width,
                          height: formData.height,
                          fragile: String(formData.fragile),
                          price: String(result),
                        })
                        router.push(`/booking?${params.toString()}`)
                      }}
                    >
                      Reservar Envío <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
