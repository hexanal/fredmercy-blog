const HAS_SCROLLED_THRESHOLD = 5; // pixels scrolled before slapping on the `scrolled` data attribute

export default function(props) {
  const state = {
    scrollY: 0,
    scrollPastViewport: false,
  };

  const onScroll = e => {
    const { scrollY, innerHeight } = window;

    state.scrollY = scrollY;
    state.scrollPastViewport = scrollY >= innerHeight;

    document.documentElement.dataset.scrolled = state.scrollY > HAS_SCROLLED_THRESHOLD;
    document.documentElement.dataset.scrolledPastViewport = state.scrollPastViewport;
  }

  document.addEventListener('scroll', onScroll);
}
