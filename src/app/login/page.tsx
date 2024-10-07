// src/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '../globals.css';

export default function LoginRegister() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mode = isLoginMode ? 'login' : 'register';
    const endpoint = '/api/login';

    const payload = {
      email: formData.email,
      password: formData.password,
      mode: mode
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        if (isLoginMode) {
          // Guardar token y ID de usuario en localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('id_usuario', data.id_usuario);

          // Notificación de éxito
          await Swal.fire({
            icon: 'success',
            title: '¡Bienvenido de nuevo!',
            text: 'Has iniciado sesión correctamente.',
            showConfirmButton: false,
            timer: 2000,
            background: '#1a202c',
            color: '#f7fafc',
          });

          // Redirigir a /agropecuaria/productos
          router.push('/agropecuaria/productos');
        } else {
          // Registro exitoso, redirigir a la página de inicio de sesión
          await Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada. Por favor, inicia sesión.',
            showConfirmButton: false,
            timer: 2000,
            background: '#1a202c',
            color: '#f7fafc',
          });

          // Cambiar al modo de inicio de sesión
          setIsLoginMode(true);
          setFormData({
            email: "",
            password: ""
          });
        }
      } else {
        // Notificación de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Ocurrió un error, por favor inténtalo de nuevo',
          background: '#1a202c',
          color: '#f7fafc',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la solicitud',
        text: 'Error en el servidor o en la solicitud. Por favor, inténtalo de nuevo.',
        background: '#1a202c',
        color: '#f7fafc',
      });
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      email: "",
      password: ""
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${isLoginMode ? '/images/iniciarSesion.webp' : '/images/inscribirse.webp'})`,
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-70 p-10 rounded-3xl shadow-lg transition-all duration-500 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          {isLoginMode ? 'Iniciar Sesión' : 'Registrarse'}
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Campo de correo electrónico */}
          <input
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-3 shadow-md bg-gray-800 text-gray-200 border-gray-700 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform duration-300 placeholder-gray-400"
            type="email"
            placeholder="Correo Electrónico"
            required
          />

          {/* Campo de contraseña */}
          <input
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border p-3 shadow-md bg-gray-800 text-gray-200 border-gray-700 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform duration-300 placeholder-gray-400"
            type="password"
            placeholder="Contraseña"
            required
          />

          {/* Enlace de olvidaste tu contraseña solo en login */}
          {isLoginMode && (
            <a href="#" className="text-blue-400 text-sm transition hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          )}

          {/* Botón de envío */}
          <button
            className={`w-full p-3 mt-4 text-white rounded-lg hover:scale-105 transition-all transform duration-300 shadow-lg focus:outline-none focus:ring-2 ${
              isLoginMode
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:bg-cyan-600 focus:ring-blue-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-pink-600 focus:ring-purple-500'
            }`}
            type="submit"
          >
            {isLoginMode ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
          </button>
        </form>

        {/* Cambiar entre iniciar sesión y registrarse */}
        <div className="flex flex-col mt-4 text-sm text-center text-white">
          <p>
            {isLoginMode ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button
              className="text-blue-400 transition hover:underline"
              onClick={toggleMode}
            >
              {isLoginMode ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
          {/* Botón para regresar al inicio */}
          <p className="mt-4">
            <button
              className="text-green-400 transition hover:underline flex items-center justify-center"
              onClick={() => router.push('/')}
            >
              Regresar al Inicio
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
