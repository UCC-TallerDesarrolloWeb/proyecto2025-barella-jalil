import { Link } from "react-router-dom";
import icHerramienta from "@/assets/iconos/herramienta.png";
/**
 * Detalle de servicio: Instalación Profesional.
 * @returns {JSX.Element}
 */
export default function ServiciosInstalacion() {
  return (
    <main className="servicio-page servicio-page--instal">
      {/* icono decorativo arriba-izquierda */}
      <img
        className="servicio-page__icon"
        src={icHerramienta}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <section className="container servicio-page__content" aria-labelledby="titulo-instal">
        <h1 id="titulo-instal">INSTALACIÓN PROFESIONAL</h1>

        <p>
          En esta sección el usuario puede solicitar la instalación de accesorios o piezas
          en su vehículo, tanto si fueron adquiridos a través de Procraft Parts como de
          manera particular. El equipo técnico realiza la instalación aplicando protocolos
          de seguridad y precisión, asegurando un resultado óptimo y compatible con cada
          modelo. Además, se ofrece asesoramiento previo para definir el tipo de
          instalación más conveniente según el uso del vehículo.
        </p>

        <Link className="btn-asesoramiento" to="/asesoramiento">
          Solicitar asesoramiento
        </Link>
      </section>
    </main>
  );
}
