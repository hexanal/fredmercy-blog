const defaultLocale = 'en'
// TODO maybe this can be a config object for "multisite"?
const websites = [
  {
    baseUrl: '/',
    baseDomain: 'https://fredmercy.ca',
    locale: 'en',
    name: 'english',
    contentSrc: './src/content/en/**/*.md'
  },
  {
    baseUrl: '/fr',
    baseDomain: 'https://fredmercy.ca',
    locale: 'fr',
    name: 'français',
    contentSrc: './src/content/fr/**/*.md'
  }
]

module.exports = {
  websites,
  defaultLocale
}
