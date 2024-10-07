"use client";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PuffLoader } from "react-spinners";
import './globals.css'; 

export default function TiendaVirtual() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para el loader
  const router = useRouter();

  // useEffect para verificar la autenticación al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Finalizar el loader después de verificar la autenticación
  }, []);

  const handleProtectedRoute = () => {
    if (!isAuthenticated) {
      // Mostrar SweetAlert
      Swal.fire({
        title: 'Acceso restringido',
        text: 'Por favor, inicie sesión para continuar.',
        icon: 'warning',
        confirmButtonText: 'Iniciar Sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al login si el usuario confirma
          router.push('/login');
        }
      });
    } else {
      // Redirigir a la ruta protegida si está autenticado
      router.push('/agropecuaria/productos');
    }
  };

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirigir a la página de inicio o login
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#36D7B7" size={100} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 relative">
      {/* Header */}
      <header className="bg-white shadow-md z-20 relative">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-3xl font-bold text-green-600 flex items-center">
            <Image
              src="/images/logoprincipal.png"
              alt="Logo Tienda Virtual"
              width={40}
              height={40}
              className="mr-2"
            />
            Tienda Virtual
          </div>

          {/* Menú de navegación */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={handleProtectedRoute} className="text-green-600 hover:text-green-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Producción Agropecuaria
            </button>
            <Link href="/computacion/soporteTecnico" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
              Computación e Informática
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110">
                Cerrar Sesión
              </button>
            ) : (
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-110">
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="transition duration-300 ease-in-out transform hover:scale-110">
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-green-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-green-600" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg transition-all duration-500 ease-in-out">
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <button onClick={handleProtectedRoute} className="text-green-600 hover:text-green-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                  Producción Agropecuaria
                </button>
              </li>
              <li>
                <Link href="/computacion/soporteTecnico" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                  Computación e Informática
                </Link>
              </li>
              <li className="mt-4">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-110 w-full">
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-110 w-full text-center">
                    Iniciar Sesión
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-grow relative">
        <section className="grid grid-cols-1 md:grid-cols-2 w-full h-auto">
          {/* Sección de Producción Agropecuaria */}
          <div className="relative h-auto md:h-screen group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform group-hover:scale-105 z-0"
              style={{ backgroundImage: "url('/images/fondoAgro.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 z-10">
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 grow-in">
                  Producción Agropecuaria
                </h2>
              </div>
              <p className="text-md md:text-lg text-white mb-6">
                Ofrecemos productos y servicios diseñados para mejorar la eficiencia en el sector agropecuario.
              </p>
              <button onClick={handleProtectedRoute} className="btn">
                <span>Producción Agropecuaria</span>
              </button>
            </div>
          </div>

          {/* Sección de Computación e Informática */}
          <div className="relative h-auto md:h-screen group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform group-hover:scale-105 z-0"
              style={{ backgroundImage: "url('/images/fondoComputacion.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="computacion-text glitch" data-text="COMPUTACIÓN">COMPUTACIÓN </span>
                <span className="E-text glitch" data-text="E">E</span>
                <span className="informatica-text glitch" data-text="INFORMÁTICA">INFORMÁTICA</span>
              </h3>
              <p className="text-md md:text-lg text-white mb-6">
                Soluciones tecnológicas y soporte técnico para optimizar tu entorno digital.
              </p>
              <Link href="/computacion/soporteTecnico" className="ui-btn">
                <span>Ver más</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 relative z-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Primera columna: Links */}
          <div className="flex flex-col items-center space-y-3">
            <Link href="#" className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105">
              Términos y Condiciones
            </Link>
            <Link href="#" className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105">
              Contacto
            </Link>
          </div>

          {/* Segunda columna: Derechos reservados */}
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-2">&copy; 2024 Mi Tienda Virtual. Todos los derechos reservados.</p>
          </div>

          {/* Tarjeta de desarrolladores */}
          <div className="md:absolute md:bottom-1/2 md:right-4 md:transform md:translate-y-1/2 w-[200px] mx-auto md:mx-0">
            <div className="group origin-bottom-right duration-500 -rotate-6 hover:-rotate-0 hover:-skew-x-6 skew-x-0 hover:-translate-x-4 hover:translate-y-6">
              <div className="duration-500 group-hover:duration-400 relative rounded-lg w-full h-24 bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-6 before:rounded-lg before:absolute before:content-[''] before:bg-neutral-700 before:right-2 before:top-0 before:w-full before:h-20 before:-z-10 group-hover:before:-right-2 group-hover:skew-x-6 before:duration-500 group-hover:duration-500">
                <p className="text-amber-300 font-thin">- Desarrollado por:</p>
                <span className="text-lg font-bold">Aynor Espinoza León</span>
                <span className="text-lg font-bold">Ronal Romero Solis</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
