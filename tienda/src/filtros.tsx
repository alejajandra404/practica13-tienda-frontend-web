interface FiltrosProps {
  categorias: string[];
  activa: string;
  onCambiar: (categoria: string) => void;
}

export function Filtros({ categorias, activa, onCambiar }: FiltrosProps) {
  return (
    <div className="filtros">
      {categorias.map((c) => (
        <button
          key={c}
          className={`filtros__boton ${
            c === activa ? 'filtros__boton--activo' : ''
          }`}
          onClick={() => onCambiar(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}