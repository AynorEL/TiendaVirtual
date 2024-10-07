"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
  CodeBracketIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  PuzzlePieceIcon,
  BeakerIcon,
  PhoneIcon,
  EnvelopeIcon,
  WrenchIcon,
  CogIcon,
  MapPinIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  CpuChipIcon, // Ícono relacionado a computación e informática
} from '@heroicons/react/24/outline';
import '../../globals.css';

import {
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiDotnet,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import Link from 'next/link';
import Navbar from './../componentes/navbar';
import { useState } from 'react';

const Page = () => {
  // Estados para controlar la visibilidad de los modales
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Estados para el chatbot
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Bienvenido a TechBot! 💻 ¿En qué puedo ayudarte hoy?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Funciones para abrir y cerrar los modales
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openSubscribeModal = () => {
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
  };

  // Función para manejar el envío de mensajes en el chatbot
  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: inputMessage }]);
      setInputMessage('');

      // Respuesta automática (puedes reemplazarla con lógica real)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Gracias por tu mensaje. Pronto te responderemos.' },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Barra de navegación */}
      <Navbar onOpenContactModal={openContactModal} />

      {/* Modal para enviar mensaje (Contáctenos) */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg p-8 relative w-full max-w-md mx-auto">
            <button onClick={closeContactModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Contáctenos</h2>
            <form>
              <div className="mb-4">
                <label className="block text-black mb-2">Nombre</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Correo Electrónico</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Mensaje</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded" rows={5}></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Suscripción */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
            <button onClick={closeSubscribeModal} className="absolute top-4 right-4 text-white">
              X
            </button>
            <form className="flex flex-col space-y-4">
              <span className="text-2xl font-bold text-white">Suscríbete a nuestro boletín</span>
              <p className="text-gray-300">
                Mantente al día con nuestras últimas novedades y servicios especiales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Carrusel */}
      <div className="container mx-auto px-4 py-12 bg-gray-50" id="inicio">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/redes.jpg"
                alt="Redes y Cableado Estructurado"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Redes y Cableado Estructurado</h2>
                <p className="mt-4 text-lg">
                  Confíe sus trabajos de red a especialistas que le brindarán la garantía y confiabilidad que su información necesita.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/programacion.jpg"
                alt="Programación"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Desarrollo y Programación</h2>
                <p className="mt-4 text-lg">
                  Desarrollo de software y aplicaciones web a medida para optimizar su negocio.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/soporte.jpg"
                alt="Soporte Técnico"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Soporte Técnico</h2>
                <p className="mt-4 text-lg">
                  Soluciones rápidas y efectivas para cualquier problema de hardware o software.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/seguridad.jpg"
                alt="Seguridad Informática"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Seguridad Informática</h2>
                <p className="mt-4 text-lg">
                  Proteja su infraestructura con soluciones avanzadas de ciberseguridad.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/domicilio.jpg"
                alt="Soporte a Domicilio"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Soporte a Domicilio</h2>
                <p className="mt-4 text-lg">
                  Soluciones tecnológicas en la comodidad de tu hogar.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/Software.jpg"
                alt="Desarrollo de Software"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Desarrollo de Software</h2>
                <p className="mt-4 text-lg">
                  Innovación en aplicaciones y soluciones personalizadas de software.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 7 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px]">
              <img
                src="/images/responsividad.jpg"
                alt="Diseño Responsivo"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Diseño Responsivo</h2>
                <p className="mt-4 text-lg">
                  Diseños web adaptados a dispositivos móviles y de escritorio.
                </p>
                <button className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={openContactModal}>
                  Contáctenos
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Sección de Servicios */}
      <div className="container mx-auto px-4 py-12 bg-gray-100" id="servicios">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestros Servicios Especializados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Servicio 1 */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <WrenchIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Soporte Técnico</h3>
            </div>
            <p className="text-gray-700">
              Soluciones rápidas para problemas de hardware y software, con atención a empresas y domicilios.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Leer Más
            </button>
          </div>
          {/* Servicio 2 */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <ServerIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Redes y Cableado Estructurado</h3>
            </div>
            <p className="text-gray-700">
              Instalación y mantenimiento de redes de datos para empresas con garantía y seguridad.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Leer Más
            </button>
          </div>
          {/* Servicio 3 */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <CogIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Mantenimiento Preventivo</h3>
            </div>
            <p className="text-gray-700">
              Mantenimiento preventivo y correctivo de equipos de cómputo para evitar fallos.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Leer Más
            </button>
          </div>
        </div>
      </div>

      {/* Nueva Sección: Desarrollo Web */}
      <div className="container mx-auto px-4 py-12 bg-gray-100" id="desarrollo">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Desarrollo de Software</h2>
        <p className="text-lg text-center mb-12 text-gray-700">
          Ofrecemos soluciones personalizadas en desarrollo de software para empresas, con tecnología de punta y un enfoque en la innovación.
        </p>

        {/* Servicios específicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Aplicaciones Empresariales */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <PuzzlePieceIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Aplicaciones Empresariales</h3>
            </div>
            <p className="text-gray-700">
              Desarrollo de soluciones empresariales como ERP, CRM, y otras aplicaciones personalizadas para optimizar procesos.
            </p>
            <pre className="bg-gray-900 text-red-400 p-4 rounded mt-4 overflow-auto max-h-40 text-sm">
              <code>
                {`// Ejemplo de integración de API en un CRM:
fetch('https://api.crm.com/v1/clients', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer your_token_here',
  }
});`}
              </code>
            </pre>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center" onClick={openContactModal}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
            </button>
          </div>

          {/* Desarrollo de Aplicaciones Móviles */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <DevicePhoneMobileIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Desarrollo de Aplicaciones Móviles</h3>
            </div>
            <p className="text-gray-700">
              Creamos aplicaciones móviles nativas para Android y iOS, adaptadas a las necesidades de tu negocio.
            </p>
            <pre className="bg-gray-900 text-yellow-400 p-4 rounded mt-4 overflow-auto max-h-40 text-sm">
              <code>
                {`// Ejemplo de desarrollo en React Native:
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View>
    <Text>¡Hola, mundo!</Text>
  </View>
);

export default App;`}
              </code>
            </pre>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center" onClick={openContactModal}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
            </button>
          </div>

          {/* Desarrollo de APIs */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <CodeBracketIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Desarrollo de APIs</h3>
            </div>
            <p className="text-gray-700">
              Diseñamos e implementamos APIs robustas para integrar tus sistemas y plataformas con otras soluciones.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded mt-4 overflow-auto max-h-40 text-sm">
              <code>
                {`// Ejemplo de API en Node.js con Express:
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));`}
              </code>
            </pre>
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center" onClick={openContactModal}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
            </button>
          </div>

          {/* Automatización de Procesos */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <ArrowPathIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Automatización de Procesos (RPA)</h3>
            </div>
            <p className="text-gray-700">
              Automatizamos tareas repetitivas con soluciones de RPA (Robotic Process Automation) para aumentar la eficiencia.
            </p>
            <pre className="bg-gray-900 text-blue-400 p-4 rounded mt-4 overflow-auto max-h-40 text-sm">
              <code>
                {`// Ejemplo de automatización en Python:
import pyautogui

# Abre una aplicación:
pyautogui.hotkey('ctrl', 'alt', 't')
pyautogui.write('Abrir un programa')`}
              </code>
            </pre>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center" onClick={openContactModal}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
            </button>
          </div>

          {/* Integración de Plataformas */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <ServerIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Integración de Plataformas</h3>
            </div>
            <p className="text-gray-700">
              Integramos plataformas de terceros y sistemas internos para una mayor eficiencia operativa.
            </p>
            <pre className="bg-gray-900 text-pink-400 p-4 rounded mt-4 overflow-auto max-h-40 text-sm">
              <code>
                {`// Ejemplo de integración de Salesforce con un ERP:
const salesforce = require('salesforce-api');
const erpSystem = require('erp-system-api');

// Sincronizar clientes:
salesforce.syncClients(erpSystem.clients);`}
              </code>
            </pre>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center" onClick={openContactModal}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
            </button>
          </div>

          {/* Casos de Éxito */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <BeakerIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Casos de Éxito</h3>
            </div>
            <p className="text-gray-700">
              Conozca ejemplos de proyectos exitosos en los que hemos trabajado, optimizando procesos y mejorando la eficiencia de nuestros clientes.
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={openContactModal}>
              Leer Más
            </button>
          </div>
        </div>

        {/* Tecnologías Utilizadas */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tecnologías Utilizadas</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Frontend */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <SiReact className="h-10 w-10 text-blue-500 mr-4" />
                <SiAngular className="h-10 w-10 text-red-500 mr-4" />
                <SiVuedotjs className="h-10 w-10 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Frontend</h4>
              <p className="text-gray-700">React, Angular, Vue.js</p>
            </div>

            {/* Backend */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <SiNodedotjs className="h-10 w-10 text-green-500 mr-4" />
                <SiPython className="h-10 w-10 text-yellow-500 mr-4" />
                <SiDotnet className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Backend</h4>
              <p className="text-gray-700">Node.js, Python, .NET</p>
            </div>

            {/* Bases de Datos */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <SiMysql className="h-10 w-10 text-blue-600 mr-4" />
                <SiMongodb className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Bases de Datos</h4>
              <p className="text-gray-700">MySQL, MongoDB</p>
            </div>

            {/* DevOps */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <SiDocker className="h-10 w-10 text-blue-500 mr-4" />
                <SiKubernetes className="h-10 w-10 text-blue-600 mr-4" />
                <ServerIcon className="h-10 w-10 text-gray-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">DevOps</h4>
              <p className="text-gray-700">Docker, Kubernetes, CI/CD</p>
            </div>
          </div>
        </div>

        {/* Planes de soporte */}
        <div className="mt-12 bg-blue-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">Planes de Soporte y Mantenimiento</h3>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Ofrecemos distintos niveles de soporte para garantizar que su software funcione de manera óptima.
          </p>

          {/* Planes de soporte en tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Básico */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <PhoneIcon className="h-8 w-8 text-blue-500 mr-3" />
                <h4 className="text-2xl font-bold text-gray-900">Soporte Básico</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Ayuda para incidencias menores y consultas técnicas básicas.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Asistencia rápida y puntual.</li>
                <li>Monitoreo básico del sistema.</li>
              </ul>
            </div>

            {/* Mantenimiento Correctivo */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <ArrowPathIcon className="h-8 w-8 text-green-500 mr-3" />
                <h4 className="text-2xl font-bold text-gray-900">Mantenimiento Correctivo</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Nos encargamos de solucionar problemas del software para asegurar su correcto funcionamiento.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Corrección de errores en el software.</li>
                <li>Reparación y ajustes del sistema.</li>
              </ul>
            </div>

            {/* Actualizaciones de Software */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
              <div className="flex items-center mb-4">
                <CodeBracketIcon className="h-8 w-8 text-yellow-500 mr-3" />
                <h4 className="text-2xl font-bold text-gray-900">Actualizaciones Periódicas</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Mantén tu software actualizado con las últimas mejoras y parches de seguridad.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Nuevas características y funcionalidades.</li>
                <li>Parcheo de vulnerabilidades de seguridad.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con sección de suscripción */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Columna 1 */}
            <div>
              <h3 className="font-bold text-xl">CodeDesignNet</h3>
              <p className="text-gray-300 mt-2">
                Somos especialistas en soporte técnico, soluciones de TI y desarrollo web.
                Contáctenos para conocer más sobre cómo podemos ayudar a su empresa o hogar.
              </p>
            </div>
            {/* Columna 2 */}
            <div>
              <h3 className="font-bold text-xl">Servicios</h3>
              <ul className="mt-2 text-gray-300">
                <li>Soporte Técnico para Empresas</li>
                <li>Redes y Cableado</li>
                <li>Reparación de Equipos</li>
                <li>Mantenimiento Preventivo</li>
                <li>Desarrollo Web</li>
              </ul>
            </div>
            {/* Columna 3 */}
            <div>
              <h3 className="font-bold text-xl">Suscríbete a nuestro boletín</h3>
              <p className="text-gray-300 mt-2">
                Mantente al día con nuestras últimas novedades y servicios especiales.
              </p>
              <button
                onClick={openSubscribeModal}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </footer>
        {/* Botón del Chatbot */}
        <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out z-50"
      >
        {/* Ícono temático de Computación e Informática */}
        <CpuChipIcon className="w-6 h-6" />
      </button>
      {isChatbotOpen && (
        <div className="fixed bottom-20 right-6 z-50">
          <div className="w-72 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-96">
              {/* Encabezado del modal */}
              <div className="px-4 py-3 bg-blue-800 text-white flex justify-between items-center">
                <h2 className="text-lg font-semibold">TechBot</h2>
                <button
                  onClick={() => setIsChatbotOpen(false)}
                  className="hover:text-red-200 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              {/* Contenido del modal */}
              <div className="flex-1 p-3 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      } rounded-lg px-3 py-2 max-w-xs`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              {/* Input para escribir mensajes */}
              <div className="px-3 py-2 border-t">
                <div className="flex gap-2">
                  <input
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 p-2 border rounded-lg text-sm"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') sendMessage();
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
