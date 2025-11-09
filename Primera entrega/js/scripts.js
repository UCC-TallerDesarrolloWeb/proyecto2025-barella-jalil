/**
 * Validaciones del formulario de asesoramiento.
 * 
 * @module formAsesoramiento
 * @description
 * Este script valida todos los campos del formulario con id `form-asesoramiento`.
 * Si hay errores, los muestra en pantalla; si no, muestra un mensaje de éxito y limpia el formulario.
 */
(() => {
  const f = document.getElementById('form-asesoramiento');
  if (!f) return;

  /**
   * Devuelve el elemento con el id indicado.
   * @function $
   * @param {string} id - Id del elemento.
   * @returns {HTMLElement|null} Elemento encontrado o null si no existe.
   */
  const $ = (id) => document.getElementById(id);

  /**
   * Muestra un error en el campo.
   * @function error
   * @param {string} id - Id del input con error.
   * @param {string} msg - Mensaje de error a mostrar.
   * @returns {void}
   */
  const error = (id, msg) => {
    const g = $(id)?.closest('.form-group');
    g && g.classList.add('input-error');
    const s = $('error-' + id);
    if (s) s.textContent = msg;
  };

  /**
   * Limpia el error del campo.
   * @function ok
   * @param {string} id - Id del input a limpiar.
   * @returns {void}
   */
  const ok = (id) => {
    const g = $(id)?.closest('.form-group');
    g && g.classList.remove('input-error');
    const s = $('error-' + id);
    if (s) s.textContent = '';
  };

  /**
   * Valida formato de correo electrónico.
   * @function isEmail
   * @param {string} v - Cadena a validar.
   * @returns {boolean} True si es un email válido.
   */
  const isEmail = (v) => /.+@.+\..+/.test((v || '').trim());

  /**
   * Valida número de teléfono (10 dígitos).
   * @function isPhone10
   * @param {string} v - Número a validar.
   * @returns {boolean} True si tiene 10 dígitos.
   */
  const isPhone10 = (v) => /^\d{10}$/.test((v || '').trim());

  /**
   * Valida formato de patente argentina (ABC123 o AA123BB).
   * @function isPatente
   * @param {string} v - Patente a validar.
   * @returns {boolean} True si cumple el formato.
   */
  const isPatente = (v) =>
    /^(?:[A-Za-z]{3}\d{3}|[A-Za-z]{2}\d{3}[A-Za-z]{2})$/.test((v || '').toUpperCase());

  /**
   * Maneja el evento submit del formulario y valida todos los campos.
   * @event submit
   * @param {SubmitEvent} e - Evento de envío del formulario.
   * @returns {void}
   */
  f.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar errores previos
    ['nombre','apellido','email','telefono','marca','modelo','patente','uso','importacion'].forEach(ok);
    const spanMejoras = $('error-mejoras');
    if (spanMejoras) spanMejoras.textContent = '';

    // Función auxiliar para obtener valores de inputs
    const get = (id) => (($(id)?.value) || '').trim();
    let todoOk = true;

    //  Validaciones individuales
    if (!get('nombre'))   { error('nombre','Ingresá tu nombre.'); todoOk = false; }
    if (!get('apellido')) { error('apellido','Ingresá tu apellido.'); todoOk = false; }

    const email = get('email');
    if (!isEmail(email))  { error('email','Email inválido.'); todoOk = false; }

    const tel = get('telefono').replace(/\D/g, '');
    if (!isPhone10(tel))  { error('telefono','Teléfono de 10 dígitos.'); todoOk = false; }

    if (!get('marca'))    { error('marca','Ingresá la marca.'); todoOk = false; }
    if (!get('modelo'))   { error('modelo','Ingresá el modelo.'); todoOk = false; }

    const pat = get('patente').toUpperCase().replace(/[^A-Z0-9]/g,'');
    if (!isPatente(pat))  { error('patente','Patente ABC123 o AA123BB.'); todoOk = false; }

    if (!get('uso'))      { error('uso','Seleccioná el uso.'); todoOk = false; }

    const mejoras = Array.from(f.querySelectorAll('input[name="mejoras"]:checked'));
    if (mejoras.length === 0) {
      if (spanMejoras) spanMejoras.textContent = 'Seleccioná al menos una mejora.';
      todoOk = false;
    }

    const imp = get('importacion');
    if (imp.length < 10)  { error('importacion','Mínimo 10 caracteres.'); todoOk = false; }

    // Si hay errores, cortar ejecución
    if (!todoOk) return;

    // Si todo está correcto, mostrar mensaje y resetear formulario
    alert('¡Recibimos tu solicitud! Te contactamos a la brevedad.');
    f.reset();
  });
})();
