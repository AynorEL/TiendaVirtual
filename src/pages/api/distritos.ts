import { NextApiRequest, NextApiResponse } from "next";
import distritos from "../../../public/json/distritos.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { province_id } = req.query; // Obtenemos el ID de la provincia desde la query
  if (req.method === "GET") {
    if (province_id) {
      // Filtrar los distritos por el ID de la provincia
      const distritosFiltrados = distritos.filter(
        (distrito) => distrito.province_id === province_id
      );
      res.status(200).json(distritosFiltrados); // Retornar los distritos filtrados
    } else {
      res.status(400).json({ message: "Falta el parámetro 'province_id'" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
