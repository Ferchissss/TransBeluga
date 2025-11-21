import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Package, Truck, User, MapPin, Plus, Trash2, CheckCircle2, Info, CreditCard, QrCode, Banknote } from "lucide-react"
// Componente separado para el Paso 1
export default function Step1Items({ items, updateItem, removeItem, addItem, sender, setSender, receiver, setReceiver }) {
  return (
    <div className="space-y-6">
      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            1. Detalle de Paquetes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
              <div className="absolute right-2 top-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <h4 className="font-medium mb-3 text-sm text-slate-500">Ítem #{index + 1}</h4>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label>Tipo</Label>
                  <Select value={item.type} onValueChange={(val) => updateItem(item.id, "type", val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paquete">Paquete</SelectItem>
                      <SelectItem value="documento">Documento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Cantidad</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label>Descripción del Contenido</Label>
                  <Input
                    value={item.description || ""}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Ej: Ropa, Repuestos, Documentos legales..."
                  />
                </div>
              </div>

              {item.type === "paquete" && (
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Peso (kg)</Label>
                    <Input
                      type="number"
                      value={item.weight}
                      onChange={(e) => updateItem(item.id, "weight", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Largo (cm)</Label>
                    <Input
                      type="number"
                      value={item.length}
                      onChange={(e) => updateItem(item.id, "length", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Ancho (cm)</Label>
                    <Input
                      type="number"
                      value={item.width}
                      onChange={(e) => updateItem(item.id, "width", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Alto (cm)</Label>
                    <Input
                      type="number"
                      value={item.height}
                      onChange={(e) => updateItem(item.id, "height", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {item.type === "paquete" && (
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    checked={item.fragile}
                    onCheckedChange={(checked) => updateItem(item.id, "fragile", checked)}
                  />
                  <Label className="text-sm">Frágil (+20%)</Label>
                </div>
              )}

              {item.type === "documento" && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex gap-2 text-blue-800 text-xs">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <p>
                    Tarifa fija (10 Bs por unidad). Si el peso supera 1 kg, seleccione <strong>"Paquete"</strong>.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div></div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Subtotal:</span>
                  <p className="font-bold text-[#4ec3b3]">{item.price?.toFixed(2)} Bs</p>
                  {item.fragile && item.type === "paquete" && (
                    <p className="text-xs text-orange-600">Incluye 20% adicional por frágil</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addItem} className="w-full border-dashed bg-transparent">
            <Plus className="mr-2 h-4 w-4" /> Agregar otro paquete
          </Button>
        </CardContent>
      </Card>

      {/* Datos del Envío */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            2. Datos del Envío
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4" /> Remitente (Origen)
              </h3>
              <div className="space-y-2">
                <Label>Nombre Completo *</Label>
                <Input value={sender.name} onChange={(e) => setSender({ ...sender, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>CI / NIT</Label>
                <Input value={sender.ci} onChange={(e) => setSender({ ...sender, ci: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Celular *</Label>
                <Input value={sender.phone} onChange={(e) => setSender({ ...sender, phone: e.target.value })} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2 text-slate-700">
                <Truck className="h-4 w-4" /> Consignatario (Destino)
              </h3>
              <div className="space-y-2">
                <Label>Nombre Completo *</Label>
                <Input
                  value={receiver.name}
                  onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Ciudad Destino *</Label>
                <Select value={receiver.city} onValueChange={(val) => setReceiver({ ...receiver, city: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tarija">Tarija</SelectItem>
                    <SelectItem value="bermejo">Bermejo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Celular *</Label>
                <Input
                  value={receiver.phone}
                  onChange={(e) => setReceiver({ ...receiver, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}