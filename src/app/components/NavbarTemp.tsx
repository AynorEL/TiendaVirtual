"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { ShoppingCartIcon, HomeIcon, PhoneIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Componente Navbar
const Navbar: React.FC<{ onProductoClick?: (id_producto: number) => void }> = ({ onProductoClick }) => {
  // Local State para manejar el carrito y los resultados de búsqueda
  const [carrito, setCarrito] = useState<any[]>([]);
  const [hoverCarrito, setHoverCarrito] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);

  // Manejar la búsqueda de productos
  const manejarCambioBusqueda = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);

    if (e.target.value.length > 0) {
      try {
        const response = await fetch(`/api/productos?search=${e.target.value}`);
        if (response.ok) {
          const data = await response.json();
          setResultadosBusqueda(data);
        } else {
          setResultadosBusqueda([]);
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
        setResultadosBusqueda([]);
      }
    } else {
      setResultadosBusqueda([]);
    }
  };

  // Calcular cantidad total de productos en el carrito
  const calcularCantidadTotalProductos = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Calcular el total del carrito
  const calcularTotalCarrito = () => {
    return carrito.reduce((total, item) => {
      if (item.producto && item.producto.precio_unidad) {
        return total + parseFloat(item.producto.precio_unidad) * item.cantidad;
      }
      return total;
    }, 0).toFixed(2);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id_producto: number) => {
    setCarrito(carrito.filter(item => item.producto.id_producto !== id_producto));
  };

  return (
    <header className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <img src="/images/logoAgro.png" alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-3xl font-bold">AgroTienda</h1>

          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={manejarCambioBusqueda}
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />

            {resultadosBusqueda.length > 0 && (
              <div className="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-50">
                <ul className="max-h-60 overflow-y-auto">
                  {resultadosBusqueda.map((producto: any) => (
                    <li
                      key={producto.id_producto}
                      className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => onProductoClick?.(producto.id_producto)}
                    >
                      <img src={producto.imagen} alt={producto.nombre_producto} className="w-8 h-8 mr-2 rounded" />
                      <Link href={`/agropecuaria/productos#producto-${producto.id_producto}`} className="text-black font-bold">
                        {producto.nombre_producto}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="flex items-center hover:text-green-300">
                <HomeIcon className="h-5 w-5 mr-1" />
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/agropecuaria/productos" className="flex items-center hover:text-green-300">
                <ShoppingCartIcon className="h-5 w-5 mr-1" />
                Productos
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="flex items-center hover:text-green-300">
                <PhoneIcon className="h-5 w-5 mr-1" />
                Contacto
              </Link>
            </li>
          </ul>

          <div
            className="relative"
            onMouseEnter={() => setHoverCarrito(true)}
            onMouseLeave={() => setHoverCarrito(false)}
          >
            <div className="flex items-center cursor-pointer hover:text-green-300">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {calcularCantidadTotalProductos()}
              </span>
            </div>

            {hoverCarrito && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                <h3 className="text-lg font-semibold text-black">Carrito</h3>
                <div className="max-h-60 overflow-y-auto">
                  <ul>
                    {carrito.length > 0 ? (
                      carrito.map((item) => (
                        item.producto && (
                          <li key={item.producto.id_producto} className="flex justify-between items-center mb-4">
                            <img src={item.producto.imagen} alt={item.producto.nombre_producto} className="w-12 h-12 rounded-lg" />
                            <div className="ml-4 flex-1">
                              <span className="block font-bold text-black">{item.producto.nombre_producto}</span>
                              <span className="block text-sm text-black">Cantidad: {item.cantidad}</span>
                              <span className="block text-sm text-black">Subtotal: S/.{(parseFloat(item.producto.precio_unidad) * item.cantidad).toFixed(2)}</span>
                            </div>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => eliminarDelCarrito(item.producto.id_producto)}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </li>
                        )
                      ))
                    ) : (
                      <p className="text-black">El carrito está vacío.</p>
                    )}
                  </ul>
                </div>

                {carrito.length > 0 && (
                  <div className="mt-4 flex justify-between">
                    <p className="text-lg font-bold text-black">Total: S/.{calcularTotalCarrito()}</p>
                    <Link href="/carrito">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Ver Carrito
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
