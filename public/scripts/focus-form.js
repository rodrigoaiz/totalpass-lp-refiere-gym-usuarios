
    function handleHeroFormToggle() {
      const heroForm = document.getElementById('hero-form');
      const body = document.body;
      const closeButton = heroForm.querySelector('.modal-close');

      // Verificar si estamos en desktop (768px+)
      if (window.innerWidth >= 1279) {
        // Comportamiento modal en desktop
        if (heroForm.classList.contains('modal-active')) {
          // Cerrar modal
          heroForm.classList.remove('modal-active');
          body.classList.remove('modal-open');
          closeButton.style.display = 'none';
        } else {
          // Abrir modal
          heroForm.classList.add('modal-active');
          body.classList.add('modal-open');
          closeButton.style.display = 'flex';
        }
      } else {
        // Comportamiento normal en móvil - hacer scroll al formulario
        closeButton.style.display = 'none';
        heroForm.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Cerrar modal al hacer clic fuera del formulario
    document.addEventListener('click', function(event) {
      const heroForm = document.getElementById('hero-form');
      const heroButton = document.querySelector('.hero-cta button');
      const closeButton = heroForm.querySelector('.modal-close');

      if (window.innerWidth >= 768 && heroForm.classList.contains('modal-active')) {
        // Si el clic no fue en el formulario ni en el botón, cerrar modal
        if (!heroForm.contains(event.target) && event.target !== heroButton) {
          heroForm.classList.remove('modal-active');
          document.body.classList.remove('modal-open');
          closeButton.style.display = 'none';
        }
      }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        const heroForm = document.getElementById('hero-form');
        const closeButton = heroForm.querySelector('.modal-close');
        if (heroForm.classList.contains('modal-active')) {
          heroForm.classList.remove('modal-active');
          document.body.classList.remove('modal-open');
          closeButton.style.display = 'none';
        }
      }
    });

    // Reajustar comportamiento al cambiar el tamaño de ventana
    window.addEventListener('resize', function() {
      const heroForm = document.getElementById('hero-form');
      const closeButton = heroForm.querySelector('.modal-close');
      if (window.innerWidth < 768 && heroForm.classList.contains('modal-active')) {
        // Si cambiamos a móvil, quitar el modal
        heroForm.classList.remove('modal-active');
        document.body.classList.remove('modal-open');
        closeButton.style.display = 'none';
      }
    });
