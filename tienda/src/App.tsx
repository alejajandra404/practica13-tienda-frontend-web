import { useState } from 'react';
import { productos } from './datos';
import type { Producto } from './datos';
import { Layout } from './layout';
import { Encabezado } from './encabezado';
import { PiePagina } from './piePagina';
import { Catalogo } from './catalogo';
import { Filtros } from './filtros';

const categorias = [
  'Todas',
  ...Array.from(new Set(productos.map((p) => p.categoria)))
];

export default function App() {
  // en el estado solo se guarda lo que cambia o sea el filtro activo y lo que hay en el carrito
  const [categoria, setCategoria] = useState<string>('Todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);

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

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <Filtros
          categorias={categorias}
          activa={categoria}
          onCambiar={setCategoria}
        />
        <Catalogo
          productos={productosVisibles}
          onAgregar={agregarAlCarrito}
        />
      </section>
    </Layout>
  );
}