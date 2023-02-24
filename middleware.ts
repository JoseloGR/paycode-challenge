import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const userIsAuthenticated = req.cookies.get('session')

  if (!userIsAuthenticated) {
    const signInUrl = new URL('/login', req.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
  ]
}