import Servicio from '../../models/servicios'; // Importa el modelo de servicios

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const servicios = await Servicio.findAll(); // Obtiene todos los servicios
      res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los servicios', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
