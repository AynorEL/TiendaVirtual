import React, { useState, useEffect } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDinersClub,
} from "react-icons/fa";

// Definición de la interfaz para los productos
interface Producto {
  id_producto: number;
  nombre_producto: string;
  precio_unitario: number;
  cantidad: number;
}

// Definición de la interfaz para las props del componente
interface DetallesPagoProps {
  onConfirmarPago: () => void;
  productos: Producto[];
  total: number;
}

const DetallesPago: React.FC<DetallesPagoProps> = ({
  onConfirmarPago,
  productos,
  total,
}) => {
  // Estado para los datos del formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    direccion: "",
    provincia: "",
    distrito: "",
    codigoPostal: "",
    metodoPago: "tarjeta",
    tarjeta: "",
    expiracion: "",
    cvv: "",
  });

  // Estados para almacenar las provincias y los distritos filtrados
  const [provincias, setProvincias] = useState<any[]>([]);
  const [distritos, setDistritos] = useState<any[]>([]);
  const [tipoTarjeta, setTipoTarjeta] = useState<string>("");

  // Efecto para cargar las provincias al montar el componente
  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const response = await fetch("/api/provincias");
        const data = await response.json();
        setProvincias(data);
      } catch (error) {
        console.error("Error al cargar provincias:", error);
      }
    };
    cargarProvincias();
  }, []);

  // Función para manejar el cambio en el formulario
  const manejarCambio = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });

    // Detectar el tipo de tarjeta al escribir el número
    if (name === "tarjeta") {
      detectarTipoTarjeta(value);
    }

    // Si el campo cambiado es la provincia, cargar los distritos correspondientes
    if (name === "provincia") {
      try {
        const response = await fetch(`/api/distritos?province_id=${value}`);
        const data = await response.json();
        setDistritos(data); // Establecer distritos filtrados
      } catch (error) {
        console.error("Error al cargar distritos:", error);
      }
    }
  };

  // Función para detectar el tipo de tarjeta de crédito
  const detectarTipoTarjeta = (numeroTarjeta: string) => {
    const visaRegex = /^4/;
    const mastercardRegex = /^5[1-5]|^2[2-7]/;
    const amexRegex = /^3[47]/;
    const dinersRegex = /^3(?:0[0-5]|[68])/;

    if (visaRegex.test(numeroTarjeta)) {
      setTipoTarjeta("visa");
    } else if (mastercardRegex.test(numeroTarjeta)) {
      setTipoTarjeta("mastercard");
    } else if (amexRegex.test(numeroTarjeta)) {
      setTipoTarjeta("amex");
    } else if (dinersRegex.test(numeroTarjeta)) {
      setTipoTarjeta("diners");
    } else {
      setTipoTarjeta(""); // Si no coincide con ninguna tarjeta
    }
  };

  // Función para manejar la confirmación del pago
  const manejarConfirmacion = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmarPago();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8 p-4 md:p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto mt-8">
        {/* Resumen del Pedido */}
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md order-1 md:order-none">
          <h3 className="font-bold text-xl mb-4 text-gray-900">Tu Pedido</h3>
          <div className="space-y-4">
            {productos.map((producto) => (
              <div key={producto.id_producto} className="flex justify-between">
                <p>
                  {producto.nombre_producto} × {producto.cantidad}
                </p>
                <p>
                  S/.{" "}
                  {(producto.precio_unitario * producto.cantidad).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-gray-600">Total:</p>
            <p className="font-bold text-xl text-gray-900">
              S/. {total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Formulario de Facturación */}
        <div className="md:col-span-2 order-2 md:order-none">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
            Detalles de Facturación
          </h2>
          <form onSubmit={manejarConfirmacion} className="space-y-6">
            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Nombre*"
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              <input
                type="text"
                name="apellidos"
                value={formulario.apellidos}
                onChange={manejarCambio}
                placeholder="Apellidos*"
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>

            {/* Información de contacto */}
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={manejarCambio}
              placeholder="Correo Electrónico*"
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="text"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              placeholder="Teléfono*"
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />

            {/* Dirección de Facturación */}
            <input
              type="text"
              name="direccion"
              value={formulario.direccion}
              onChange={manejarCambio}
              placeholder="Dirección*"
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="provincia"
                value={formulario.provincia}
                onChange={manejarCambio}
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
              >
                <option value="">Selecciona una provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.name}
                  </option>
                ))}
              </select>

              <select
                name="distrito"
                value={formulario.distrito}
                onChange={manejarCambio}
                required
                className="border border-gray-300 rounded-lg p-3 w-full"
                disabled={!formulario.provincia}
              >
                <option value="">Selecciona un distrito</option>
                {distritos.map((distrito) => (
                  <option key={distrito.id} value={distrito.id}>
                    {distrito.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="codigoPostal"
              value={formulario.codigoPostal}
              onChange={manejarCambio}
              placeholder="Código Postal*"
              required
              className="border border-gray-300 rounded-lg p-3 w-full"
            />

            {/* Método de pago */}
            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2">
                Selecciona el método de pago
              </label>
              <select
                name="metodoPago"
                value={formulario.metodoPago}
                onChange={manejarCambio}
                className="border border-gray-300 rounded-lg p-3 w-full"
              >
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
                <option value="yape">Yape</option>
                <option value="plin">Plin</option>
              </select>
            </div>

            {/* Campos adicionales dinámicos basados en el método de pago */}
            {formulario.metodoPago === "tarjeta" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                <div className="relative">
                  <input
                    type="text"
                    name="tarjeta"
                    value={formulario.tarjeta}
                    onChange={manejarCambio}
                    placeholder="Número de la Tarjeta*"
                    required
                    className="border border-gray-300 rounded-lg p-3 w-full"
                  />
                  {/* Mostrar el ícono correspondiente */}
                  <div className="absolute right-4 top-3">
                    {tipoTarjeta === "visa" && <FaCcVisa size={24} />}
                    {tipoTarjeta === "mastercard" && (
                      <FaCcMastercard size={24} />
                    )}
                    {tipoTarjeta === "amex" && <FaCcAmex size={24} />}
                    {tipoTarjeta === "diners" && <FaCcDinersClub size={24} />}
                  </div>
                </div>
                <input
                  type="text"
                  name="expiracion"
                  value={formulario.expiracion}
                  onChange={manejarCambio}
                  placeholder="Expiración (MM/AA)*"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full"
                />
                <input
                  type="text"
                  name="cvv"
                  value={formulario.cvv}
                  onChange={manejarCambio}
                  placeholder="CVV*"
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600 transition"
            >
              Confirmar Pago
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetallesPago;
