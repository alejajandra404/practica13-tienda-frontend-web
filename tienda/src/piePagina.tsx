import { pesos } from './datos';

interface PiePaginaProps {
  piezas: number;
  total: number;
}

// el pie queda fijo abajo 
export function PiePagina({ piezas, total }: PiePaginaProps) {
  return (
    <footer className="pie">
      <span className="pie__resumen">
        {piezas === 0
          ? 'Tu carrito está vacío'
          : `${piezas} pieza(s) en el carrito`}
      </span>
      {/* pesos.format convierte el numero a dinero, por ejemplo 1299 a $1,299.00 */}
      <span className="pie__total">{pesos.format(total)}</span>
    </footer>
  );
}
