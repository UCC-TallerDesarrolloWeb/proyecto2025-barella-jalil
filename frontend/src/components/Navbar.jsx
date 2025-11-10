/**
 * Barra de navegación principal del sitio.
 * Marca el link activo y muestra CTA a Asesoramiento.
 * @returns {JSX.Element}
 */

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header" id="site-header">
      <div className="container header__wrap">
        <div className="header__left">
          <div className="logo">
            <NavLink to="/" aria-label="Ir al inicio">
              <img
                src="/imagenes/logos/logotipo 3.png"
                alt="Logotipo de PROCRAFT PARTS"
              />
            </NavLink>
          </div>

          <h1 id="site-title" className="site-title">
            <NavLink to="/">PROCRAFT PARTS</NavLink>
          </h1>
        </div>

        <nav id="nav" className="menu" role="navigation">
          <ul className="menu__list">
            <li><NavLink to="/" end>INICIO</NavLink></li>
            <li><NavLink to="/servicios">SERVICIOS</NavLink></li>
            <li><NavLink to="/proyectos">PROYECTOS</NavLink></li>
            <li><NavLink to="/quienes">¿QUIÉNES SOMOS?</NavLink></li>
            <li><NavLink to="/asesoramiento" className="btn-asesoramiento">
              SOLICITAR ASESORAMIENTO
            </NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="linea-naranja" aria-hidden="true"></div>
    </header>
  );
}

export default Navbar;
