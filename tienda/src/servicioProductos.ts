import { api } from './api';
import type { Producto } from './datos';

// la api no regresa la lista sola, la regresa como { data, meta }
interface Sobre {
  data: Producto[];
  meta: unknown;
}

export async function pedirProductos(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre>('/productos');
  // adentro esta el data con la lista
  return respuesta.data.data;
}
