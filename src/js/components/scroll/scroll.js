const HAS_SCROLLED_THRESHOLD = 5; // pixels scrolled before slapping on the `scrolled` data attribute

// TODO overengineer, much?
export default function() {
  const state = { scrollY: 0 };

  const onScroll = e => {
    const { scrollY } = window;

    state.scrollY = scrollY;
    document.documentElement.dataset.scrolled = state.scrollY > HAS_SCROLLED_THRESHOLD;
  }

  document.addEventListener('scroll', onScroll);
}
