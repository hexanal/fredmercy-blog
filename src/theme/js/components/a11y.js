import Mousetrap from 'mousetrap';

export default function({ events }) {
  const state = {
    zoomed: window.localStorage.getItem('a11y_use_zoom') || 'no'
  }

  document.documentElement.classList.toggle('a11y_use_zoom', state.zoomed === 'yes')

  const setZoom = function(zoomed) {
    document.documentElement.classList.toggle('a11y_use_zoom', zoomed === 'yes')
    window.localStorage.setItem('a11y_use_zoom', zoomed)
  }

  events.on('A11Y_SET_LARGE_FONT', setZoom)

  Mousetrap.bind('=', () => setZoom('yes') )
  Mousetrap.bind('-', () => setZoom('no') )
}
