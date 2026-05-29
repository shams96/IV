const journeys = {
  renewal: {
    headline: 'A seven-night reset guided by diagnostics, sea minerals, and restorative movement.',
    accent: 'Salt room · Botanical sleep tea · Low-sun sailing',
  },
  celebration: {
    headline: 'An intimate occasion designed around fragrance, flowers, music, and golden-hour dining.',
    accent: 'Private piazza · Cellar pairing · Dawn swim',
  },
  residence: {
    headline: 'A discreet extended stay with your own wellness team, chef, boat, and island calendar.',
    accent: 'Harbor suite · Art concierge · Market garden',
  },
};

const revealElements = document.querySelectorAll('[data-reveal]');
const headline = document.querySelector('[data-journey-headline]');
const accent = document.querySelector('[data-journey-accent]');
const tabs = document.querySelectorAll('.journey__tab');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.journey;
    const journey = journeys[key];

    if (!journey || !headline || !accent) {
      return;
    }

    tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    headline.textContent = journey.headline;
    accent.textContent = journey.accent;
  });
});
