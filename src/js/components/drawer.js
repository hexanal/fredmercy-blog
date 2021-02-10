export default function({ element, control }) {
  control['toggle'].addEventListener('click', (e) => {
    element.classList.toggle('state-drawer-expand');
  });
}
