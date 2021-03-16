import Storage from '../tools/Storage'

const DEFAULT_THEME = 'june'

export default function({element, messaging}) {
  const availableThemes = []

  const useTheme = function( id ) {
    const themeId = !availableThemes.includes( id ) ? DEFAULT_THEME : id

    Storage.set('selected_theme', themeId)
    document.documentElement.dataset.theme = themeId
    element.value = themeId
    setFavicon()
  }

  const initThemes = function() {
    element.querySelectorAll('option').forEach( opt => availableThemes.push( opt.value ) )
    element.addEventListener('change', e => messaging.dispatch({id:'SET_THEME', payload: e.target.value }) )
    useTheme( Storage.get('selected_theme') ) // manage "saved" theme, in localstorage
  }

  const setFavicon = function() {
    const color = window.getComputedStyle( document.documentElement ).getPropertyValue('--color-primary')
    const colorString = color.trim().substr(1)
    const svgString = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle fill=%22%23${ colorString }%22 cx=%2250%22 cy=%2250%22 r=%2250%22/></svg>`
    const favIcon = document.querySelector('[rel="icon"]')
    favIcon.setAttribute('href', '')
    favIcon.setAttribute('href', svgString)
  }

  initThemes()

  messaging.subscribe('SET_THEME', useTheme)

  return function() {
    messaging.unsubscribe('SET_THEME', useTheme)
  }
}
