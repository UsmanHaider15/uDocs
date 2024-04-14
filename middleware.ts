import { match } from '@formatjs/intl-localematcher'
import { i18n, versions } from 'settings'
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
const defaultLocale = i18n.languages.find((lang) => lang.isDefault)?.id || 'en'
const defaultVersion = versions.find((version) => version.isDefault)?.id || 'v1'

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

  // Exclude static files or specific asset paths from processing
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg')
  ) {
    return
  }

  // Check if the pathname starts with /studio and skip localization
  if (pathname.startsWith('/studio')) {
    return
  }

  // Updated Regex to match /xx/docs or /xx/docs/{version}
  // where xx is a language code (e.g., "en", "zh-CN") and {version} is optional
  const localePatternWithVersion = /^\/([a-zA-Z-]+)\/docs(\/([a-zA-Z0-9-]+))?$/

  const match = pathname.match(localePatternWithVersion)
  if (match) {
    // Extract the locale and the version, if available
    const locale = match[1]
    const version = match[3] || defaultVersion // Use defaultVersion if version is not in the URL

    request.nextUrl.pathname = `/${locale}/docs/${version}/introduction`
    // @ts-ignore
    return Response.redirect(request.nextUrl)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // const locale = getLocale(request)
  const locale = defaultLocale
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
