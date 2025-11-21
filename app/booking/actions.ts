"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createShipment(data: any) {
  const supabase = await createClient()

  try {
    // 1. Generar número de guía de 6 dígitos aleatorios
    const guiaNumber = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Insertar envío principal
    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .insert({
        guia_number: guiaNumber,
        sender_name: data.sender.name,
        sender_ci: data.sender.ci,
        sender_phone: data.sender.phone,
        cons_name: data.receiver.name,
        cons_phone: data.receiver.phone,
        cons_city: data.receiver.city.toLowerCase() === 'tarija' ? 'Tarija' : 'Bermejo',
        content_desc: data.contentDesc || "Envío General",
        price_total: data.totalPrice,
        shipment_status: "reservado",
      })
      .select()
      .single()

    if (shipmentError) {
      console.error("Error insertando shipment:", shipmentError)
      throw shipmentError
    }

    // 3. Insertar paquetes (código existente)
    const packagesToInsert = data.items.flatMap((item: any) => {
      const weight = Number.parseFloat(item.weight) || 0
      const length = item.type === "paquete" ? (Number.parseFloat(item.length) || 0) : null
      const width = item.type === "paquete" ? (Number.parseFloat(item.width) || 0) : null
      const height = item.type === "paquete" ? (Number.parseFloat(item.height) || 0) : null

      return Array.from({ length: item.quantity || 1 }, () => ({
        shipment_id: shipment.id,
        package_type: item.type,
        weight: weight,
        length: length,
        width: width,
        height: height,
        fragile: item.fragile || false,
      }))
    })

    const { error: packagesError } = await supabase.from("shipment_packages").insert(packagesToInsert)

    if (packagesError) {
      console.error("Error insertando packages:", packagesError)
      throw packagesError
    }

    revalidatePath("/tracking")
    return { success: true, guia: guiaNumber }
  } catch (error) {
    console.error("Error completo creating shipment:", error)
    return { success: false, error: "Error al crear la reserva: " + error.message }
  }
}