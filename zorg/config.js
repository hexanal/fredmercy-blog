const defaultLocale = 'en'
// TODO maybe this can be a config object for "multisite"?
const websites = [
  {
    baseUrl: '/',
    locale: 'en',
    name: 'english',
    contentSrc: './src/content/en/**/*.md'
  },
  {
    baseUrl: '/fr',
    locale: 'fr',
    name: 'français',
    contentSrc: './src/content/fr/**/*.md'
  }
]

module.exports = {
  websites,
  defaultLocale
}
