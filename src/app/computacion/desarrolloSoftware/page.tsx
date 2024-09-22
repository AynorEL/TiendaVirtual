"use client";

import { CodeBracketIcon, ServerIcon, DevicePhoneMobileIcon, ArrowPathIcon, PuzzlePieceIcon, BeakerIcon, PhoneIcon } from '@heroicons/react/24/outline';

import { SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython, SiDotnet, SiMysql, SiMongodb, SiDocker, SiKubernetes } from "react-icons/si"; // Paquete react-icons

const DesarrolloSoftware = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100" id="desarrollo">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Desarrollo de Software</h2>
      <p className="text-lg text-center mb-12 text-gray-700">
        Ofrecemos soluciones personalizadas en desarrollo de software para empresas, con tecnología de punta y un enfoque en la innovación.
      </p>

      {/* Servicios específicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Aplicaciones Empresariales */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <PuzzlePieceIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Aplicaciones Empresariales</h3>
          </div>
          <p className="text-gray-700">
            Desarrollo de soluciones empresariales como ERP, CRM, y otras aplicaciones personalizadas para optimizar procesos.
          </p>
          <pre className="bg-gray-900 text-red-400 p-4 rounded mt-4 overflow-auto max-h-40">
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
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
          </button>
        </div>

        {/* Desarrollo de Aplicaciones Móviles */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <DevicePhoneMobileIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Desarrollo de Aplicaciones Móviles</h3>
          </div>
          <p className="text-gray-700">
            Creamos aplicaciones móviles nativas para Android y iOS, adaptadas a las necesidades de tu negocio.
          </p>
          <pre className="bg-gray-900 text-yellow-400 p-4 rounded mt-4 overflow-auto max-h-40">
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
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
          </button>
        </div>

        {/* Desarrollo de APIs */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <CodeBracketIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Desarrollo de APIs</h3>
          </div>
          <p className="text-gray-700">
            Diseñamos e implementamos APIs robustas para integrar tus sistemas y plataformas con otras soluciones.
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded mt-4 overflow-auto max-h-40">
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
          <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
          </button>
        </div>

        {/* Automatización de Procesos */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <ArrowPathIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Automatización de Procesos (RPA)</h3>
          </div>
          <p className="text-gray-700">
            Automatizamos tareas repetitivas con soluciones de RPA (Robotic Process Automation) para aumentar la eficiencia.
          </p>
          <pre className="bg-gray-900 text-blue-400 p-4 rounded mt-4 overflow-auto max-h-40">
            <code>
              {`// Ejemplo de automatización en Python:
import pyautogui

# Abre una aplicación:
pyautogui.hotkey('ctrl', 'alt', 't')
pyautogui.write('Abrir un programa')`}
            </code>
          </pre>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
          </button>
        </div>

        {/* Integración de Plataformas */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <ServerIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Integración de Plataformas</h3>
          </div>
          <p className="text-gray-700">
            Integramos plataformas de terceros y sistemas internos para una mayor eficiencia operativa.
          </p>
          <pre className="bg-gray-900 text-pink-400 p-4 rounded mt-4 overflow-auto max-h-40">
            <code>
              {`// Ejemplo de integración de Salesforce con un ERP:
const salesforce = require('salesforce-api');
const erpSystem = require('erp-system-api');

// Sincronizar clientes:
salesforce.syncClients(erpSystem.clients);`}
            </code>
          </pre>
          <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" /> Contáctanos
          </button>
        </div>

        {/* Casos de Éxito */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <BeakerIcon className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Casos de Éxito</h3>
          </div>
          <p className="text-gray-700">
            Conozca ejemplos de proyectos exitosos en los que hemos trabajado, optimizando procesos y mejorando la eficiencia de nuestros clientes.
          </p>
        </div>
      </div>

      <div className="mt-12">
      <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tecnologías Utilizadas</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
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
  <h3 className="text-4xl font-bold text-blue-700 mb-6 text-center">Planes de Soporte y Mantenimiento</h3>
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
  );
};

export default DesarrolloSoftware;
