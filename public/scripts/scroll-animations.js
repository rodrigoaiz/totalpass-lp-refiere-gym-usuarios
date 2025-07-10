// Intersection Observer para animaciones de scroll
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Solo observar una vez para mejor rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos los elementos con clase scroll-animate
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(el => observer.observe(el));
});
