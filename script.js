// ano no footer
const elAno = document.getElementById('ano');
if (elAno) elAno.textContent = new Date().getFullYear();

// menu mobile
const ham = document.querySelector('.hamburger');
const menu = document.getElementById('menu');
if (ham && menu) {
  ham.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    ham.setAttribute('aria-expanded', String(open));
  });
}

// randomiza leve atraso/duração do brilho para cada .shine
document.querySelectorAll('.shine').forEach((el) => {
  const delay = (Math.random() * 3).toFixed(2) + 's';
  const dur = (5 + Math.random() * 3).toFixed(2) + 's';
  el.style.setProperty('--shine-delay', delay);
  el.style.setProperty('--shine-duration', dur);
});

// Lightbox simples
const lightbox = document.getElementById('lightbox');
const lbImg = document.querySelector('.lightbox-img');
const lbCap = document.querySelector('.lightbox-caption');
const lbClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const src = img.getAttribute('data-full') || img.src;
    const cap = img.closest('.gallery-item').querySelector('figcaption')?.textContent || '';
    lbImg.src = src;
    lbImg.alt = img.alt || 'Projeto';
    lbCap.textContent = cap;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
// ===== CONTADORES ANIMADOS =====
const counters = document.querySelectorAll('.count');
const speed = 80; // menor número = mais rápido

const animateCounter = (el) => {
  const direction = el.dataset.direction || 'up';
  const target = +el.dataset.target;
  const start = +el.dataset.start || 0;
  let current = direction === 'down' ? start : 0;

  const update = () => {
    if (direction === 'up') {
      const increment = Math.ceil(target / speed);
      if (current < target) {
        current += increment;
        el.textContent = current;
        setTimeout(update, 30);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    } else {
      const decrement = Math.ceil((start - target) / speed);
      if (current > target) {
        current -= decrement;
        el.textContent = current;
        setTimeout(update, 40);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
        el.closest('.metric').setAttribute('data-zero', 'true');
      }
    }
  };
  update();
};

// ativa só quando a seção entra na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.count').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const metricsSection = document.querySelector('#quem-somos');
if (metricsSection) observer.observe(metricsSection);

const closeLB = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
};
lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
