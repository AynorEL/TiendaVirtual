import { NextApiRequest, NextApiResponse } from "next";
import provincias from "../../../public/json/provincias.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(provincias); // Enviar el JSON de provincias
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
