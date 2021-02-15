import Storage from '../tools/Storage'

const DEFAULT_THEME = 'june'

export default function({element, messaging}) {
  const availableThemes = []

  const useTheme = function( id ) {
    const themeId = !availableThemes.includes( id ) ? DEFAULT_THEME : id

    Storage.set('selected_theme', themeId)
    document.documentElement.dataset.theme = themeId
    element.value = themeId
  }

  const initThemes = function() {
    element.querySelectorAll('option').forEach( opt => availableThemes.push( opt.value ) )
    element.addEventListener('change', e => useTheme( e.target.value ) )
    useTheme( Storage.get('selected_theme') ) // manage "saved" theme, in localstorage
  }

  initThemes()

  messaging.subscribe('SET_THEME', useTheme)

  return function() {
    messaging.unsubscribe('SET_THEME', useTheme)
  }
}
