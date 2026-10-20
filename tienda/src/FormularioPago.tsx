import { useState } from 'react';
import type { FormEvent } from 'react';

interface FormularioPagoProps {
  // la funcion que hace el pago de verdad la manda el papa (App)
  onPagar: (correo: string, telefono: string) => Promise<void>;
}

export function FormularioPago({ onPagar }: FormularioPagoProps) {
  // formulario controlado: lo que escribe la persona vive en el estado
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    // sin esto el navegador recarga toda la pagina al enviar el formulario
    e.preventDefault();
    setError('');

    // se valida antes de mandar nada a la api
    if (!correo.includes('@')) {
      setError('El correo debe tener @');
      return;
    }
    if (!/^\d{10}$/.test(telefono)) {
      setError('El teléfono debe tener 10 dígitos');
      return;
    }

    setEnviando(true);
    try {
      await onPagar(correo, telefono);
    } catch (err) {
      // aqui cae el mensaje de la api, por ejemplo cuando no alcanza la existencia (409)
      setError(err instanceof Error ? err.message : 'Algo salió mal');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="pago" onSubmit={enviar}>
      <h2>Pagar</h2>

      <label>
        Correo
        <input
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </label>

      <label>
        Teléfono
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </label>

      {error && <p className="pago__error">{error}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Pagar'}
      </button>
    </form>
  );
}
