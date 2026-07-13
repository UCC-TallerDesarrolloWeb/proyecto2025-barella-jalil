
const Proyectos = () => {
  return (
    <main className="proyectos" aria-labelledby="proyectos-title">
      <section className="container" aria-label="Galería de proyectos">
        <h2 id="proyectos-title">Proyectos recientes</h2>

        <div className="galeria__grid">
          {/* 1) VIDEO */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <video
                className="galeria__media"
                controls
                preload="metadata"
                playsInline
              >
                <source src="/videos/luz.webm" type="video/webm" />
                <source src="/videos/luz.mp4" type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            </div>
            <figcaption className="galeria__caption">
              Iluminación LED: barras y faros auxiliares instalados
            </figcaption>
          </figure>

          {/* 2 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ramb/frente.png"
                alt="Barras LED y faros auxiliares"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Ópticas importadas, ganchos y parrillas (acabado Rust-Oleum)
            </figcaption>
          </figure>

          {/* 3 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ram/rack.png"
                alt="Racks y portaequipajes"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Rack + portaequipajes + caja de herramientas
            </figcaption>
          </figure>

          {/* 4 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ram/fenderlargo.jpg"
                alt="Protectores y fenders"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Fenders y protectores con setup de cubiertas
            </figcaption>
          </figure>

          {/* 5 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/abarth/abarth 1.jpg"
                alt="Centro de llanta y óptica en fibra"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Centro de llanta Abarth negro y centro de óptica en fibra de
              carbono
            </figcaption>
          </figure>

          {/* 6 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/bmw/stereo.jpg"
                alt="Instalación de stereo"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Instalación de stereo para BMW
            </figcaption>
          </figure>

          {/* 7 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ram/RAMLUCES.png"
                alt="Parrilla personalizada con luces"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Parrilla personalizada con luces, barra led y paragolpes en negro
              mate
            </figcaption>
          </figure>

          {/* 8 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ram/esc-m.jpg"
                alt="Escape Akrapovic"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Escape Akrapovic importado
            </figcaption>
          </figure>

          {/* 9 */}
          <figure className="galeria__item">
            <div className="galeria__frame">
              <img
                className="galeria__media"
                src="imagenes/ram/letras y opticas-g.jpg"
                alt="Letras y ópticas"
                loading="lazy"
              />
            </div>
            <figcaption className="galeria__caption">
              Letras y paragolpes en negro mate; instalación de ópticas
              importadas
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Proyectos;
