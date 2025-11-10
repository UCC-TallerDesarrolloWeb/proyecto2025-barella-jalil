/**
 * Botón estilizado que navega internamente con react-router.
 * @param {{texto:string, ruta:string, block?:boolean}} props
 * @returns {JSX.Element}
 */

import { useNavigate } from "react-router-dom";

function Boton({ texto, ruta, clase = "btn-asesoramiento" }) {
  const navigate = useNavigate();

  return (
    <button className={clase} onClick={() => navigate(ruta)}>
      {texto}
    </button>
  );
}

export default Boton;
