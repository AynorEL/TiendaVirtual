// C:\Users\Lina\Videos\tiendavirtual\src\app\agropecuaria\CrudProductos\page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../globals.css';

type Producto = {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  stock: number;
  imagen: string;
  fecha_creacion: string;
  id_proveedor: number | null;
  nombre_proveedor: string | null;
  id_categoria: number;
  nombre_categoria: string;
  unidad_medida: string | null;
  precio_unidad: number;
};

type Proveedor = {
  id_proveedor: number;
  nombre: string;
};

type Categoria = {
  id_categoria: number;
  nombre_categoria: string;
};

const CrudProductos = () => {
  // Estados para datos y carga
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosLoading, setProductosLoading] = useState<boolean>(false);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Producto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const [formValues, setFormValues] = useState({
    nombre_producto: "",
    descripcion: "",
    stock: "",
    imagen: null as File | null,
    id_proveedor: "",
    id_categoria: "",
    unidad_medida: "",
    precio_unidad: "",
  });

  useEffect(() => {
    fetchProductos();
    fetchProveedores();
    fetchCategorias();
  }, []);

  const fetchProductos = async () => {
    setProductosLoading(true);
    try {
      const res = await fetch("/api/Crudproductos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      toast.error("Error al cargar los productos");
    } finally {
      setProductosLoading(false);
    }
  };

  const fetchProveedores = async () => {
    try {
      const res = await fetch("/api/Crudproductos?tipo=proveedores");
      const data = await res.json();
      setProveedores(data);
    } catch (error) {
      toast.error("Error al cargar los proveedores");
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await fetch("/api/Crudproductos?tipo=categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      toast.error("Error al cargar las categorías");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar que la imagen esté presente si no se está editando
    if (!formValues.imagen && !isEditing) {
      toast.error("Por favor, selecciona una imagen antes de enviar");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre_producto", formValues.nombre_producto);
      formData.append("descripcion", formValues.descripcion);
      formData.append("stock", formValues.stock);
      formData.append("id_proveedor", formValues.id_proveedor);
      formData.append("id_categoria", formValues.id_categoria);
      formData.append("unidad_medida", formValues.unidad_medida);
      formData.append("precio_unidad", formValues.precio_unidad);

      // Solo agregar la imagen si está presente
      if (formValues.imagen) {
        formData.append("imagen", formValues.imagen);
      }

      // Si estamos editando, agregamos el id del producto
      if (isEditing && currentProduct) {
        formData.append("id_producto", currentProduct.id_producto.toString());
      }

      const method = isEditing ? "PUT" : "POST";
      const url = "/api/Crudproductos";

      const res = await fetch(url, {
        method: method,
        body: formData, // Enviamos el FormData
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente");
        fetchProductos();
        setIsEditing(false);
        setIsModalOpen(false);
        resetFormValues();
      } else {
        toast.error(data.error || "Error al guardar producto");
      }
    } catch (error) {
      toast.error("Error al guardar producto");
    }
  };

  const resetFormValues = () => {
    setFormValues({
      nombre_producto: "",
      descripcion: "",
      stock: "",
      imagen: null,
      id_proveedor: "",
      id_categoria: "",
      unidad_medida: "",
      precio_unidad: "",
    });
  };

  const handleDelete = (id_producto: number) => {
    setProductToDelete(id_producto);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete !== null) {
      try {
        const res = await fetch(`/api/Crudproductos?id_producto=${productToDelete}`, {
          method: "DELETE",
        });

        if (res.ok) {
          toast.success("Producto eliminado correctamente");
          fetchProductos();
        } else {
          const data = await res.json();
          toast.error(data.error || "Error al eliminar producto");
        }
      } catch (error) {
        toast.error("Error al eliminar producto");
      } finally {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const handleEdit = (producto: Producto) => {
    setIsEditing(true);
    setCurrentProduct(producto);
    setFormValues({
      nombre_producto: producto.nombre_producto,
      descripcion: producto.descripcion,
      stock: producto.stock.toString(),
      imagen: null, // No se carga la imagen actual al formulario
      id_proveedor: producto.id_proveedor?.toString() || "",
      id_categoria: producto.id_categoria.toString(),
      unidad_medida: producto.unidad_medida || "",
      precio_unidad: producto.precio_unidad.toString(),
    });
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    resetFormValues();
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'imagen' && files) {
      setFormValues({ ...formValues, imagen: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  // Componente Spinner para el loader
  const Spinner = () => (
    <div className="flex justify-center items-center my-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Productos</h1>

      <div className="text-right mb-4">
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          <PlusIcon className="h-5 w-5 inline-block mr-2" /> Agregar Producto
        </button>
      </div>

      {/* Modal para agregar o editar producto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Producto" : "Crear Nuevo Producto"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre_producto"
                  placeholder="Nombre del producto"
                  value={formValues.nombre_producto}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="number"
                  name="precio_unidad"
                  placeholder="Precio Unidad"
                  value={formValues.precio_unidad}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formValues.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="text"
                  name="unidad_medida"
                  placeholder="Unidad de Medida"
                  value={formValues.unidad_medida}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                />
                <select
                  name="id_proveedor"
                  value={formValues.id_proveedor}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Seleccionar Proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
                <select
                  name="id_categoria"
                  value={formValues.id_categoria}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2"
                  required
                >
                  <option value="">Seleccionar Categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formValues.descripcion}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
                rows={3}
              />
              {isEditing && currentProduct?.imagen && (
                <div className="mb-2">
                  <p>Imagen actual:</p>
                  <img src={currentProduct.imagen} alt="Imagen actual" className="h-20 mb-2" />
                </div>
              )}
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              {isEditing && (
                <p className="text-sm text-gray-600 mb-2">
                  Deja este campo vacío si no quieres cambiar la imagen.
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {isEditing ? "Actualizar Producto" : "Crear Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="mr-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {productosLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Precio Unidad</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Fecha Creación</th>
                <th className="py-2 px-4 border-b">Proveedor</th>
                <th className="py-2 px-4 border-b">Categoría</th>
                <th className="py-2 px-4 border-b">Unidad Medida</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td className="py-2 px-4 border-b">{producto.id_producto}</td>
                  <td className="py-2 px-4 border-b">{producto.nombre_producto}</td>
                  <td className="py-2 px-4 border-b">{producto.descripcion}</td>
                  <td className="py-2 px-4 border-b">S/. {producto.precio_unidad}</td>
                  <td className="py-2 px-4 border-b">{producto.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={producto.imagen} alt={producto.nombre_producto} className="h-16 w-16 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(producto.fecha_creacion).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{producto.nombre_proveedor}</td>
                  <td className="py-2 px-4 border-b">{producto.nombre_categoria}</td>
                  <td className="py-2 px-4 border-b">{producto.unidad_medida}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => handleEdit(producto)}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id_producto)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CrudProductos;
