import { isAxiosError } from 'axios';
import { api } from './api';

// la api regresa el folio y el total como { data, meta }
interface RespuestaPedido {
  data: { folio: string; total: number };
  meta: unknown;
}

// cuando la api rechaza el pedido, su mensaje viene en message (puede ser texto o una lista)
interface ErrorApi {
  message: string | string[];
}

// manda el pedido a la api con los ids de lo que hay en el carrito
export async function crearPedido(correo: string, telefono: string, productos: string[]) {
  try {
    const respuesta = await api.post<RespuestaPedido>('/pedidos', { correo, telefono, productos });
    return respuesta.data.data;
  } catch (error) {
    // si la api contesto con un error (por ejemplo 409), paso su mensaje tal cual
    if (isAxiosError<ErrorApi>(error) && error.response) {
      const mensaje = error.response.data.message;
      throw new Error(Array.isArray(mensaje) ? mensaje.join('. ') : mensaje);
    }
    // si ni siquiera contesto, es que no hay conexion con la api
    throw new Error('No se pudo conectar con la API. Intenta de nuevo.');
  }
}
