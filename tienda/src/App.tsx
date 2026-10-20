import { useState } from 'react';
import type { Producto } from './datos';
import { Layout } from './layout';
import { Encabezado } from './encabezado';
import { PiePagina } from './piePagina';
import { Catalogo } from './catalogo';
import { Filtros } from './filtros';
import { Cargando } from './Cargando';
import { MensajeError } from './MensajeError';
import { usarProductos } from './usarProductos';
import { FormularioPago } from './FormularioPago';
import { crearPedido } from './servicioPedidos';

export default function App() {
  // ahora los productos ya no vienen del arreglo
  const { productos, cargando, error, recargar } = usarProductos();

  // en el estado solo se guarda lo que cambia o sea el filtro activo y lo que hay en el carrito
  const [categoria, setCategoria] = useState<string>('Todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);
  // el folio que regresa la api cuando el pedido sale bien
  const [folio, setFolio] = useState<string | null>(null);

  // las categorias salen de los productos que llegaron de la api
  const categorias = [
    'Todas',
    ...Array.from(new Set(productos.map((p) => p.categoria)))
  ];

  // la lista filtrada, las piezas y el total no van en el estado
  const productosVisibles =
    categoria === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  const piezas = carrito.length;
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  // no se modifica el carrito de antes
  function agregarAlCarrito(producto: Producto) {
    setCarrito([...carrito, producto]);
  }

  // si la api rechaza el pedido, crearPedido lanza el error y el formulario lo muestra
  async function pagar(correo: string, telefono: string) {
    const ids = carrito.map((p) => p.id);
    const pedido = await crearPedido(correo, telefono, ids);
    setFolio(pedido.folio);
    // se vacia el carrito y se vuelven a pedir los productos para ver la existencia nueva
    setCarrito([]);
    recargar();
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        {/* se muestra solo una de las tres cosas, segun el estado de la peticion */}
        {cargando ? (
          <Cargando />
        ) : error ? (
          <MensajeError mensaje={error} onReintentar={recargar} />
        ) : (
          <>
            <Filtros
              categorias={categorias}
              activa={categoria}
              onCambiar={setCategoria}
            />
            <Catalogo
              productos={productosVisibles}
              onAgregar={agregarAlCarrito}
            />
          </>
        )}

        {/* el formulario solo sale si hay algo en el carrito */}
        {piezas > 0 && <FormularioPago onPagar={pagar} />}

        {folio && <p className="confirmacion">Pedido confirmado. Tu folio es {folio}</p>}
      </section>
    </Layout>
  );
}