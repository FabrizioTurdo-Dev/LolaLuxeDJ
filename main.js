/**
 * ============================================================
 * main.js — Lola Luxe EPK
 * Funcionalidades: Cursor custom, Nav sticky, Smooth scroll,
 * ScrollReveal, Neon pulse, Logo blink
 *
 * Escrito en JS moderno (ES6+), sin dependencias externas.
 * Listo para migrar a React/Vite: cada módulo es una función
 * pura que puede convertirse en un custom hook o componente.
 * ============================================================
 */

'use strict';

/* ────────────────────────────────────────────────────────────
   MÓDULO 1 — Cursor Personalizado
   Sigue al mouse con un punto rosa neón y un anillo de trail.
   En React: useEffect + useRef
   ──────────────────────────────────────────────────────────── */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');

  if (!cursor || !trail) return;

  // Solo activar en dispositivos con mouse real
  if (!window.matchMedia('(hover: hover)').matches) return;

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;
  let rafId   = null;

  // Seguimiento inmediato del punto
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top  = `${mouseY}px`;
  });

  // Trail suavizado con requestAnimationFrame
  function animateTrail() {
    // Lerp (interpolación lineal) para efecto suave
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;

    trail.style.left = `${trailX}px`;
    trail.style.top  = `${trailY}px`;

    rafId = requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover sobre elementos interactivos — expande el cursor
  const interactives = document.querySelectorAll(
    'a, button, .btn, .press-card, .social-link, .stat-card, .tag'
  );

  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      trail.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      trail.classList.remove('is-hover');
    });
  });

  // Ocultar al salir de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity  = '1';
  });

  // Cleanup si se desmonta (para React)
  return () => {
    cancelAnimationFrame(rafId);
  };
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 2 — Nav Sticky / Scrolled
   La cabecera se vuelve opaca al bajar el scroll.
   En React: useEffect + window.addEventListener
   ──────────────────────────────────────────────────────────── */
function initStickyNav() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const SCROLL_THRESHOLD = 80; // px antes de activar el estado opaco

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Ejecutar al inicio en caso de que ya esté scrolleado
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 3 — Menú Mobile (hamburguesa)
   Toggle del menú en pantallas pequeñas.
   ──────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en cualquier link
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 4 — Smooth Scroll
   Navegación suave hacia secciones del documento.
   En React: usar react-scroll o el hook nativo con behavior
   ──────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  const NAV_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '70',
    10
  );

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 5 — Scroll Reveal (Intersection Observer)
   Anima elementos al entrar en el viewport.
   En React: custom hook useScrollReveal
   ──────────────────────────────────────────────────────────── */
function initScrollReveal() {
  // Verificar soporte de IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar todos los elementos inmediatamente
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Pequeño delay para efecto escalonado entre hijos
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);

          // Dejar de observar una vez revelado
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // Visible cuando el 12% del elemento está en el viewport
      rootMargin: '0px 0px -60px 0px', // Trigger un poco antes del borde inferior
    }
  );

  // Observar todos los elementos con data-reveal
  document.querySelectorAll('[data-reveal]').forEach((el, index) => {
    // Agregar delay escalonado automático si hay múltiples elementos en una sección
    if (!el.dataset.revealDelay) {
      el.dataset.revealDelay = index * 80; // 80ms entre cada elemento
    }
    observer.observe(el);
  });
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 6 — Neon Pulse en Botones (hover JS)
   Agrega clase de pulso neón al pasar el mouse.
   Complementa las transiciones CSS.
   ──────────────────────────────────────────────────────────── */
function initNeonPulse() {
  const neonButtons = document.querySelectorAll('.btn-primary');

  neonButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('btn-pulse');
    });

    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('btn-pulse');
    });
  });
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 7 — Logo Neon Blink ocasional
   Efecto de parpadeo neón random en el logo del hero.
   En React: useEffect con setInterval
   ──────────────────────────────────────────────────────────── */
function initLogoBlink() {
  const heroTitle = document.querySelector('.hero-title .neon-glow');
  const logoText  = document.getElementById('logoText');

  function triggerBlink(element) {
    if (!element) return;
    element.classList.add('neon-blink');
    // Remover clase después de que la animación termina
    element.addEventListener('animationend', () => {
      element.classList.remove('neon-blink');
    }, { once: true });
  }

  // Blink aleatorio en el hero title (cada 5-12 segundos)
  function scheduleBlink() {
    const delay = 5000 + Math.random() * 7000;
    setTimeout(() => {
      triggerBlink(heroTitle);
      scheduleBlink(); // Volver a agendar
    }, delay);
  }

  // Iniciar después de 3s para no interrumpir la entrada
  setTimeout(scheduleBlink, 3000);
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 8 — Actualizar año en footer
   ──────────────────────────────────────────────────────────── */
function initCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 9 — Lazy load de iframes (performance)
   Reemplaza src vacíos con data-src al ser visibles.
   ──────────────────────────────────────────────────────────── */
function initLazyIframes() {
  if (!('IntersectionObserver' in window)) return;

  const iframes = document.querySelectorAll('iframe[data-src]');
  if (iframes.length === 0) return;

  const iframeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.dataset.src;
          iframeObserver.unobserve(iframe);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );

  iframes.forEach((iframe) => iframeObserver.observe(iframe));
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 10 — Parallax sutil en Hero
   Mueve el video de fondo levemente al hacer scroll.
   ──────────────────────────────────────────────────────────── */
function initHeroParallax() {
  const heroVideo = document.querySelector('.hero-video');
  const heroBg    = document.querySelector('.hero-bg');

  if (!heroVideo && !heroBg) return;

  // Solo en desktop con capacidad de hover (no mobile)
  if (!window.matchMedia('(hover: hover)').matches) return;

  let lastScrollY = 0;
  let ticking     = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const target  = heroVideo || heroBg;

    // Mover el fondo a 0.3x la velocidad del scroll (efecto parallax)
    target.style.transform = `translateY(${scrollY * 0.3}px)`;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}


/* ────────────────────────────────────────────────────────────
   MÓDULO 11 — Highlight activo en nav al hacer scroll
   Marca el link del nav correspondiente a la sección visible.
   ──────────────────────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.style.color = 'var(--text-light)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '70', 10)}px 0px 0px 0px`,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}


/* ────────────────────────────────────────────────────────────
   INICIALIZACIÓN — DOMContentLoaded
   Ejecutar todos los módulos cuando el DOM esté listo.
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  initCurrentYear();
  initCustomCursor();
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();

  // Animaciones & efectos
  initScrollReveal();
  initNeonPulse();
  initLogoBlink();
  initHeroParallax();
  initActiveNav();
  initLazyIframes();

  // Log para debug (remover en producción)
  console.log('%c LOLA LUXE EPK ', 'background:#FF1493;color:#000;font-weight:bold;font-size:16px;padding:4px 8px;');
  console.log('%c Techno & Melodic Journey — Monte Grande, Buenos Aires ', 'color:#FF1493;font-size:11px;');
});
