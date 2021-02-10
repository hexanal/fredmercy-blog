export default function({ element, control }) {
  control['more'].addEventListener('click', (e) => {
    e.preventDefault();
    element.classList.toggle('state-collapse-expand');
  });
}
