import { useEffect, useState } from "react";
import { crearConsulta } from "@/api/consultas";

/* Regex reutilizables */
const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const RE_LETRAS_NUM = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s-]+$/;
const RE_EMAIL = /^\S+@\S+\.\S+$/;
const RE_PATENTE = /^(?:[A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/; // ABC123 o AA123BB

/**
 * Copia todas las propiedades de un objeto en uno nuevo (sin usar spread).
 * @param {Object} obj - objeto a copiar
 * @returns {Object} copia del objeto
 */
const copiarObjeto = (obj) => {
  const copia = {};
  for (const clave in obj) {
    copia[clave] = obj[clave];
  }
  return copia;
};

/**
 * Estado inicial del formulario de asesoramiento.
 * @type {Object}
 */

const initial = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  marca: "",
  modelo: "",
  patente: "",
  uso: "",
  mejoras: [],
  importacion: "",
};

/* Opciones de mejoras deseadas */
const OPCIONES_MEJORAS = [
  ["mecanicas", "Mecánicas"],
  ["esteticas", "Estéticas"],
  ["audio", "De audio"],
  ["iluminacion", "De iluminación"],
];

/* Campos de texto de "Información Personal" */
const CAMPOS_PERSONALES = [
  { name: "nombre", label: "Nombre *", autoComplete: "given-name" },
  { name: "apellido", label: "Apellido *", autoComplete: "family-name" },
  { name: "email", label: "Email *", type: "email", autoComplete: "email" },
  { name: "telefono", label: "Teléfono (10 dígitos) *", maxLength: 10, placeholder: "3511234567" },
];

/* Campos de texto de "Información del Vehículo" */
const CAMPOS_VEHICULO = [
  { name: "marca", label: "Marca *" },
  { name: "modelo", label: "Modelo *" },
  { name: "patente", label: "Patente *", placeholder: "ABC123 o AA123BB" },
];

/**
 * Página de "Solicitar Asesoramiento".
 * Implementa:
 * - Formulario controlado con useState
 * - Validación en vivo y al enviar
 * - Persistencia parcial en localStorage (prefill)
 * - Envío al mock API (json-server)
 * @returns {JSX.Element}
 */

const Asesoramiento = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("asesoramiento_prefill");
    if (saved) {
      try {
        const datosGuardados = JSON.parse(saved);
        setForm((f) => {
          const nuevo = copiarObjeto(f);
          for (const clave in datosGuardados) {
            nuevo[clave] = datosGuardados[clave];
          }
          return nuevo;
        });
      } catch (e) {
          console.error("Error al leer datos guardados", e);
      }

    }
  }, []);

  const validateField = (name, value, all = {}) => {
    const v = (value || "").toString().trim();
    switch (name) {
      case "nombre":
      case "apellido":
        if (!v) return "Requerido";
        if (!RE_SOLO_LETRAS.test(v)) return "Sólo letras y espacios";
        return "";

      case "email":
        if (!v) return "Requerido";
        if (!RE_EMAIL.test(v)) return "Email inválido";
        return "";

      case "telefono": {
        if (v.length !== 10) return "Deben ser exactamente 10 dígitos";
        return "";
      }

      case "marca":
        if (!v) return "Requerido";
        if (!RE_SOLO_LETRAS.test(v)) return "Sólo letras y espacios";
        return "";

      case "modelo":
        if (!v) return "Requerido";
        if (!RE_LETRAS_NUM.test(v)) return "Sólo letras, números, espacios o -";
        return "";

      case "patente": {
        const pat = v.replace(/\s+/g, "").toUpperCase();
        if (!pat) return "Requerido";
        if (!RE_PATENTE.test(pat)) return "Formato: ABC123 o AA123BB";
        return "";
      }

      case "uso":
        if (!v) return "Seleccioná un uso";
        return "";

      case "importacion":
        if (!v) return "Contanos qué te gustaría importar";
        return "";

      case "mejoras":
        if (!Array.isArray(all.mejoras) || all.mejoras.length === 0) {
          return "Elegí al menos una opción";
        }
        return "";

      default:
        return "";
    }
  };

