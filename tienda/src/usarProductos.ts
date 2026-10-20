import { useEffect, useState } from 'react';
import type { Producto } from './datos';
import { pedirProductos } from './servicioProductos';

// pide los productos y regresa los tres estados de una peticion
export function usarProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // este numero sube cada vez que se quiere volver a pedir los productos
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    setCargando(true);
    setError(null);

    pedirProductos()
      .then((lista) => setProductos(lista))
      .catch(() => setError('No se pudieron cargar los productos. Revisa que la API esté encendida.'))
      .finally(() => setCargando(false));

    // el arreglo de dependencias, el efecto solo se repite cuando cambia intento
  }, [intento]);

  // al subir intento el efecto corre otra vez y vuelve a pedir los productos
  function recargar() {
    setIntento(intento + 1);
  }

  return { productos, cargando, error, recargar };
}
