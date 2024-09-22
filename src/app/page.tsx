"use client";
import { useState } from "react";
import Swal from 'sweetalert2';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import './globals.css'; 

export default function TiendaVirtual() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const router = useRouter();

  const handleProtectedRoute = () => {
    if (!isAuthenticated) {
      // Mostrar SweetAlert en lugar del alert normal
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
  
  return (
    <div className="h-screen flex flex-col font-sans text-gray-800 relative">

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
            <Link href="/agropecuaria/productos">
              <button className="text-green-600 hover:text-green-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                Producción Agropecuaria
              </button>
            </Link>

            <Link href="/computacion/soporteTecnico">
              <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                Computación e Informática
              </button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-110">
              Iniciar Sesión
            </button>
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
                <Link href="/agropecuaria/productos">
                  <button className="text-green-600 hover:text-green-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                    Producción Agropecuaria
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/computacion/soporteTecnico">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
                    Computación e Informática
                  </button>
                </Link>
              </li>
              <li className="mt-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-110">
                  Iniciar Sesión
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-grow relative">
        <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative">

          {/* Sección de Producción Agropecuaria */}
          <div className="relative h-full group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform group-hover:scale-105 z-0"
              style={{ backgroundImage: "url('/images/fondoAgro.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 z-10">
              <div className="relative">
                <h2 className="text-4xl font-bold text-white mb-4 grow-in">
                  Producción Agropecuaria
                </h2>
                <div className="leaf"></div>
                <div className="leaf"></div>
                <div className="leaf"></div>
              </div>
              <p className="text-lg text-white mb-6">
                Ofrecemos productos y servicios diseñados para mejorar la eficiencia en el sector agropecuario.
              </p>
              <button onClick={handleProtectedRoute} className="btn">
                <div className="wrapper">
                  <p className="text">Producción Agropecuaria</p>

                  <div className="flower flower1">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                  <div className="flower flower2">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                  <div className="flower flower3">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                  <div className="flower flower4">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                  <div className="flower flower5">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                  <div className="flower flower6">
                    <div className="petal one"></div>
                    <div className="petal two"></div>
                    <div className="petal three"></div>
                    <div className="petal four"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Sección de Computación e Informática */}
          <div className="relative h-full group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out transform group-hover:scale-105 z-0"
              style={{ backgroundImage: "url('/images/fondoComputacion.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 z-10">
              <h3>
                <span className="computacion-text glitch" data-text="COMPUTACIÓN">COMPUTACIÓN </span>
                <span className="E-text glitch" data-text="E">E</span>
                <span className="informatica-text glitch" data-text="INFORMÁTICA">INFORMÁTICA</span>
              </h3>
              <p className="text-lg text-white mb-6">
                Soluciones tecnológicas y soporte técnico para optimizar tu entorno digital.
              </p>
              <Link href="/computacion/soporteTecnico">
                <button className="ui-btn">
                  <span>Ver más</span>
                </button>
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

          {/* Tercera columna: Vacía para ajustar la posición */}
          <div className="flex flex-col items-center"></div>

          {/* Tarjeta de desarrolladores */}
          <div className="md:absolute md:bottom-1/2 md:right-4 md:transform md:translate-y-1/2 w-[200px] mx-auto md:mx-0">
            <div className="group origin-bottom-right duration-500 -rotate-6 hover:-rotate-0 hover:-skew-x-6 skew-x-0 hover:-translate-x-4 hover:translate-y-6">
              <div className="duration-500 group-hover:duration-400 relative rounded-lg w-full h-24 bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-6 before:rounded-lg before:absolute before:content-[''] before:bg-neutral-700 before:right-2 before:top-0 before:w-full before:h-20 before:-z-10 group-hover:before:-right-2 group-hover:before:skew-x-6 before:duration-500 group-hover:duration-500">
                <p className="text-amber-300 font-thin">- Desarrollado por:</p>
                <span className="text-lg font-bold">Aynor Espinoza León</span>
                <span className="text-lg font-bold">Ronal Romero Solis</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      <button
  onClick={() => setIsChatbotOpen(!isChatbotOpen)}
  className="fixed bottom-32 right-6 md:bottom-36 md:right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out z-50"
>
  {/* Icono del chatbot */}
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.73 9-8.25s-4.03-8.25-9-8.25-9 3.73-9 8.25c0 1.74.57 3.35 1.54 4.66l-.84 3.16a.75.75 0 00.97.9l3.28-1.04a10.5 10.5 0 003.05.47z" />
  </svg>
</button>

      {/* Modal del Chatbot */}
      {isChatbotOpen && (
  <div className="fixed bottom-20 right-6 md:bottom-24 md:right-8 z-50">
    <div className="w-72 md:w-80 bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-96">
        {/* Encabezado del modal con botón de cerrar */}
        <div className="px-4 py-3 border-b dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          AgroMind
          </h2>
          <button onClick={() => setIsChatbotOpen(false)} className="text-zinc-800 dark:text-white hover:text-red-500 text-xl font-bold">
            &times;
          </button>
        </div>
        {/* Contenido del modal */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2" id="chatDisplay">
          {/* Mensajes del chat */}
          <div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
            ¡Hola! ¿Cómo puedo asistirte hoy?
          </div>
          <div className="chat-message self-start bg-green-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
  ¡Hola! Necesito ayuda con el chatbot.
</div>
        </div>
        {/* Input para escribir mensajes */}
        <div className="px-3 py-2 border-t dark:border-zinc-700">
          <div className="flex gap-2">
            <input
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
              id="chatInput"
              type="text"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
