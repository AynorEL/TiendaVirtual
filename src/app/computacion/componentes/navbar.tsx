"use client";

import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  HomeIcon,
  ServerIcon,
  WrenchIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface NavbarProps {
  onOpenContactModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Barra superior con información de contacto */}
      <div className="bg-gray-900 py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white px-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-1">
              <HomeIcon className="h-5 w-5 text-blue-400" />
              <p className="text-sm">
                Calle Amauta José Carlos Mariátegui La Chira N° 001 - San Marcos
                - Huari
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <EnvelopeIcon className="h-5 w-5 text-blue-400" />
              <p className="text-sm">espinozaleonaynor@gmail.com</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#">
              <span className="text-blue-400 hover:text-gray-300">f</span>
            </Link>
            <Link href="#">
              <span className="text-blue-400 hover:text-gray-300">in</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra principal con logotipo y menú */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center text-white px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/images/logoComputacion.png" alt="Logo" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold">CodeDesignNet</h1>
              <p className="text-sm text-gray-400">
                Soluciones informáticas y soporte técnico
              </p>
            </div>
          </div>

          {/* Botón de menú hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Contacto rápido */}
          <div className="hidden md:flex space-x-8 items-center">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-blue-400" />
              <p>+51 930 791 412</p>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-blue-400" />
              <p>Lun - Vie: 09:00 - 18:00</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={onOpenContactModal}
            >
              Envíenos un mensaje
            </button>
          </div>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Enlaces de navegación */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="flex items-center space-x-1 hover:text-gray-400">
              <HomeIcon className="h-5 w-5" />
              <span>INICIO</span>
            </Link>
            <Link
              href="#servicios"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <ServerIcon className="h-5 w-5" />
              <span>SERVICIOS</span>
            </Link>
            <Link
              href="#desarrollo"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <CogIcon className="h-5 w-5" />
              <span>DESARROLLO WEB</span>
            </Link>
            <Link
              href="#proyectos"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <WrenchIcon className="h-5 w-5" />
              <span>PROYECTOS</span>
            </Link>
            <Link
              href="#contacto"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>CONTÁCTENOS</span>
            </Link>
          </div>
          {/* Icono de búsqueda */}
          <div className="hidden md:block">
            <Link href="#" className="text-gray-400 hover:text-white">
              🔍
            </Link>
          </div>
        </div>

        {/* Menú desplegable en móviles */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 px-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-1 hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="h-5 w-5" />
                <span>INICIO</span>
              </Link>
              <Link
                href="#servicios"
                className="flex items-center space-x-1 hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <ServerIcon className="h-5 w-5" />
                <span>SERVICIOS</span>
              </Link>
              <Link
                href="#desarrollo"
                className="flex items-center space-x-1 hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <CogIcon className="h-5 w-5" />
                <span>DESARROLLO WEB</span>
              </Link>
              <Link
                href="#proyectos"
                className="flex items-center space-x-1 hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <WrenchIcon className="h-5 w-5" />
                <span>PROYECTOS</span>
              </Link>
              <Link
                href="#contacto"
                className="flex items-center space-x-1 hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>CONTÁCTENOS</span>
              </Link>

              {/* Contacto rápido en móvil */}
              <div className="flex flex-col space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-blue-400" />
                  <p>+51 930 791 412</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-blue-400" />
                  <p>Lun - Vie: 09:00 - 18:00</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenContactModal();
                  }}
                >
                  Envíenos un mensaje
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
