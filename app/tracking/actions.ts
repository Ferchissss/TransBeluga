"use server"

import { createClient } from "@/lib/supabase/server"

export async function getShipmentByGuia(guiaNumber: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("shipments")
    .select(`
      *,
      shipment_packages (*)
    `)
    .eq("guia_number", guiaNumber)
    .single()

  if (error) {
    console.error("Error fetching shipment:", error)
    
    if (error.code === 'PGRST116') {
      return { success: false, error: "No se encontró un envío con ese número de guía." }
    }
    
    return { 
      success: false, 
      error: `Error al buscar el envío: ${error.message}` 
    }
  }

  if (!data) {
    return { success: false, error: "No se encontró un envío con ese número de guía." }
  }

  return { success: true, data }
}