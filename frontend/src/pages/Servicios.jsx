import { Link } from "react-router-dom";



function Servicios() {
  return (
    <main className="servicios" aria-labelledby="servicios-title">
      {/* Cabecera visual de la sección (el header global ya lo tenés en el layout) */}
      <div className="linea-naranja" aria-hidden="true" />

      <section className="container" aria-labelledby="servicios-title">
        <h2 id="servicios-title">Nuestros Servicios</h2>

        <div className="servicios__grid">
          <article className="serv-card">
            <img
              src="/imagenes/iconos/comentario.png"
              alt="Asesoramiento personalizado"
              loading="lazy"
            />
            <h3>Asesoramiento Personalizado</h3>
            <p>
              Te guiamos en la elección de accesorios y soluciones a medida
              según tu vehículo y uso real.
            </p>
            <Link className="btn-asesoramiento" to="/asesoramiento">
              Ver más
            </Link>
          </article>

          <article className="serv-card">
            <img
              src="/imagenes/iconos/camion.png"
              alt="Importación de accesorios"
              loading="lazy"
            />
            <h3>Importación de Accesorios</h3>
            <p>
              Traemos marcas y modelos específicos bajo pedido, con gestión
              completa de logística.
            </p>
            <Link className="btn-asesoramiento" to="/servicios/importacion">
              Ver más
            </Link>
          </article>

          <article className="serv-card">
            <img
              src="/imagenes/iconos/herramienta.png"
              alt="Instalación profesional"
              loading="lazy"
            />
            <h3>Instalación Profesional</h3>
            <p>
              Montaje prolijo y seguro, con garantía y estándares de taller para
              4x4 y autos deportivos.
            </p>
            <Link className="btn-asesoramiento" to="/servicios/instalacion">
              Ver más
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Servicios;
