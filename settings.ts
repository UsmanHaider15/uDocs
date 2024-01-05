import { Language, Version } from 'types'

const languages: Language[] = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'ja', title: 'Japanese' },
  { id: 'fr', title: 'French' },
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

const googleTranslateLanguages = languages.map(({ id, title }) => ({
  id,
  title,
}))

// For v3 studio
export { i18n, googleTranslateLanguages, versions }
