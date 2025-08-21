import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculadora de Termes Espectrals Atòmics",
  description: "Calculadora de termes espectrals atòmics amb acoblament Russell-Saunders (L-S), estructura fina, regles de Hund i càlcul de degeneracions.",
  keywords: ["física atòmica", "termes espectrals", "Russell-Saunders", "estructura fina", "regles de Hund", "degeneració"],
  openGraph: {
    title: "Calculadora de Termes Espectrals Atòmics",
    description: "Calculadora de termes espectrals atòmics amb acoblament Russell-Saunders (L-S), estructura fina, regles de Hund i càlcul de degeneracions.",
    url: "https://termes-espectrals.vercel.app",
    type: "website",
    images: [
      {
        url: "https://termes-espectrals.vercel.app/banner.png",
        width: 1200,
        height: 630,
        alt: "Banner Calculadora Termes Espectrals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Termes Espectrals Atòmics",
    description: "Calculadora de termes espectrals atòmics amb acoblament Russell-Saunders (L-S), estructura fina, regles de Hund i càlcul de degeneracions.",
    images: ["https://termes-espectrals.vercel.app/banner.png"],
    site: "@termesespectrals",
  },
  metadataBase: new URL("https://termes-espectrals.vercel.app"),
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
