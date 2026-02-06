/**
 * Página “Quiénes Somos”.
 * Breve presentación + valores diferenciales.
 * @returns {JSX.Element}
 */

import { Link } from "react-router-dom";

export default function QuienesSomos() {
  return (
    <main id="quienes-somos" className="about">
      {/* separador visual, ya tenés el estilo de .linea-naranja */}
      <div className="linea-naranja" aria-hidden="true" />

      <section className="container">
        <h1 className="about__title">Quiénes Somos</h1>

        <div className="grid grid--dos">
          {/* Columna texto */}
          <div>
            <p className="about__text">
              Somos Lucas y Juan, ingenieros graduados en la UTN (uno mecánico y el otro informático).
              Nuestra pasión por los fierros nos llevó a dedicarnos de lleno al mundo de la{" "}
              <strong>personalización de vehículos</strong>. Decidimos diferenciarnos ofreciendo
              una instalación profesional y cercana, realizada en la casa del cliente: vos no tenés
              que mover tu vehículo; <strong>nosotros vamos, asesoramos y lo dejamos listo</strong>.
            </p>

            <h2>Qué hacemos</h2>
            <p className="about__text">
              Importamos accesorios específicos bajo pedido, realizamos instalaciones con
              protocolo de taller y damos <strong>asesoramiento personalizado</strong> para que el
              upgrade sea funcional a tu uso (urbano, ruta o off-road).
            </p>

            <h2>Nuestros valores</h2>
            <ul>
              <li><strong>Calidad</strong>: trabajamos con piezas y proveedores confiables.</li>
              <li><strong>Seguridad</strong>: instalación con estándares técnicos y garantía.</li>
              <li><strong>Transparencia</strong>: presupuesto claro y seguimiento del pedido.</li>
              <li><strong>Servicio</strong>: vamos hasta donde estés para que no pierdas tiempo.</li>
            </ul>

              <div className="mt-16">
              <Link className="btn-asesoramiento" to="/asesoramiento">
                Solicitar asesoramiento
              </Link>
            </div>
          </div>

          {/* Columna imagen (reutilizás una que ya usaste en Home) */}
          <figure>
            <img className="img-rounded"
              src="/imagenes/quienes/quienes-somos.png"
              alt="Equipo Procraft Parts en una instalación"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
