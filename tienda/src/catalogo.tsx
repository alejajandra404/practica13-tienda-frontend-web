import type { Producto } from './datos';
import { TarjetaProducto } from './tarjetaProducto';

interface CatalogoProps {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export function Catalogo({ productos, onAgregar }: CatalogoProps) {
  return (
    <section className="catalogo">
      {/* una tarjeta por cada producto, la key tiene que ser unica por eso se usa el id */}
      {productos.map((p) => (
        <TarjetaProducto
          key={p.id}
          producto={p}
          onAgregar={onAgregar}
        />
      ))}
    </section>
  );
}