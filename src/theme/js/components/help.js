export default function({ control, messaging }) {
  control['help-big-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: 'yes' }) );
  control['help-normal-font'].addEventListener('click', () => messaging.dispatch({ id: 'A11Y_SET_LARGE_FONT', payload: 'no' }) );
}
