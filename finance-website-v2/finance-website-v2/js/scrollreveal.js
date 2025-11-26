const slideLeft = {
  distance: '50px',
  origin: 'left',
  opacity: 0,
  delay: 200,
  duration: 700,
  reset: true
};

const slideRight = {
  distance: '50px',
  origin: 'right',
  opacity: 0,
  delay: 200,
  duration: 700,
  reset: true
};

const slideUp = {
  distance: '40px',
  origin: 'bottom',
  opacity: 0,
  delay: 200,
  duration: 700,
  reset: true
};

ScrollReveal().reveal('.header-content-left', slideLeft);
ScrollReveal().reveal('.header-content-right', slideRight);

ScrollReveal().reveal('.app-preview-left', slideLeft);
ScrollReveal().reveal('.app-preview-right', slideRight);

ScrollReveal().reveal('.track-your-spending-left', slideLeft);
ScrollReveal().reveal('.track-your-spending-right', slideRight);

ScrollReveal().reveal('.get-in-touch-banner', slideUp);
ScrollReveal().reveal('.footer-container', slideUp);
