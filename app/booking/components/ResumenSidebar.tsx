import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, User, MapPin, Plus, Trash2, CheckCircle2, Info, CreditCard, QrCode, Banknote } from "lucide-react"

export default function ResumenSidebar({ items, totalPrice, onContinue, disabled }) {
  return (
    <div className="sticky top-24">
      <Card className="bg-slate-900 text-white border-none shadow-xl">
        <CardHeader>
          <CardTitle>Resumen de Envío</CardTitle>
          <CardDescription className="text-slate-400">Revisa los detalles antes de continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-300">
                  {item.type === "paquete" ? "📦" : "📄"} 
                  {item.quantity > 1 ? ` ${item.quantity}x ` : ' '}
                  {item.weight}kg
                  {item.fragile && " 🚨"}
                </span>
                <span className="font-medium">{item.price?.toFixed(2)} Bs</span>
              </div>
            ))}
            <Separator className="bg-slate-700 my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total a Pagar</span>
              <span className="text-[#4ec3b3]">{totalPrice.toFixed(2)} Bs</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#4ec3b3] hover:bg-[#3da89a] text-white h-12 text-lg"
            onClick={onContinue}
            disabled={disabled}
          >
            Continuar al Pago
          </Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Al continuar, aceptas nuestros términos de servicio y política de privacidad.
      </p>
    </div>
  )
}