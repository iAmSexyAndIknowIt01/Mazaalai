// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Mazaalai Alert',
  description: 'Эмэгтэйчүүд, хүүхдүүдийг аюулаас хамгаалах төхөөрөмж',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
