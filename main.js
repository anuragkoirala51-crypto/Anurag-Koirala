/* ====================================================
   ANURAG KOIRALA — PORTFOLIO MAIN.JS
   ==================================================== */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero fade-ups after loader hides
      document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 120);
      });
    }
  }, 1600);
});

/* ===== CUSTOM CURSOR ===== */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ===== PARTICLES CANVAS ===== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const NUM = 60;
  for (let i = 0; i < NUM; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,33,46,${p.alpha})`;
      ctx.fill();
    });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(224,33,46,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== TYPEWRITER ===== */
(function initTypewriter() {
  const el = document.getElementById('role-text');
  if (!el) return;
  const roles = ['Full Stack Developer', 'AI Explorer', 'Problem Solver', 'Web Builder'];
  let ri = 0, ci = roles[0].length, deleting = true;

  function tick() {
    const word = roles[ri];
    if (deleting) {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci <= 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
    } else {
      const next = roles[ri];
      ci++;
      el.textContent = next.slice(0, ci);
      if (ci >= next.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    }
    setTimeout(tick, deleting ? 38 : 68);
  }
  setTimeout(tick, 2000);
})();

/* ===== NAV: scroll effect + active links ===== */
(function initNav() {
  const nav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  // Active nav link on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
})();

/* ===== MOBILE MENU ===== */
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  });

  // Close on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ===== SCROLL FADE ANIMATIONS ===== */
(function initFadeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Don't observe hero fade-ups here (loader handles them)
  document.querySelectorAll('.fade-up:not(.hero .fade-up)').forEach(el => observer.observe(el));
})();

/* ===== COUNTER ANIMATION ===== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

/* ===== PROFICIENCY BARS ===== */
(function initProfBars() {
  const bars = document.querySelectorAll('.prof-bar-fill[data-width]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
})();

/* ===== PROJECT FILTER ===== */
(function initProjectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ===== SKILL CATEGORY FILTER ===== */
(function initSkillFilter() {
  const cats = document.querySelectorAll('.sk-cat');
  const items = document.querySelectorAll('.skill-item');

  cats.forEach(btn => {
    btn.addEventListener('click', () => {
      cats.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.cat;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

/* ===== PROJECT MODAL ===== */
(function initProjectModal() {
  const modal = document.getElementById('proj-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const content = document.getElementById('modal-content');
  if (!modal) return;

  const projectData = {
    'saatyatra': {
      name: 'SaatYatra',
      tag: 'Major Project — Full Stack',
      overview: 'A full-featured travel discovery, social content, and booking platform built to help people explore destinations, share trip content, and book travel experiences all in one place.',
      problem: 'Travelers often have to use multiple platforms to discover destinations, read social content, and book experiences. SaatYatra solves this by combining all three into a single cohesive product.',
      features: ['Destination discovery with rich media', 'Social trip content sharing', 'Integrated booking flow', 'User profiles and reviews', 'Search & filter system'],
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'JWT Auth'],
      contribution: 'Designed and built the full application architecture, implemented the discovery feed, social content system, and the multi-step booking flow.',
      challenges: 'Managing complex state across the booking flow and optimizing the discovery feed for performance with large datasets were the primary technical challenges.'
    },
    'ai-chat': {
      name: 'AI Chat Interface',
      tag: 'AI Integration — Next.js',
      overview: 'A sleek AI-powered chat application that integrates OpenAI\'s API with real-time response streaming, conversation history management, and a polished, responsive interface.',
      problem: 'Generic AI interfaces feel generic. This project focused on creating a premium chat experience with smooth streaming, history, and clean UX.',
      features: ['Real-time response streaming', 'Conversation history', 'Multiple chat sessions', 'Code block highlighting', 'Mobile-responsive design'],
      stack: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'React'],
      contribution: 'Full implementation from API integration to UI — including the streaming response handler and conversation state management.',
      challenges: 'Implementing smooth streaming responses and managing conversation context while keeping the UX snappy was the key technical challenge.'
    },
    'ecommerce': {
      name: 'E-Commerce Platform',
      tag: 'Full Stack — MERN',
      overview: 'A full-featured online store with product catalog, cart management, secure authentication, simulated payment flow, and an admin dashboard for managing products and orders.',
      problem: 'Built as a comprehensive learning project to master the complete MERN stack and understand real-world e-commerce architecture.',
      features: ['Product catalog with filters', 'Shopping cart & wishlist', 'JWT authentication', 'Admin dashboard', 'Order management', 'Payment flow simulation'],
      stack: ['React', 'Express.js', 'MongoDB', 'JWT', 'Node.js', 'Mongoose'],
      contribution: 'Built the complete frontend and backend, including the authentication system, product management, and order flow.',
      challenges: 'Designing a scalable data model for products with variants and implementing a secure, stateless auth system were the main challenges.'
    },
    'dashboard': {
      name: 'Analytics Dashboard',
      tag: 'Frontend — React',
      overview: 'An interactive analytics dashboard featuring dynamic charts, real-time data visualization, filter controls, and a fully responsive layout that works beautifully on any device.',
      problem: 'Demonstrating advanced React patterns and data visualization skills in a realistic business intelligence context.',
      features: ['Dynamic bar, line & pie charts', 'Date range filtering', 'KPI summary cards', 'Responsive grid layout', 'Dark theme design'],
      stack: ['React', 'Chart.js', 'CSS Grid', 'REST API', 'JavaScript'],
      contribution: 'Designed the full dashboard layout, integrated Chart.js with custom styling, and built the filter system with live data updates.',
      challenges: 'Building a truly responsive grid that works for complex chart layouts across screen sizes, and ensuring smooth chart animations.'
    }
  };

  function openModal(id) {
    const d = projectData[id];
    if (!d) return;
    content.innerHTML = `
      <p class="modal-proj-tag">${d.tag}</p>
      <h2 class="modal-proj-name" id="modal-title">${d.name}</h2>
      <div class="modal-section"><h4>Overview</h4><p>${d.overview}</p></div>
      <div class="modal-section"><h4>Problem & Solution</h4><p>${d.problem}</p></div>
      <div class="modal-section"><h4>Key Features</h4><ul>${d.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
      <div class="modal-section"><h4>Tech Stack</h4><div class="modal-chips">${d.stack.map(s => `<span class="chip">${s}</span>`).join('')}</div></div>
      <div class="modal-section"><h4>My Contribution</h4><p>${d.contribution}</p></div>
      <div class="modal-section"><h4>Challenges & Learnings</h4><p>${d.challenges}</p></div>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open on card click or detail button
  document.querySelectorAll('.proj-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(btn.dataset.id);
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

/* ===== CONTACT FORM ===== */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Clear errors
    ['name-err', 'email-err', 'msg-err'].forEach(id => setFieldError(id, ''));
    statusEl.textContent = ''; statusEl.className = 'form-status';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    let valid = true;
    if (!name) { setFieldError('name-err', 'Name is required.'); valid = false; }
    if (!email || !validateEmail(email)) { setFieldError('email-err', 'Valid email required.'); valid = false; }
    if (!message) { setFieldError('msg-err', 'Message is required.'); valid = false; }
    if (!valid) return;

    // Simulate async send
    submitBtn.disabled = true;
    submitBtn.querySelector('.submit-text').textContent = 'Sending…';
    await new Promise(r => setTimeout(r, 1400));

    statusEl.textContent = '✓ Message received! I\'ll get back to you within 1–2 days.';
    statusEl.className = 'form-status ok';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('.submit-text').textContent = 'Send Message';
  });
})();

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== CV DOWNLOAD (placeholder) ===== */
['download-cv', 'footer-cv'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Show a friendly notice since no actual CV file exists
      const orig = el.textContent.trim();
      el.style.opacity = '0.6';
      el.textContent = 'CV coming soon!';
      setTimeout(() => {
        el.style.opacity = '1';
        el.textContent = orig;
      }, 2000);
    });
  }
});

/* ===== BACK TO TOP ===== */
const backTop = document.getElementById('back-to-top');
if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== PROJ CARD MOUSE SPOTLIGHT ===== */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });
});
