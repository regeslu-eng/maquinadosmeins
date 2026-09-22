document.documentElement.classList.add('js');

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const serviceDetails = [...document.querySelectorAll('.service-list details')];
serviceDetails.forEach((item, i) => item.addEventListener('toggle', () => {
  if (!item.open) return;
  serviceDetails.forEach(other => { if (other !== item) other.open = false; });
  const serviceImage = document.getElementById('service-image');
  serviceImage.src = item.dataset.image;
  serviceImage.classList.remove('photo-enter');
  void serviceImage.offsetWidth;
  serviceImage.classList.add('photo-enter');
  serviceImage.alt = item.querySelector('summary').textContent.replace(/[0-9+]/g, '').trim();
  document.getElementById('service-caption').textContent = item.dataset.caption;
  document.getElementById('service-num').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(serviceDetails.length).padStart(2, '0');
}));

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('service').value = link.dataset.service;
  });
});

const galleryModal = document.getElementById('gallery-modal');
const galleryTitle = document.getElementById('gallery-modal-title');
const galleryCopy = document.getElementById('gallery-modal-copy');
const galleryImage = document.getElementById('gallery-modal-image');
const galleryCounter = document.getElementById('gallery-modal-counter');
const galleryThumbs = document.getElementById('gallery-modal-thumbs');
const galleryPrev = galleryModal.querySelector('.prev');
const galleryNext = galleryModal.querySelector('.next');
let activeGallery = [];
let activeIndex = 0;

function renderGallery(index) {
  if (!activeGallery.length) return;
  activeIndex = (index + activeGallery.length) % activeGallery.length;
  galleryImage.src = activeGallery[activeIndex];
  galleryImage.alt = `${galleryTitle.textContent} · imagen ${activeIndex + 1}`;
  galleryCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeGallery.length).padStart(2, '0')}`;
  [...galleryThumbs.querySelectorAll('button')].forEach((button, idx) => {
    button.classList.toggle('active', idx === activeIndex);
    button.setAttribute('aria-current', idx === activeIndex ? 'true' : 'false');
  });
}

function openGallery(trigger) {
  activeGallery = (trigger.dataset.gallery || '').split('|').filter(Boolean);
  if (!activeGallery.length) return;
  galleryTitle.textContent = trigger.dataset.title || 'Proyecto';
  galleryCopy.textContent = trigger.dataset.copy || '';
  galleryThumbs.innerHTML = '';
  activeGallery.forEach((src, idx) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<img src="${src}" alt="Miniatura ${idx + 1} de ${galleryTitle.textContent}">`;
    button.addEventListener('click', () => renderGallery(idx));
    galleryThumbs.appendChild(button);
  });
  renderGallery(0);
  galleryModal.showModal();
}

document.querySelectorAll('.gallery-launch').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openGallery(trigger);
  });
});

galleryPrev.addEventListener('click', () => renderGallery(activeIndex - 1));
galleryNext.addEventListener('click', () => renderGallery(activeIndex + 1));
galleryModal.querySelector('.close').addEventListener('click', () => galleryModal.close());
galleryModal.addEventListener('click', event => { if (event.target === galleryModal) galleryModal.close(); });
document.addEventListener('keydown', event => {
  if (!galleryModal.open) return;
  if (event.key === 'ArrowLeft') renderGallery(activeIndex - 1);
  if (event.key === 'ArrowRight') renderGallery(activeIndex + 1);
});

const quoteForm = document.getElementById('quote');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !message) return;
  const service = document.getElementById('service').value;
  const text = `Hola MEINS, soy ${name}. Me gustaría cotizar: ${service}.\n\nDetalles del proyecto: ${message}`;
  window.open('https://wa.me/526674209996?text=' + encodeURIComponent(text), '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
