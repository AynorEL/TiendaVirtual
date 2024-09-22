"use client"; // Asegúrate de que este componente sea interactivo en Next.js

import React, { useState, useEffect } from 'react';
import Carrito from './Carrito'; // Asegúrate de que esta ruta sea correcta según tu estructura de carpetas
import Link from 'next/link';
import { HomeIcon, PhoneIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import './../globals.css'; 

const Page: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Marca que el componente está montado
  }, []);

  // Evitar renderizar la página hasta que el componente esté montado
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar con enlaces */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 md:space-x-6">
            <img src="/images/logoAgro.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold">AgroTienda</h1>
          </div>

          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row items-center md:space-x-6">
              <li className="mt-2 md:mt-0">
                <Link href="/" className="flex items-center hover:text-green-300">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Inicio
                </Link>
              </li>
              <li className="mt-2 md:mt-0">
                <Link href="/productos" className="flex items-center hover:text-green-300">
                  <ShoppingCartIcon className="h-5 w-5 mr-1" />
                  Productos
                </Link>
              </li>
              <li className="mt-2 md:mt-0">
                <Link href="/contacto" className="flex items-center hover:text-green-300">
                  <PhoneIcon className="h-5 w-5 mr-1" />
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mostrar contenido del carrito */}
      <main className="container mx-auto p-4 md:p-8">
        <Carrito />
      </main>
    </div>
  );
};

export default Page;
