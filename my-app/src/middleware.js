import { NextResponse } from "next/server"

export function middleware(request) {
  // Example: redirect if not logged in
  const isLoggedIn = true // <- replace with real check
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
