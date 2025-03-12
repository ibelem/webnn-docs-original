export { middleware } from 'nextra/locales'
 
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|android-chrome-192x192.png|android-chrome-512x512|apple-touch-icon.png|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind).*)'
  ]
}