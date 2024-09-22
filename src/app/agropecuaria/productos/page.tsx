"use client";
import React, { useState, useEffect, useRef } from "react";
import { ShoppingCartIcon, HomeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link'; 
import '../../globals.css'; 

// Tipos de datos para Producto
type Producto = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio_unidad: string;     // Precio general desde la tabla productos
  precio_unitario?: string;  // Precio específico en el carrito (opcional)
  unidad_medida: string;
  stock: number;
  imagen: string;
  nombre_categoria: string;
  cantidad?: number;         // Cantidad en el carrito
};

type ProductoCarrito = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio_unitario: string;  // Precio específico en el carrito
  cantidad: number;
  imagen: string;
  subtotal: number;         // (opcional) Podrías calcularlo directamente
};

type ProductoCatalogo = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio_unidad: string;     // Precio general desde la tabla productos
  unidad_medida: string;
  stock: number;
  imagen: string;
  nombre_categoria: string;
};


export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [mostrarModalGrande, setMostrarModalGrande] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [notificacion, setNotificacion] = useState<{ mostrar: boolean; mensaje: string; tipo: string }>({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });
  const [productosPorPagina, setProductosPorPagina] = useState(16);
  const [paginaActual, setPaginaActual] = useState(1);
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [hoverCarrito, setHoverCarrito] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 
  const [busqueda, setBusqueda] = useState(""); 

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const idUsuario = 1; // Supongamos que el ID del usuario es 1
  const productosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const obtenerProductos = async () => {
      try {
        const res = await fetch("/api/productos");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    const obtenerCarrito = async () => {
      try {
        const res = await fetch(`/api/carrito?id_usuario=${idUsuario}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setCarrito(data);
        } else {
          setCarrito([]);
        }
      } catch (error) {
        console.error("Error al obtener carrito:", error);
      }
    };

    obtenerProductos();
    obtenerCarrito();
  }, []);

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, item) => {
      const precio = parseFloat(item.precio_unitario || '0');
      const cantidad = item.cantidad || 0;
      return total + (precio * cantidad);
    }, 0).toFixed(2);
  };

  const eliminarDelCarrito = async (id_producto: number) => {
    try {
      const response = await fetch('/api/carrito', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_producto, id_usuario: 1 }), 
      });
  
      if (response.ok) {
        const carritoActualizado = await fetch(`/api/carrito?id_usuario=${idUsuario}`);
        const carritoData = await carritoActualizado.json();
        setCarrito(carritoData); 
      } else {
        console.error('Error al eliminar el producto del carrito');
      }
    } catch (error) {
      console.error('Error en la petición de eliminar producto:', error);
    }
  };

  const agregarAlCarrito = async () => {
    if (productoSeleccionado) {
      try {
        console.log({
          id_producto: productoSeleccionado.id_producto,
          cantidad: cantidad,
          id_usuario: idUsuario,
        });
  
        const response = await fetch('/api/carrito', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_producto: productoSeleccionado.id_producto,
            cantidad: cantidad,
            id_usuario: idUsuario, 
          }),
        });
  
        if (response.ok) {
          const carritoActualizado = await fetch(`/api/carrito?id_usuario=${idUsuario}`);
          const carritoData = await carritoActualizado.json();
          setCarrito(carritoData);
  
          setNotificacion({
            mostrar: true,
            mensaje: `${productoSeleccionado.nombre_producto} se ha añadido a tu carrito.`,
            tipo: 'success',
          });
  
          setMostrarModalGrande(true);
  
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al añadir el producto al carrito');
        }
      } catch (error) {
        setNotificacion({
          mostrar: true,
          mensaje: `Error: ${(error instanceof Error ? error.message : 'Error desconocido')}`,
          tipo: 'error',
        });
      }
  
      setTimeout(() => {
        setNotificacion({ mostrar: false, mensaje: '', tipo: '' });
      }, 3000);
  
      cerrarModalGrande();
    }
  };

  const cerrarModalGrande = () => {
    setMostrarModalGrande(false);
    setCantidad(1);
  };

  const abrirModalGrande = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalGrande(true);
  };

  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
  };

  const handleMouseEnterCarrito = () => {
    setHoverCarrito(true);
  };

  const handleMouseLeaveCarrito = () => {
    setTimeout(() => {
      setHoverCarrito(false);
    }, 3000); 
  };

  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  }

  const productosActuales = busqueda
    ? productos.filter((producto) =>
        producto.nombre_producto.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos.slice(
        (paginaActual - 1) * productosPorPagina,
        paginaActual * productosPorPagina
      );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar con hover del carrito */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <img src="/images/logoAgro.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-3xl font-bold">AgroTienda</h1>
          </div>

          <div className="relative w-full max-w-xs mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={manejarCambioBusqueda}
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <nav className="flex items-center space-x-6 mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="flex items-center hover:text-green-300">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Inicio
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
              className="relative ml-4"
              onMouseEnter={handleMouseEnterCarrito}
              onMouseLeave={handleMouseLeaveCarrito}
            >
              <div className="flex items-center cursor-pointer hover:text-green-300">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carrito.length}
                </span>
              </div>

              {/* Mostrar carrito con retraso al ocultar */}
              {hoverCarrito && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                  <h3 className="text-lg font-semibold text-black">Carrito</h3>
                  <ul className="max-h-60 overflow-y-auto">
                    {carrito.length > 0 ? (
                      carrito.map((item) => (
                        <li key={item.id_producto} className="flex justify-between items-center mb-4">
                          <img src={item.imagen} alt={item.nombre_producto} className="w-12 h-12 rounded-lg" />
                          <div className="ml-4 flex-1">
                            <span className="block font-bold text-black">{item.nombre_producto}</span>
                            <span className="block text-sm text-black">Cantidad: {item.cantidad}</span>
                            <span className="block text-sm text-black">
                              Subtotal: S/.{(parseFloat(item.precio_unitario || '0') * (item.cantidad || 0)).toFixed(2)}
                            </span>
                          </div>
                          <button className="text-red-600 hover:text-red-800" onClick={() => eliminarDelCarrito(item.id_producto)}>
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </li>
                      ))
                    ) : (
                      <p className="text-black">El carrito está vacío.</p>
                    )}
                  </ul>

                  {carrito.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <span className="font-bold text-black">Total:</span>
                        <span className="font-bold text-black">
                          S/.{calcularTotalCarrito()}
                        </span>
                      </div>
                      <Link href="/carrito">
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                          Ir al carrito
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

      {/* Listado de productos */}
      <div className="flex w-full">
        <div className="w-full mx-auto py-12 px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Nuestros Productos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productosActuales.map((producto, index) => (
              <div
                key={index}
                ref={(el) => {
                  productosRef.current[producto.id_producto] = el;
                }}
                className="relative bg-white shadow-lg rounded-lg group"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre_producto}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-black">{producto.nombre_producto}</h3>
                  <p className="text-gray-600 text-sm mt-2">{producto.descripcion}</p>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    S/. {producto.precio_unidad ? parseFloat(producto.precio_unidad).toFixed(2) : "N/A"} por {producto.unidad_medida ?? "unidad"}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">Stock: {producto.stock}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-gray-100 rounded-lg shadow-md">
                  <button
                    onClick={() => abrirModalGrande(producto)}
                    className="mt-4 w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    <ShoppingCartIcon className="h-6 w-6 inline-block" />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="px-3 py-1 rounded-full text-gray-500 hover:text-black"
              >
                &lt;
              </button>
              <span className="mx-2 text-gray-700">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="px-3 py-1 rounded-full text-gray-500 hover:text-black"
              >
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Notificación para el carrito */}
      {notificacion.mostrar && (
        <div
          className={`fixed top-10 right-10 py-2 px-4 rounded shadow-lg z-50 ${
            notificacion.tipo === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <p>{notificacion.mensaje}</p>
        </div>
      )}

      {/* Modal con detalles del producto */}
      {mostrarModalGrande && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button className="absolute top-2 right-2 text-red-600 text-lg" onClick={cerrarModalGrande}>
              &times;
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre_producto} className="w-full h-auto rounded-lg" />
              </div>
              <div className="md:w-1/2 p-4">
                <h3 className="text-2xl font-bold text-black mb-2">{productoSeleccionado.nombre_producto}</h3>
                <p className="text-gray-600 mb-4">{productoSeleccionado.descripcion}</p>
                <p className="text-lg text-green-600 mb-4">
                  Precio: S/.{parseFloat(productoSeleccionado.precio_unidad).toFixed(2)} por {productoSeleccionado.unidad_medida}
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <button onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">
                    -
                  </button>
                  <span className="text-lg font-bold px-4 bg-white text-gray-800">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">
                    +
                  </button>
                </div>

                <p className="text-lg font-semibold text-green-600 mb-4">
                  Subtotal: S/.{(parseFloat(productoSeleccionado.precio_unidad) * cantidad).toFixed(2)}
                </p>

                <button onClick={agregarAlCarrito} className="mt-4 w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
