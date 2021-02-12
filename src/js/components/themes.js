import Storage from '../tools/Storage'

// FIXME: use config.interface.themes to build HTML straight up, and then figure out the available themes from that
const THEME_LIST = [
  'june',
  'the-greys',
  'bioluminesce',
  'night-fire',
  'pink-slime',
  'frigid-cold',
  'mondrian',
  'forestry',
]

export default function({element, messaging}) {
  const useTheme = function(themeId) {
    Storage.set('selected_theme', themeId)
    document.documentElement.dataset.theme = themeId
    element.value = themeId
  }

  const initThemes = function() {
    THEME_LIST.map( theme => { // setup the dropdown
      const option = document.createElement('option')
      option.value = theme
      option.textContent = theme

      element.appendChild( option )
    })

    element.addEventListener('change', e => useTheme( e.target.value ) )

    const stored = Storage.get('selected_theme') // manage "saved" theme, in localstorage
    if ( THEME_LIST.includes( stored ) ) useTheme(stored)
  }

  initThemes()

  messaging.subscribe('SET_THEME', useTheme)

  return function() {
    messaging.unsubscribe('SET_THEME', useTheme)
  }
}
