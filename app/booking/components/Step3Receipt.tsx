import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Phone,
  MapPinned,
  Calendar,
  ScanQrCode,
  FileSearch,
  SquarePlus,
  Lightbulb
} from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from 'qrcode.react'

export default function Step3Receipt({ guiaGenerada, sender, receiver, totalPrice, paymentMethod }) {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">¡Pago Confirmado!</h2>
          <p className="text-slate-600 mb-8 text-center">Tu envío ha sido registrado y el pago procesado exitosamente.</p>

          {/* Grid de dos columnas para la información */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Columna izquierda - Información del envío */}
            <div className="space-y-6">
              {/* Número de Guía */}
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Número de Guía</p>
                <p className="text-3xl font-mono font-bold text-[#4ec3b3] tracking-wider">{guiaGenerada}</p>
              </div>

              {/* Información de Remitente y Consignatario */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Remitente</h3>
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <p className="font-medium">{sender.name}</p>
                    <p className="text-sm text-slate-600">CI: {sender.ci || 'No especificado'}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {sender.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">Consignatario</h3>
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <p className="font-medium">{receiver.name}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {receiver.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ruta y Monto */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-slate-200">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPinned className="h-3 w-3" />
                    Origen
                  </p>
                  <p className="font-medium">Tarija</p>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPinned className="h-3 w-3" />
                    Destino
                  </p>
                  <p className="font-medium capitalize">{receiver.city}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Monto Pagado</p>
                <p className="text-2xl font-bold text-[#4ec3b3]">{totalPrice.toFixed(2)} Bs</p>
                <p className="text-sm text-slate-600 capitalize">Método: {paymentMethod}</p>
              </div>

              {/* Fecha y Hora */}
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Fecha y Hora de Reserva
                </p>
                <p className="font-medium">{new Date().toLocaleString('es-BO')}</p>
              </div>
            </div>

            {/* Columna derecha - Código QR */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500 mb-3 text-center flex items-center justify-center gap-1">
                  <ScanQrCode className="h-4 w-4" />
                  Código QR para validación
                </p>
                <div className="flex justify-center">
                  <QRCodeSVG 
                    value={guiaGenerada}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Presenta este código en oficina para validar tu envío
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded">
                  {guiaGenerada}
                </p>
                <p className="text-xs text-slate-400 mt-1">Número de guía</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
                href="/tracking"
                className="flex-1 bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg text-white text-center transition-colors flex items-center justify-center gap-2"
                >
                <FileSearch className="h-4 w-4" />
                Rastrear Envío
            </Link>
            <Button 
              variant="outline" 
              className="flex-1 bg-transparent flex items-center justify-center gap-2"
              onClick={() => window.location.reload()}
            >
              <SquarePlus className="h-4 w-4" />
              Nueva Reserva
            </Button>
          </div>

          {/* Información adicional */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 text-center flex items-center justify-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <strong>Importante:</strong> Guarda este número de guía y presenta el código QR en nuestra oficina para procesar tu envío.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}