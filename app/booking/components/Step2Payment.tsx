"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CreditCard, QrCode, Banknote } from "lucide-react"

export default function Step2Payment({ totalPrice, onConfirmPayment, loading }) {
  const [paymentMethod, setPaymentMethod] = useState("efectivo") // ← Agrega este estado

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Método de Pago
          </CardTitle>
          <CardDescription>
            Selecciona cómo deseas realizar el pago de tu envío
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumen del Total */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total a Pagar:</span>
              <span className="text-2xl font-bold text-[#4ec3b3]">{totalPrice.toFixed(2)} Bs</span>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="space-y-4">
            <Label className="text-base">Selecciona método de pago:</Label>
            
            <div className="grid gap-3">
              <div 
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "efectivo" 
                    ? "border-[#4ec3b3] bg-[#4ec3b3]/5" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPaymentMethod("efectivo")}
              >
                <div className={`p-2 rounded-full ${
                  paymentMethod === "efectivo" ? "bg-[#4ec3b3] text-white" : "bg-slate-100"
                }`}>
                  <Banknote className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Pago en Efectivo</p>
                  <p className="text-sm text-slate-600">Paga al momento de entregar tu envío en oficina</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === "efectivo" ? "border-[#4ec3b3] bg-[#4ec3b3]" : "border-slate-300"
                }`} />
              </div>

              <div 
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "transferencia" 
                    ? "border-[#4ec3b3] bg-[#4ec3b3]/5" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPaymentMethod("transferencia")}
              >
                <div className={`p-2 rounded-full ${
                  paymentMethod === "transferencia" ? "bg-[#4ec3b3] text-white" : "bg-slate-100"
                }`}>
                  <QrCode className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Transferencia QR</p>
                  <p className="text-sm text-slate-600">Paga mediante transferencia bancaria con código QR</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === "transferencia" ? "border-[#4ec3b3] bg-[#4ec3b3]" : "border-slate-300"
                }`} />
              </div>
            </div>
          </div>

          {/* Información del método seleccionado */}
          {paymentMethod === "efectivo" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Pago en Efectivo:</strong> Realizarás el pago cuando entregues tu paquete en nuestras oficinas. 
                Asegúrate de tener el monto exacto o cercano.
              </p>
            </div>
          )}

          {paymentMethod === "transferencia" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                💡 <strong>Transferencia QR:</strong> Al confirmar, se generará un código QR para que realices la transferencia 
                bancaria. Tu envío se procesará una vez confirmado el pago.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-[#4ec3b3] hover:bg-[#3da89a] text-white h-12 text-lg"
            onClick={() => onConfirmPayment(paymentMethod)}
            disabled={loading}
          >
            {loading ? "Procesando..." : `Pagar ${totalPrice.toFixed(2)} Bs`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}