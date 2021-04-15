export default function({ control, events }) {
  control['help-big-font'].addEventListener('click', () => events.dispatch('A11Y_SET_LARGE_FONT', 'yes') )
  control['help-normal-font'].addEventListener('click', () => events.dispatch('A11Y_SET_LARGE_FONT', 'no') )
}
