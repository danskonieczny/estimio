// src/app/layout.tsx
import './globals.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl">
      <body className="font-sans bg-gradient-to-tr from-brand-50 to-brand-100 min-h-screen">
        <header className="bg-white/90 shadow-md border-b sticky top-0 z-20">
        <div className="w-full md:w-3/4 mx-auto flex items-center px-4 py-4">

            <span className="text-lg font-extrabold tracking-tight text-brand-700">Estimio</span>
          </div>
        </header>
        <main className="w-full mx-auto px-4 py-8">{children}</main>
        <footer className="text-sm text-gray-400 py-8 text-center">©2025 Estimio by Daniel</footer>
      </body>
    </html>
  );
}
