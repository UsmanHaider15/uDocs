const languages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'ja', title: 'Japanese' },
  { id: 'fr', title: 'French' },
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
export { i18n, googleTranslateLanguages }
