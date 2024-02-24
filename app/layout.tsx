import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme.provider';
import { HeadingComponent } from '@/components/HeadingComponent';
import { SideNavigationComponent } from '@/components/SideNavigationComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marvel',
  description: 'Welcome to Marvel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <html lang="en">
        <body className={inter.className}>
          <HeadingComponent />
          <main className="grid grid-cols-12">
            <SideNavigationComponent />
            <section className=" col-span-11">{children}</section>
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
