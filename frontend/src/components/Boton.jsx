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
