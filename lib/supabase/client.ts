import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.WEB_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.WEB_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Browser client - URL:", !!supabaseUrl, "Key:", !!supabaseAnonKey)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Browser client - Missing environment variables")
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
