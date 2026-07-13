import { Link } from "react-router-dom";
import icCamion from "@/assets/iconos/camion.png";
/**
 * Detalle de servicio: Importación de Accesorios.
 * @returns {JSX.Element}
 */
const ServiciosImportacion = () => {
  return (
    <main className="servicio-page servicio-page--import">
      {/* icono decorativo arriba a la izquierda */}
      <img
        className="servicio-page__icon"
        src={icCamion}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <section className="container servicio-page__content" aria-labelledby="titulo-import">
        <h1 id="titulo-import">IMPORTACIÓN DE ACCESORIOS</h1>

        <p>
          En esta sección el usuario puede solicitar la importación de piezas o accesorios
          específicos para su vehículo. Debe indicar el nombre del artículo o una referencia
          visual para identificarlo con precisión. El equipo de Procraft Parts se encarga de
          gestionar la búsqueda, cotización, envío y seguimiento del pedido, garantizando que
          el accesorio llegue en condiciones y dentro del plazo acordado.
        </p>

        <Link className="btn-asesoramiento" to="/asesoramiento">
          Solicitar asesoramiento
        </Link>
      </section>
    </main>
  );
};

export default ServiciosImportacion;
