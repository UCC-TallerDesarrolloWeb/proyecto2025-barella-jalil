
const API = "http://localhost:3001";   // puerto del json-server
export async function crearConsulta(data) {
  const r = await fetch(`${API}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error('Error POST');
  return r.json();
}
