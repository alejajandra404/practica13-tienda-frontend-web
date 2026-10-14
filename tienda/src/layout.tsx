import React from 'react';

interface LayoutProps {
  encabezado: React.ReactNode;
  pie: React.ReactNode;
  children: React.ReactNode;
}

// el layout solo acomoda tres huecos: arriba, en medio (children) y abajo
export function Layout({ encabezado, pie, children }: LayoutProps) {
  return (
    <div className="tienda">
      {encabezado}
      <main className="contenido">
        {children}
      </main>
      {pie}
    </div>
  );
}