/**
 * Pie del sitio con línea naranja y redes.
 * @returns {JSX.Element}
 */

const Footer = () => {
  return (
    <footer className="footer" id="site-footer" role="contentinfo">
      <div className="linea-naranja" aria-hidden="true"></div>

      <div className="container footer__wrap">
        <p>PROCRAFT PARTS. Todos los derechos reservados.</p>

        <ul className="social" aria-label="Redes sociales">
          <li>
            <a
              href="https://www.instagram.com/procraftparts?igsh=MW1vNzJveGpmYjlwdQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de PROCRAFT PARTS"
            >
              <svg className="social__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.75 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6Z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
