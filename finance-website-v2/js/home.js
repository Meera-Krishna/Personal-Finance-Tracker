const body = document.querySelector('body');
const nav = document.getElementById('nav');
const openBtn = document.getElementById('menu-open');
const closeBtn = document.getElementById('menu-close');
const loader = document.querySelector('.loader-overlay');

const menu = {
  open() {
    nav.classList.add('open');
    body.style.overflow = 'hidden';
  },
  close() {
    nav.classList.remove('open');
    body.style.overflow = 'auto';
  }
};

openBtn.addEventListener('click', () => menu.open());
closeBtn.addEventListener('click', () => menu.close());

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.close());
});

window.addEventListener('load', () => {
  if (loader) loader.style.display = 'none';
});
