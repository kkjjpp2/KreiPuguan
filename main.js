(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll-reveal animations (.reveal & .reveal.wipe)
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.06 }
      );
      reveals.forEach((el) => revealObserver.observe(el));
    }
  }

  // 2. Hero number count-up ([data-count])
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target) || reducedMotion) return;

    const duration = 900;
    const delay = 850; // matches .callout entrance delay in styles.css
    el.textContent = '0';

    setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  });

  // 3. Top scroll progress bar & section scroll-spy
  const progressBar = document.querySelector('.progress');
  const spyLinks = [...document.querySelectorAll('.mast nav a[data-spy]')];
  const spySections = spyLinks
    .map((link) => ({
      link,
      section: document.getElementById(link.dataset.spy),
    }))
    .filter((item) => item.section);

  let ticking = false;
  const updateOnScroll = () => {
    ticking = false;

    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    if (spySections.length) {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let activeId = null;

      if (atBottom) {
        activeId = spySections[spySections.length - 1].section.id;
      } else {
        const triggerY = window.scrollY + 140;
        for (const { section } of spySections) {
          if (section.offsetTop <= triggerY) {
            activeId = section.id;
          }
        }
      }

      spyLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.spy === activeId);
      });
    }
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateOnScroll);
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  updateOnScroll();

  // 4. Copy buttons in Contact section
  document.querySelectorAll('.copy[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
      }

      const original = btn.textContent;
      btn.textContent = 'Copied';
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(() => {
        btn.textContent = original;
      }, 1600);
    });
  });

  // 5. Smooth page-leave transition between pages
  if (!reducedMotion) {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => {
        window.location.href = link.href;
      }, 210);
    });

    window.addEventListener('pageshow', () => {
      document.body.classList.remove('leaving');
    });
  }
})();
