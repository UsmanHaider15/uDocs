import { Language, Version } from 'types'

const languages: Language[] = [
  { id: 'en', title: 'English', isDefault: true, countryCode: 'US' },
  { id: 'zh-CN', title: '简体中文', countryCode: 'CN' },
]

const versions: Version[] = [{ id: 'v1', title: 'V1', isDefault: true }]

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
