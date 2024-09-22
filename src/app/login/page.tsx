"use client"; // Asegúrate de que esté al principio si usas Next.js

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para la navegación
import '../globals.css';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export default function LoginRegister() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const router = useRouter(); // Inicializar el hook useRouter

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Determina el modo (login o register) y el endpoint
    const mode = isLoginMode ? 'login' : 'register';

    // Crear el payload con el modo, email, password, y nombre en caso de registro
    const payload = {
      email: formData.email,
      password: formData.password,
      mode: mode,
      ...(isLoginMode ? {} : { name: formData.name })  // Solo se envía el nombre en registro
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Notificación de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: isLoginMode ? 'Inicio de sesión exitoso' : 'Registro exitoso',
          text: '¡Bienvenido!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          // Redirigir a /productos después de la notificación de éxito
          router.push('/agropecuaria/productos');
        });
      } else {
        // Notificación de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Ocurrió un error, por favor inténtalo de nuevo',
        });
      }
    } catch (error) {
      // Notificación de error por fallo en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error en la solicitud',
        text: 'Error en el servidor o en la solicitud. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); // Cambia entre modo login y registro
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-between bg-cover bg-center"
      style={{
        backgroundImage: `url(${isLoginMode ? '/images/iniciarSesion.webp' : '/images/inscribirse.webp'})`,
      }}
    >
      {/* Formulario de Registro */}
      {!isLoginMode && (
        <div className="ml-10 w-1/3 bg-black bg-opacity-50 p-10 rounded-3xl shadow-lg max-w-md transition-all duration-500 ease-in-out">
          <h1 className="text-5xl font-bold text-center text-white mb-6">
            Registrarse
          </h1>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Campo de nombre */}
            <input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300 placeholder-white"
              type="text"
              placeholder="Nombre"
              required={!isLoginMode}
            />

            {/* Campo de correo electrónico */}
            <input
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300 placeholder-white"
              type="email"
              placeholder="Correo Electrónico"
              required
            />

            {/* Campo de contraseña */}
            <input
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300 placeholder-white"
              type="password"
              placeholder="Contraseña"
              required
            />

            {/* Botón de envío */}
            <button
              className="w-full p-3 mt-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:scale-105 hover:bg-pink-600 transition-all transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="submit"
            >
              {isLoginMode ? "INICIAR SESIÓN" : "REGISTRARSE"}
            </button>
          </form>

          {/* Cambiar entre iniciar sesión y registrarse */}
          <div className="flex flex-col mt-4 text-sm text-center text-white">
            <p>
              {isLoginMode ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <a
                href="#"
                className="text-blue-400 transition hover:underline"
                onClick={toggleMode}
              >
                {isLoginMode ? "Regístrate" : "Inicia Sesión"}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Formulario de Iniciar Sesión */}
      {isLoginMode && (
        <div className="absolute right-10 w-1/3 bg-black bg-opacity-50 p-10 rounded-3xl shadow-lg max-w-md transition-all duration-500 ease-in-out">
          <h1 className="text-5xl font-bold text-center text-white mb-6">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Campo de correo electrónico */}
            <input
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300 placeholder-white"
              type="email"
              placeholder="Correo Electrónico"
              required
            />

            {/* Campo de contraseña */}
            <input
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300 placeholder-white"
              type="password"
              placeholder="Contraseña"
              required
            />

            {/* Enlace de olvidaste tu contraseña */}
            <a href="#" className="text-blue-400 text-sm transition hover:underline">
              ¿Olvidaste tu contraseña?
            </a>

            {/* Botón de envío */}
            <button
              className="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:scale-105 hover:bg-cyan-600 transition-all transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              INICIAR SESIÓN
            </button>
          </form>

          {/* Cambiar entre iniciar sesión y registrarse */}
          <div className="flex flex-col mt-4 text-sm text-center text-white">
            <p>
              {isLoginMode ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <a
                href="#"
                className="text-blue-400 transition hover:underline"
                onClick={toggleMode}
              >
                {isLoginMode ? "Regístrate" : "Inicia Sesión"}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