/**
 * Valida todo el formulario y devuelve un objeto de errores por campo.
 * Se usa tanto onBlur/onChange como en el submit.
 * @param {Object} d - Datos actuales del formulario.
 * @returns {Record<string,string>} Mapa campo->mensaje de error.
 */
  const validateAll = (data) => {
    const e = {};
    for (const k of Object.keys(initial)) {
      const msg = validateField(k, data[k], data);
      if (msg) e[k] = msg;
    }
    return e;
  };

  /* --- Handlers de cambio --- */
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Si el usuario vuelve a completar el formulario, ocultamos el cartel anterior
    if (status) {
      setStatus("");
      setStatusType("");
    }

    // Normalizaciones por campo
    if (name === "telefono") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => {
        const nuevo = copiarObjeto(f);
        nuevo.telefono = onlyDigits;
        return nuevo;
      });
      if (touched.telefono) {
        setErrors((er) => {
          const nuevo = copiarObjeto(er);
          nuevo.telefono = validateField("telefono", onlyDigits);
          return nuevo;
        });
      }
      return;
    }

    if (name === "patente") {
      // Permití escribir libre pero validamos en vivo
      const val = value.toUpperCase();
      setForm((f) => {
        const nuevo = copiarObjeto(f);
        nuevo.patente = val;
        return nuevo;
      });
      if (touched.patente) {
        setErrors((er) => {
          const nuevo = copiarObjeto(er);
          nuevo.patente = validateField("patente", val);
          return nuevo;
        });
      }
      return;
    }

    setForm((f) => {
      const nuevo = copiarObjeto(f);
      nuevo[name] = value;
      return nuevo;
    });
    if (touched[name]) {
      setErrors((er) => {
        const nuevo = copiarObjeto(er);
        const formActualizado = copiarObjeto(form);
        formActualizado[name] = value;
        nuevo[name] = validateField(name, value, formActualizado);
        return nuevo;
      });
    }
  };

  const onChangeMejoras = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (status) {
      setStatus("");
      setStatusType("");
    }

    setForm((f) => {
      const mejorasNuevas = f.mejoras.slice();
      if (checked) {
        mejorasNuevas.push(value);
      } else {
        const index = mejorasNuevas.indexOf(value);
        if (index !== -1) mejorasNuevas.splice(index, 1);
      }

      const next = copiarObjeto(f);
      next.mejoras = mejorasNuevas;

      if (touched.mejoras) {
        setErrors((er) => {
          const nuevoEr = copiarObjeto(er);
          nuevoEr.mejoras = validateField("mejoras", mejorasNuevas, next);
          return nuevoEr;
        });
      }

      return next;
    });
  };

  const onBlur = (e) => {
    const name = e.target.name;
    setTouched((t) => {
      const nuevo = copiarObjeto(t);
      nuevo[name] = true;
      return nuevo;
    });
    setErrors((er) => {
      const nuevo = copiarObjeto(er);
      nuevo[name] = validateField(name, form[name], form);
      return nuevo;
    });
  };

  const onBlurMejoras = () => {
    setTouched((t) => {
      const nuevo = copiarObjeto(t);
      nuevo.mejoras = true;
      return nuevo;
    });
    setErrors((er) => {
      const nuevo = copiarObjeto(er);
      nuevo.mejoras = validateField("mejoras", form.mejoras, form);
      return nuevo;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setStatusType("");

    // marcar todos como tocados y validar
    const allTouched = Object.keys(initial).reduce((acc, k) => (acc[k] = true, acc), {});
    setTouched(allTouched);

    const eObj = validateAll(form);
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    const confirmado = confirm("¿Estás seguro de enviar la consulta?");
    if (!confirmado) return;

    try {
      localStorage.setItem(
        "asesoramiento_prefill",
        JSON.stringify({ email: form.email, telefono: form.telefono })
      );

      await crearConsulta(form);
      setStatus("✅ Consulta enviada. ¡Te contactamos a la brevedad!");
      setStatusType("success");
      setForm(initial);
      setErrors({});
      setTouched({});
    } catch {
      setStatus("❌ No se pudo enviar. Probá de nuevo.");
      setStatusType("error");
    }
  };

  /* Helper para clases de error */
  const cls = (name) => errors[name] ? "input error" : "input";

  return (
    <main className="asesoramiento-main">
      <section className="hero-asesoramiento">
        <div className="container">
          <h1>SOLICITAR ASESORAMIENTO</h1>
          <p>Completá el formulario y nos contactaremos a la brevedad</p>
        </div>
      </section>

      <section className="formulario-asesoramiento">
        <div className="container">
          <form className="formulario" onSubmit={onSubmit} noValidate>
            {/* --- Información Personal --- */}
            <div className="form-seccion">
              <h2>Información Personal</h2>

              {CAMPOS_PERSONALES.map((campo) => (
                <div className="form-group" key={campo.name}>
                  <label htmlFor={campo.name}>{campo.label}</label>
                  <input
                    id={campo.name} name={campo.name} type={campo.type || "text"}
                    value={form[campo.name]} onChange={onChange} onBlur={onBlur}
                    className={cls(campo.name)}
                    autoComplete={campo.autoComplete}
                    maxLength={campo.maxLength}
                    placeholder={campo.placeholder}
                  />
                  {errors[campo.name] && <span className="error-message">{errors[campo.name]}</span>}
                </div>
              ))}
            </div>

            {/* --- Información del Vehículo --- */}
            <div className="form-seccion">
              <h2>Información del Vehículo</h2>

              {CAMPOS_VEHICULO.map((campo) => (
                <div className="form-group" key={campo.name}>
                  <label htmlFor={campo.name}>{campo.label}</label>
                  <input
                    id={campo.name} name={campo.name}
                    value={form[campo.name]} onChange={onChange} onBlur={onBlur}
                    className={cls(campo.name)}
                    placeholder={campo.placeholder}
                  />
                  {errors[campo.name] && <span className="error-message">{errors[campo.name]}</span>}
                </div>
              ))}

              <div className="form-group">
                <label htmlFor="uso">Uso principal *</label>
                <select
                  id="uso" name="uso" value={form.uso}
                  onChange={onChange} onBlur={onBlur}
                  className={cls("uso")}
                >
                  <option value="">Seleccionar uso</option>
                  <option value="urbano">Urbano</option>
                  <option value="rural">Rural</option>
                  <option value="ruta">Ruta</option>
                </select>
                {errors.uso && <span className="error-message">{errors.uso}</span>}
              </div>
            </div>

            {/* --- Mejoras Deseadas --- */}
            <div className="form-seccion">
              <h2>Mejoras Deseadas</h2>

              <div className="form-group">
                <label>Me gustaría mejoras en:</label>
                <div className="checkbox-group">
                  {OPCIONES_MEJORAS.map((opcion) => (
                    <label key={opcion[0]} className="checkbox-label">
                      <input
                        type="checkbox" name="mejoras" value={opcion[0]}
                        checked={form.mejoras.includes(opcion[0])}
                        onChange={onChangeMejoras}
                        onBlur={onBlurMejoras}
                      />{" "}
                      {opcion[1]}
                    </label>
                  ))}
                </div>
                {errors.mejoras && <span className="error-message">{errors.mejoras}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="importacion">Importación de accesorios *</label>
                <textarea
                  id="importacion" name="importacion" value={form.importacion}
                  onChange={onChange} onBlur={onBlur}
                  className={cls("importacion")}
                  placeholder="Describí qué accesorios te gustaría importar..."
                />
                {errors.importacion && <span className="error-message">{errors.importacion}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-asesoramiento">Enviar formulario</button>
              {status && (
                <p className={"form-status form-status--" + statusType} aria-live="polite">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Asesoramiento;
