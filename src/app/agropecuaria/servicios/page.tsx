"use client";
import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar"; // Asegúrate de importar tu Navbar correctamente
import { CurrencyDollarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'; // Iconos de Heroicons

interface Servicio {
  id_servicio: number;
  nombre_servicio: string;
  descripcion: string;
  precio: number;
  duracion: string;
  tipo_servicio: string;
}

const ServiciosPage = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await fetch('/api/servicios');
        const data: Servicio[] = await res.json();
        setServicios(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sección de servicios */}
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-gray-100 py-12">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-green-800">Nuestros Servicios Agropecuarios</h1>
        
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {servicios.map(servicio => (
            <div key={servicio.id_servicio} className="relative border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out bg-white p-6">
              <h2 className="text-2xl font-bold mb-3 text-green-700">{servicio.nombre_servicio}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{servicio.descripcion}</p>
              
              {/* Detalles con iconos */}
              <div className="flex items-center mb-3">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600 mr-2" />
                <p className="text-gray-800 font-semibold text-lg">Precio: S/. {servicio.precio}</p>
              </div>
              
              <div className="flex items-center mb-3">
                <ClockIcon className="h-6 w-6 text-green-600 mr-2" />
                <p className="text-gray-600 text-md">Duración: {servicio.duracion}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <TagIcon className="h-6 w-6 text-green-600 mr-2" />
                <p className="text-gray-500 text-sm">Tipo: {servicio.tipo_servicio}</p>
              </div>
              
              {/* Botón de acción */}
              <button className="absolute bottom-4 right-4 bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300">
                Más información
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiciosPage;
