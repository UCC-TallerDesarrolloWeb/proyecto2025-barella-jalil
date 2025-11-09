import { useEffect, useState } from "react";
import { crearConsulta } from "@/api/consultas";

/* Regex reutilizables */
const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const RE_LETRAS_NUM = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s-]+$/;
const RE_EMAIL = /^\S+@\S+\.\S+$/;
const RE_PATENTE = /^(?:[A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/; // ABC123 o AA123BB

const initial = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",   // 10 dígitos exactos
  marca: "",
  modelo: "",
  patente: "",
  uso: "",
  mejoras: [],
  importacion: "",
};

export default function Asesoramiento() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("");

  /* Prefill (email/teléfono) */
  useEffect(() => {
    const saved = localStorage.getItem("asesoramiento_prefill");
    if (saved) {
      try { setForm((f) => ({ ...f, ...JSON.parse(saved) })); } catch {}
    }
  }, []);

  /* --- Validación por campo --- */
  const validateField = (name, value, all = {}) => {
    const v = (value ?? "").toString().trim();
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

  /* --- Validación global (submit) --- */
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
    const { name, value } = e.target;

    // Normalizaciones por campo
    if (name === "telefono") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, telefono: onlyDigits }));
      if (touched.telefono) {
        setErrors((er) => ({ ...er, telefono: validateField("telefono", onlyDigits) }));
      }
      return;
    }

    if (name === "patente") {
      // Permití escribir libre pero validamos en vivo
      const val = value.toUpperCase();
      setForm((f) => ({ ...f, patente: val }));
      if (touched.patente) {
        setErrors((er) => ({ ...er, patente: validateField("patente", val) }));
      }
      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((er) => ({ ...er, [name]: validateField(name, value, { ...form, [name]: value }) }));
    }
  };

  const onChangeMejoras = (e) => {
    const { checked, value } = e.target;
    setForm((f) => {
      const set = new Set(f.mejoras);
      if (checked) set.add(value); else set.delete(value);
      const next = { ...f, mejoras: Array.from(set) };
      if (touched.mejoras) {
        setErrors((er) => ({ ...er, mejoras: validateField("mejoras", next.mejoras, next) }));
      }
      return next;
    });
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, form[name], form) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    // marcar todos como tocados y validar
    const allTouched = Object.keys(initial).reduce((acc, k) => (acc[k] = true, acc), {});
    setTouched(allTouched);

    const eObj = validateAll(form);
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      localStorage.setItem(
        "asesoramiento_prefill",
        JSON.stringify({ email: form.email, telefono: form.telefono })
      );

      await crearConsulta(form);
      setStatus("✅ Consulta enviada. ¡Te contactamos a la brevedad!");
      setForm(initial);
      setErrors({});
      setTouched({});
    } catch {
      setStatus("❌ No se pudo enviar. Probá de nuevo.");
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre" name="nombre" value={form.nombre}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("nombre")} autoComplete="given-name"
                  />
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    id="apellido" name="apellido" value={form.apellido}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("apellido")} autoComplete="family-name"
                  />
                  {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email" value={form.email}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("email")} autoComplete="email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono (10 dígitos) *</label>
                  <input
                    id="telefono" name="telefono" inputMode="numeric" maxLength={10}
                    value={form.telefono} onChange={onChange} onBlur={onBlur}
                    className={cls("telefono")} placeholder="3511234567"
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>
              </div>
            </div>

            {/* --- Información del Vehículo --- */}
            <div className="form-seccion">
              <h2>Información del Vehículo</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="marca">Marca *</label>
                  <input
                    id="marca" name="marca" value={form.marca}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("marca")}
                  />
                  {errors.marca && <span className="error-message">{errors.marca}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="modelo">Modelo *</label>
                  <input
                    id="modelo" name="modelo" value={form.modelo}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("modelo")}
                  />
                  {errors.modelo && <span className="error-message">{errors.modelo}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patente">Patente *</label>
                  <input
                    id="patente" name="patente" value={form.patente}
                    onChange={onChange} onBlur={onBlur}
                    className={cls("patente")} placeholder="ABC123 o AA123BB"
                  />
                  {errors.patente && <span className="error-message">{errors.patente}</span>}
                </div>

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
            </div>

            {/* --- Mejoras Deseadas --- */}
            <div className="form-seccion">
              <h2>Mejoras Deseadas</h2>

              <div className="form-group">
                <label>Me gustaría mejoras en:</label>
                <div className="checkbox-group">
                  {[
                    ["mecanicas", "Mecánicas"],
                    ["esteticas", "Estéticas"],
                    ["audio", "De audio"],
                    ["iluminacion", "De iluminación"],
                  ].map(([val, label]) => (
                    <label key={val} className="checkbox-label">
                      <input
                        type="checkbox" name="mejoras" value={val}
                        checked={form.mejoras.includes(val)}
                        onChange={onChangeMejoras}
                        onBlur={() => {
                          setTouched((t) => ({ ...t, mejoras: true }));
                          setErrors((er) => ({
                            ...er,
                            mejoras: validateField("mejoras", form.mejoras, form),
                          }));
                        }}
                      />{" "}
                      {label}
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
              <button type="submit" className="btn-enviar">SOLICITAR ASESORAMIENTO</button>
              <p className="form-status" aria-live="polite">{status}</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
