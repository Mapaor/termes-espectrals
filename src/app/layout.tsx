import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora de Termes Espectrals Atòmics",
  description: "Calculadora de termes espectrals atòmics amb acoblament Russell-Saunders (L-S), estructura fina, regles de Hund i càlcul de degeneracions.",
  keywords: ["física atòmica", "termes espectrals", "Russell-Saunders", "estructura fina", "regles de Hund", "degeneració"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
