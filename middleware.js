export { middleware } from 'nextra/locales'
 
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|static|images/favicon|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest).*)'
  ]
}