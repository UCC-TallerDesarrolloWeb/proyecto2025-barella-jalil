/**
 * Botón estilizado que navega internamente con react-router.
 * @param {{texto:string, ruta:string, block?:boolean}} props
 * @returns {JSX.Element}
 */

import { useNavigate } from "react-router-dom";

const Boton = (props) => {
  const navigate = useNavigate();
  const clase = props.clase ? props.clase : "btn-asesoramiento";

  return (
    <button className={clase} onClick={() => navigate(props.ruta)}>
      {props.texto}
    </button>
  );
};

export default Boton;
