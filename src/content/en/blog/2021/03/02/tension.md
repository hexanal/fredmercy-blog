---
title: Tension
description: wound up tight!
type: post
---

`10:15am:` Working on this website is one of the joys of my life. But raising a child is an amazing adventure, too! In a way I think the process of working on my little house-on-the-web is very similar.

<style>
.evolve {
  display: flex; justify-content: space-around; align-items: center;
  padding: 2rem 0;
}
.evolve svg {
  --delay: -200ms;
  animation: evolveBob 800ms ease-in-out alternate-reverse infinite;
  animation-delay: var(--delay);
}
.evolve svg:nth-child(1) { width: 2%; animation-delay: calc(5 * var(--delay)); }
.evolve svg:nth-child(2) { width: 4%; animation-delay: calc(4 * var(--delay)); }
.evolve svg:nth-child(3) { width: 6%; animation-delay: calc(3 * var(--delay));}
.evolve svg:nth-child(4) { width: 8%; animation-delay: calc(2 * var(--delay)); }
.evolve svg:nth-child(5) { width: 10%; animation-delay: calc(1 * var(--delay)); }

@keyframes evolveBob {
  from { transform: translateY(1rem); }
  to { transform: translateY(-1rem); }
}
</style>

<div class="evolve">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="var(--color-primary)" cx="50" cy="50" r="50" /></svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="var(--color-subdued)" cx="50" cy="50" r="50" /></svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="var(--color-extra)" cx="50" cy="50" r="50" /></svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="var(--color-secondary)" cx="50" cy="50" r="50" /></svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="var(--color-active)" cx="50" cy="50" r="50" /></svg>
</div>

It's evolving, slowly. It's a lot of frustration, and it's exhausting at times. It's a learning experience for everyone involved, and sometimes it's counter-intuitive. But it's also a lot of small victories, discoveries, beautiful moments, and heart-warming memories we will cherish forever. It's a deeply personal endeavor.

This website is still in its infancy, too! And it's going to be bilingual. Right now, it doesn't say much that makes sense, if it says anything at all; but eventually I want this website to be a reflection of our local culture: effortlessly switching between French and English. It should always be on the edge, oscillating between knowledgeable talk and unabashed ignorance, mixing profound thoughts and lowbrowed vulgarity.

Its motto: _“Embrace the chaos”_

`7:52pm:` Ok. Deploying the website's i18n version tonight!
