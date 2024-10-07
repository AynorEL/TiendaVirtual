// src/app/layout.tsx

import './globals.css';
import VisibilityHandler from '../componentes/VisibilityHandler';

export const metadata = {
  title: 'Tienda Virtual',
  description: 'Tienda Virtual',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Incluir el componente cliente */}
        <VisibilityHandler />
        {children}
      </body>
    </html>
  );
}
