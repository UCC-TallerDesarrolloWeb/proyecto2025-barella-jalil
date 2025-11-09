function Asesoramiento() {
  return (
    <section className="asesoramiento">
      <h1>Asesoramiento personalizado</h1>
      <p>Completá el siguiente formulario y te ayudamos con tu proyecto.</p>

      <form id="form-asesoramiento">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" placeholder="Tu nombre" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="tuemail@mail.com" />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Asesoramiento;
