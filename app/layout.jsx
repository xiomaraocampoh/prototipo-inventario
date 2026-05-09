import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Stockly — Dashboard',
  description: 'Gestión de inventario y logística B2B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-slate-50 antialiased text-slate-700`}>
        {children}
      </body>
    </html>
  );
}
