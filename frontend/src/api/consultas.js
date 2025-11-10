
const API = "http://localhost:3001";   // puerto del json-server

/**
 * Crea una nueva consulta.
 * @param {Object} consulta - Datos del formulario de asesoramiento.
 * @param {string} consulta.nombre
 * @param {string} consulta.apellido
 * @param {string} consulta.email
 * @param {string} consulta.telefono
 * @param {string} consulta.marca
 * @param {string} consulta.modelo
 * @param {string} consulta.patente
 * @param {("urbano"|"rural"|"ruta")} consulta.uso
 * @param {string[]} consulta.mejoras
 * @param {string} consulta.importacion
 * @returns {Promise<Object>} Consulta creada (incluye id).
 */

export async function crearConsulta(data) {
  const r = await fetch(`${API}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('Error POST');
  return r.json();
}
