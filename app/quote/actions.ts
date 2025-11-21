"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveQuotation(data: any) {
  const supabase = await createClient()

  const { error } = await supabase.from("quotations").insert([data])

  if (error) {
    console.error("Error saving quotation:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
