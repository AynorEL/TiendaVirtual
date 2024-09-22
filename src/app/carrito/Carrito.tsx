"use client"; // Asegúrate de que este componente sea interactivo en Next.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DetallesPago from "./DetallesPago"; // Asegúrate de que la ruta sea correcta

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [cupon, setCupon] = useState<string>(""); // Estado para el cupón
  const [isMounted, setIsMounted] = useState(false); 
  const [mostrarPago, setMostrarPago] = useState(false); // Controla si se muestra el formulario de pago
  const [descuento, setDescuento] = useState<number>(0); // Estado para el descuento del cupón

  // Función para cargar el carrito desde la API
  const obtenerCarrito = async () => {
    try {
      const response = await fetch("/api/carrito?id_usuario=1");
      if (response.ok) {
        const data = await response.json();
        setCarrito(data || []);
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    obtenerCarrito();
  }, []);

  if (!isMounted) {
    return null; 
  }

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
    return carrito
      .reduce((total, item) => {
        const precio = parseFloat(item.precio_unitario || "0");
        const cantidad = item.cantidad || 0;
        return total + precio * cantidad;
      }, 0)
      .toFixed(2);
  };

  // Función para aplicar el cupón
  const aplicarCupon = () => {
    if (cupon === "DESCUENTO10") {
      setDescuento(0.10); // Aplica un 10% de descuento si el cupón es válido
      console.log("Cupón aplicado: 10% de descuento");
    } else {
      setDescuento(0); // No aplica descuento si el cupón es inválido
      console.log("Cupón inválido");
    }
  };

  // Función para confirmar el pago (simulación)
  const confirmarPago = () => {
    console.log("Pago confirmado");
    // Aquí puedes implementar la lógica para procesar el pago
  };

  // Función para manejar la transición a la pantalla de pago
  const manejarFinalizarCompra = () => {
    setMostrarPago(true); // Cambiar estado para mostrar el formulario de pago
  };

  if (mostrarPago) {
    // Mostrar el formulario de pago en lugar del carrito
    return (
      <DetallesPago
        onConfirmarPago={confirmarPago}
        productos={carrito}
        total={parseFloat(calcularTotalCarrito()) - (parseFloat(calcularTotalCarrito()) * descuento)} // Aplicar descuento
      />
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-center text-3xl font-bold text-green-800 mb-8">
        Carrito de Compras
      </h2>

      <div className="flex flex-col md:flex-row justify-between">
        {/* Contenedor con scroll solo para productos */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-4">
          <div className="max-h-96 overflow-y-auto">
            {carrito.length > 0 ? (
              carrito.map((item) => (
                <div
                  key={item.id_producto}
                  className="flex flex-col sm:flex-row justify-between items-center border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imagen}
                      alt={item.nombre_producto}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">
                        {item.nombre_producto}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 sm:mt-0">
                    <span className="text-lg font-semibold">
                      S/.{item.precio_unitario}
                    </span>
                    <span className="text-lg font-semibold ml-4">
                      S/.{(parseFloat(item.precio_unitario) * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">El carrito está vacío.</p>
            )}
          </div>

          {/* Botones fuera del área de scroll */}
          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <Link href="/agropecuaria/productos">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm flex items-center mb-2 sm:mb-0">
                <span className="mr-2">←</span> SEGUIR COMPRANDO
              </button>
            </Link>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
              onClick={manejarFinalizarCompra} // Al hacer clic, mostrar la pantalla de pago
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </div>

        {/* Resumen del carrito */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4 md:ml-4 mt-4 md:mt-0">
          <h3 className="text-xl font-bold mb-4">Totales del Carrito</h3>
          <div className="flex justify-between py-2">
            <span className="text-lg">Subtotal:</span>
            <span className="text-lg font-semibold">S/.{calcularTotalCarrito()}</span>
          </div>

          {/* Aplicar descuento si el cupón es válido */}
          {descuento > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-lg">Descuento (10%):</span>
              <span className="text-lg font-semibold">-S/.{(parseFloat(calcularTotalCarrito()) * descuento).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between py-2">
            <span className="text-lg">Total:</span>
            <span className="text-lg font-semibold">
              S/.{(parseFloat(calcularTotalCarrito()) - (parseFloat(calcularTotalCarrito()) * descuento)).toFixed(2)}
            </span>
          </div>

          {/* Sección de cupón */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Cupón</h4>
            <input
              type="text"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
              placeholder="Código de cupón"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            <button
              onClick={aplicarCupon}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
            >
              Aplicar cupón
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
