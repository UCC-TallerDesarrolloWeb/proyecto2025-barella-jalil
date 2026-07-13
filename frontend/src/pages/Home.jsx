import "@/styles/main.scss";
import Boton from "../components/Boton";

const Home = () => {
  return (
    <main className="home">
      

      {/* HERO */}
      <section className="hero" id="home-hero" aria-label="Portada">
        <div className="container hero__wrap">
          <div className="hero__texto">
            <h2>Accesorios y Proyectos a tu Medida</h2>
            <p>Instalación profesional y asesoramiento personalizado.</p>
             <Boton texto="Ver servicios" ruta="/servicios" />
          </div>
          <div className="hero__imagen">
          <img src="imagenes/inicio/carrusel_1.jpg" alt="Portada del vehículo" />
          </div>
        </div>
      <div className="linea-naranja" aria-hidden="true"></div>
      </section>

      {/* PROYECTOS */}
      <section className="proyectos-home" id="proyectos" aria-labelledby="titulo-proyectos-home">
        <div className="container">
          <header className="section__head">
            <h2 id="titulo-proyectos-home">Proyectos recientes</h2>
          </header>

          <div className="grid grid--galeria">
            <figure className="galeria__item">
              <a href="/proyectos" aria-label="Ver Proyecto 1 en la página de Proyectos">
               <img src="imagenes/ram/letras y opticas-g.jpg" alt="Proyecto Dodge Ram" />
              </a>
              <figcaption>Dodge Ram 1500</figcaption>
            </figure>

            <figure className="galeria__item">
              <a href="/proyectos" aria-label="Ver Proyecto 2 en la página de Proyectos">
              <img src="imagenes/abarth/abarth 1.jpg" alt="Proyecto Abarth" />
              </a>
              <figcaption>Fiat 595 Abarth</figcaption>
            </figure>
          </div>
        </div>
        <div className="linea-naranja" aria-hidden="true"></div>
      </section>

      {/* QUIENES SOMOS */}
      <section className="quienes-home" id="quienes" aria-labelledby="titulo-quienes-home">
        <div className="container grid grid--dos">
          <div>
            <h2 id="titulo-quienes-home">¿Quiénes somos?</h2>
            <p>Somos Lucas y Juan, ingenieros y familiares, con una gran pasión por los fierros.</p>
              <Boton texto="Conocer mas" ruta="/quienes" />
          </div>
          <div>
            <img
              src="imagenes/quienes/quienes-somos.png"
              alt="Nuestro equipo de trabajo"
              loading="lazy"
            />
          </div>
        </div>
      </section>


    </main>
  );
};

export default Home;
