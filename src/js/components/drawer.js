import reefer, { onReef, SPRING_TIGHT, SPRING_SOFT } from '../tools/reefer'
import debounce from 'lodash.debounce'

const MIN_OPACITY = 0.25
const MIN_HEIGHT = 0
const LABEL_INACTIVE = 'read more (+)'
const LABEL_ACTIVE = 'less (-)'

export default function({ element }) {
  const state = {
    expanded: false,
    animation: {
      height: reefer(MIN_HEIGHT),
      y: reefer(1.5),
      opacity: reefer(MIN_OPACITY)
    }
  }

  const init = function() {
    state.toggler = getToggler()
    state.heightContainer = getHeightContainer()
    state.wrap = getContentWrapper()

    element.innerHTML = ''

    element.classList.add('drawer')
    element.appendChild( state.heightContainer )
    state.heightContainer.appendChild( state.wrap )
    element.appendChild( state.toggler )

    window.addEventListener('resize', debounce(onResize, 200) )

    onReef( () => {
      state.heightContainer.style.height = `${ state.animation.height.get() }px`
      state.wrap.style.opacity = state.animation.opacity.get()
      state.wrap.style.transform = `translateY( ${state.animation.y.get()}rem )`
    })
  }

  const onResize = function() {
    if ( !state.expanded ) return

    const newHeight = state.wrap.offsetHeight
    state.animation.height.set( newHeight, SPRING_SOFT )
  }

  const getHeightContainer = function() {
    const container = document.createElement('div')

    container.classList.add('drawer__container')

    return container
  }

  const getContentWrapper = function() {
    const content = element.innerHTML
    const wrap = document.createElement('div')

    wrap.classList.add('drawer__wrap')
    wrap.innerHTML = content

    return wrap
  }

  const getToggler = function() {
    const toggler = document.createElement('button')

    toggler.classList.add('drawer__btn')
    toggler.classList.add('button')
    toggler.setAttribute('type', 'button')
    toggler.textContent = LABEL_INACTIVE

    toggler.addEventListener('click', expand)

    return toggler
  }

  const expand = (e) => {
    state.expanded = !state.expanded

    state.toggler.textContent = state.expanded ? LABEL_ACTIVE : LABEL_INACTIVE
    element.classList.toggle('state-drawer-expand', state.expanded)

    const newHeight = state.expanded ? state.wrap.offsetHeight : MIN_HEIGHT
    const newOpacity = state.expanded ? 1 : MIN_OPACITY
    const newTranslateY = state.expanded ? 0 : 2
    const spring = state.expanded ? SPRING_TIGHT : SPRING_SOFT

    state.animation.height.set(newHeight, spring)
    state.animation.opacity.set(newOpacity, spring)
    state.animation.y.set( newTranslateY, spring)
  }

  init()
}
