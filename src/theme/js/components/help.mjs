export default function({ children, events }) {
  children['help-big-font'].addEventListener('click', () => events.dispatch('A11Y_SET_LARGE_FONT', 'yes') )
  children['help-normal-font'].addEventListener('click', () => events.dispatch('A11Y_SET_LARGE_FONT', 'no') )
}
