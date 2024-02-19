import { Language, Version } from 'types'

const languages: Language[] = [
  { id: 'en', title: 'English', isDefault: true, countryCode: 'US' },
  { id: 'ja', title: '日本語', countryCode: 'JP' },
  { id: 'fr', title: 'Français', countryCode: 'FR' },
]

const versions: Version[] = [
  { id: 'v1', title: 'V1', isDefault: true },
  { id: 'v2', title: 'V2' },
]

const i18n = {
  languages,
  // @ts-ignore
  base: languages.find((item) => item.isDefault).id,
}

const googleTranslateLanguages = languages.map(
  ({ id, title, countryCode }) => ({
    id,
    title,
    countryCode,
  }),
)

// For v3 studio
export { i18n, googleTranslateLanguages, versions }
