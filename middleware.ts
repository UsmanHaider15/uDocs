import { match } from '@formatjs/intl-localematcher'
import { i18n } from 'languages'
import Negotiator from 'negotiator'

// Define the type for the Request object
interface IRequest {
  headers: { [key: string]: string }
  nextUrl: {
    pathname: string
  }
}

// Define the type for the Middleware function
type Middleware = (request: IRequest) => Response | void

// Define your locales and default locale
const locales = i18n.languages.map((lang) => lang.id)
const defaultLocale = 'en'

// Function to get the preferred locale
function getLocale(request: IRequest): string {
  let headers = request.headers
  let negotiator = new Negotiator({ headers })
  let languages = negotiator.languages()

  // Check if languages array is empty or contains invalid values
  if (
    !languages.length ||
    !languages.every((lang) => typeof lang === 'string')
  ) {
    return defaultLocale
  }

  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    console.error('Locale matching error:', error)
    return defaultLocale
  }
}

// Middleware function
export const middleware: Middleware = (request) => {
  const { pathname } = request.nextUrl

  // Check if the pathname starts with /studio and skip localization
  if (pathname.startsWith('/studio')) {
    return
  }

  // also skip it pathname starts with /api
  if (pathname.startsWith('/api')) {
    return
  }

  const localePattern = /^\/([a-z]{2})\/docs$/ // Regex to match /xx/doc where xx is any two-letter code

  // Check if the pathname matches the locale pattern for /doc
  const match = pathname.match(localePattern)
  if (match) {
    request.nextUrl.pathname = `/${match[1]}/docs/v1`
    // @ts-ignore
    return Response.redirect(request.nextUrl)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // @ts-ignore
  return Response.redirect(request.nextUrl)
}

// Export the config
export const config = {
  matcher: [
    '/((?!_next).*)',
    // Uncomment the next line if you want to run only on root URL
    // '/'
  ],
}

// Export the getLocale function if needed elsewhere
export { getLocale }
