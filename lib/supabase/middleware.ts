import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.WEB_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.WEB_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Middleware - URL:", !!supabaseUrl, "Key:", !!supabaseAnonKey)
  console.log("[v0] Middleware - Path:", request.nextUrl.pathname)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Middleware - Missing env vars, allowing request to continue")
    return supabaseResponse
  }

  const isPublicPath =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/_vercel") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next")

  if (isPublicPath) {
    console.log("[v0] Middleware - Public path, skipping auth check")
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] Middleware - User:", !!user, "Path:", request.nextUrl.pathname)

    if (!user) {
      console.log("[v0] Middleware - Redirecting to login")
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.log("[v0] Middleware - Error:", error)
    return supabaseResponse
  }
}
