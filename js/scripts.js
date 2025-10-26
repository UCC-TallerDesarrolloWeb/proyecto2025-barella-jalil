

(() => {
  const f = document.getElementById('form-asesoramiento');
  if (!f) return;

  const $ = (id) => document.getElementById(id);

  /** 
   * Muestra un error en el campo.
   * @method error
   * @param {string} id  Id del input
   * @param {string} msg Mensaje a mostrar
   * @return void
   */
  const error = (id, msg) => {
    const g = $(id)?.closest('.form-group');
    g && g.classList.add('input-error');
    const s = $('error-' + id);
    if (s) s.textContent = msg;
  };

  /** 
   * Limpia el error del campo.
   * @method ok
   * @param {string} id  Id del input
   * @return void
   */
  const ok = (id) => {
    const g = $(id)?.closest('.form-group');
    g && g.classList.remove('input-error');
    const s = $('error-' + id);
    if (s) s.textContent = '';
  };

  /** 
   * Reglas simples.
   * @method isEmail
   * @param {string} v
   * @return {boolean}
   */
  const isEmail   = (v) => /.+@.+\..+/.test((v || '').trim());
  const isPhone10 = (v) => /^\d{10}$/.test((v || '').trim());
  const isPatente = (v) => /^(?:[A-Za-z]{3}\d{3}|[A-Za-z]{2}\d{3}[A-Za-z]{2})$/.test((v || '').toUpperCase());

  f.addEventListener('submit', (e) => {
    e.preventDefault();

    // limpiar estados previos
    ['nombre','apellido','email','telefono','marca','modelo','patente','uso','importacion'].forEach(ok);
    const spanMejoras = $('error-mejoras');
    if (spanMejoras) spanMejoras.textContent = '';

    const get = (id) => (($(id)?.value) || '').trim();
    let todoOk = true;

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

    if (!todoOk) return;

    alert('¡Recibimos tu solicitud! Te contactamos a la brevedad.');
    f.reset();
  });
})();
