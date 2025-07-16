// Cookie Alert Management - Salesforce Compatible
class CookieAlert {
  constructor(options = {}) {
    // Configuración por defecto
    this.config = {
      cookieName: 'totalpass_cookies_accepted',
      cookieExpireDays: 365,
      debugMode: false, // Activar para desarrollo
      forceShow: false, // Forzar mostrar siempre (para debug)
      salesforceMode: false, // Para integración con Salesforce
      privacyPolicyUrl: 'https://totalpass.com/mx/aviso-de-privacidad',
      ...options
    };

    this.init();
  }

  init() {
    // Debug: mostrar estado actual
    if (this.config.debugMode) {
      console.log('🍪 Cookie Alert - Estado actual:', {
        cookieValue: this.getCookie(this.config.cookieName),
        forceShow: this.config.forceShow,
        salesforceMode: this.config.salesforceMode
      });
    }

    // Mostrar si no se han aceptado las cookies O si está en modo debug
    if (!this.getCookie(this.config.cookieName) || this.config.forceShow) {
      this.createCookieAlert();
      this.showCookieAlert();
    }

    // Exponer métodos globalmente para Salesforce
    if (this.config.salesforceMode) {
      window.TotalPassCookies = {
        accept: () => this.acceptCookies(),
        decline: () => this.declineCookies(),
        reset: () => this.resetCookies(),
        getStatus: () => this.getCookieStatus(),
        forceShow: () => this.forceShowAlert()
      };
    }
  }

  createCookieAlert() {
    const alertHTML = `
      <div id="cookie-alert" class="cookie-alert">
        <div class="cookie-alert-content">
          <div class="cookie-alert-text">
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies.
            <a href="${this.config.privacyPolicyUrl}" target="_blank" rel="noopener noreferrer">Más información</a></p>
          </div>
          <div class="cookie-alert-actions">
            <button class="cookie-alert-button cookie-alert-accept" onclick="cookieAlert.acceptCookies()">
              Aceptar
            </button>
            <button class="cookie-alert-button cookie-alert-decline" onclick="cookieAlert.declineCookies()">
              Rechazar
            </button>
            ${this.config.debugMode ? '<button class="cookie-alert-button cookie-alert-reset" onclick="cookieAlert.resetCookies()" style="background: #ff6b6b; color: white;">Reset (Debug)</button>' : ''}
          </div>
        </div>
      </div>
    `;

    // Insertar el alert al final del body
    document.body.insertAdjacentHTML('beforeend', alertHTML);
  }

  showCookieAlert() {
    setTimeout(() => {
      const alert = document.getElementById('cookie-alert');
      if (alert) {
        alert.classList.add('show');

        if (this.config.debugMode) {
          console.log('🍪 Cookie Alert mostrado');
        }
      }
    }, 1000);
  }

  hideCookieAlert() {
    const alert = document.getElementById('cookie-alert');
    if (alert) {
      alert.classList.add('hide');
      alert.classList.remove('show');

      setTimeout(() => {
        alert.remove();

        if (this.config.debugMode) {
          console.log('🍪 Cookie Alert ocultado y removido');
        }
      }, 400);
    }
  }

  acceptCookies() {
    this.setCookie(this.config.cookieName, 'accepted', this.config.cookieExpireDays);
    this.hideCookieAlert();

    // Activar tracking/analytics aquí
    this.enableTracking();

    if (this.config.debugMode) {
      console.log('✅ Cookies aceptadas');
    }

    // Callback para Salesforce
    if (this.config.salesforceMode && window.onCookiesAccepted) {
      window.onCookiesAccepted();
    }
  }

  declineCookies() {
    this.setCookie(this.config.cookieName, 'declined', this.config.cookieExpireDays);
    this.hideCookieAlert();

    // Desactivar tracking no esencial
    this.disableTracking();

    if (this.config.debugMode) {
      console.log('❌ Cookies rechazadas');
    }

    // Callback para Salesforce
    if (this.config.salesforceMode && window.onCookiesDeclined) {
      window.onCookiesDeclined();
    }
  }

  // Método para resetear cookies (útil para debug)
  resetCookies() {
    this.deleteCookie(this.config.cookieName);

    if (this.config.debugMode) {
      console.log('🔄 Cookies reseteadas - recargando página...');
    }

    // Recargar página después de un pequeño delay
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // Método para forzar mostrar el alert (útil para debug)
  forceShowAlert() {
    // Remover alert existente si existe
    const existingAlert = document.getElementById('cookie-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    this.createCookieAlert();
    this.showCookieAlert();

    if (this.config.debugMode) {
      console.log('🍪 Alert forzado a mostrarse');
    }
  }

  // Obtener estado actual de cookies
  getCookieStatus() {
    const value = this.getCookie(this.config.cookieName);
    return {
      hasConsent: !!value,
      consentType: value || 'none', // 'accepted', 'declined', or 'none'
      timestamp: new Date().toISOString()
    };
  }

  // Activar tracking (integrar con Google Analytics, Facebook Pixel, etc.)
  enableTracking() {
    if (this.config.debugMode) {
      console.log('📊 Tracking activado');
    }

    // Aquí puedes activar Google Analytics, Facebook Pixel, etc.
    // Ejemplo para Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //   gtag('consent', 'update', {
    //     'analytics_storage': 'granted',
    //     'ad_storage': 'granted'
    //   });
    // }
  }

  // Desactivar tracking no esencial
  disableTracking() {
    if (this.config.debugMode) {
      console.log('🚫 Tracking desactivado');
    }

    // Aquí puedes desactivar tracking no esencial
    // Ejemplo para Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //   gtag('consent', 'update', {
    //     'analytics_storage': 'denied',
    //     'ad_storage': 'denied'
    //   });
    // }
  }

  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;

    // Para Salesforce, también usar Secure si está en HTTPS
    if (this.config.salesforceMode && window.location.protocol === 'https:') {
      document.cookie = cookieString + ';Secure';
    } else {
      document.cookie = cookieString;
    }

    if (this.config.debugMode) {
      console.log('🍪 Cookie establecida:', cookieString);
    }
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name) {
    // Método 1: Fecha Unix Epoch (1970) - método tradicional
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Método 2: Max-Age=0 (método moderno) - expira inmediatamente
    document.cookie = `${name}=; Max-Age=0; path=/;`;

    // Método 3: Para mayor compatibilidad, también intentar borrar con diferentes paths
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

    // Para Salesforce, también intentar con Secure
    if (this.config.salesforceMode && window.location.protocol === 'https:') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;`;
    }

    if (this.config.debugMode) {
      console.log('🗑️ Cookie eliminada con múltiples métodos:', name);
    }
  }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Detectar si estamos en modo debug por parámetro URL o localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const debugMode = urlParams.get('cookie_debug') === 'true' || localStorage.getItem('cookie_debug') === 'true';
  const forceShow = urlParams.get('cookie_force') === 'true';

  // Configuración para diferentes entornos
  const config = {
    debugMode: debugMode,
    forceShow: forceShow,
    salesforceMode: window.location.hostname.includes('salesforce') || window.location.hostname.includes('force.com')
  };

  window.cookieAlert = new CookieAlert(config);

  // Métodos de debug globales para la consola
  if (debugMode) {
    window.cookieDebug = {
      show: () => window.cookieAlert.forceShowAlert(),
      reset: () => window.cookieAlert.resetCookies(),
      status: () => console.log(window.cookieAlert.getCookieStatus()),
      enable: () => localStorage.setItem('cookie_debug', 'true'),
      disable: () => localStorage.removeItem('cookie_debug')
    };

    console.log('🍪 Cookie Debug Mode activado. Usa cookieDebug.show(), cookieDebug.reset(), etc.');
  }
});
