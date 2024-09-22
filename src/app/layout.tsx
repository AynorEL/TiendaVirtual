"use client"; // Marca el componente como Client Component

import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalTitle = document.title;
    const originalIcon = "/images/logoprincipal.png"; // Ícono original
    const sadIcon = "/images/llorando.png"; // Ícono para cuando el usuario se va

    // Frases cortas para evitar desbordar en la pestaña
    const dramaticPhrases = [
      "Vuelve, todo está vacío sin ti 😭",
      "Vuelve, no seas como tu ex 💔",
      "Vuelve, prometo no fallarte 😢",
      "Hasta las ofertas te extrañan vuelve 😔",
      "Vuelve, te extraño más que tu ex 😞",
      "Todo es triste sin ti... vuelve 😩"
    ];
       
    

    let phraseIndex = 0;

    const changeFavicon = (iconUrl: string) => {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = iconUrl;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = dramaticPhrases[phraseIndex]; // Cambia a la frase actual
        changeFavicon(sadIcon); // Cambia al ícono llorando
        phraseIndex = (phraseIndex + 1) % dramaticPhrases.length; // Actualiza el índice para la siguiente frase
      } else {
        document.title = originalTitle;
        changeFavicon(originalIcon); // Restaura el ícono original
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Tienda Virtual</title>
        <meta name="description" content="Tienda generada con Next.js" />
        <link rel="icon" href="/images/logoprincipal.png" type="image/png" /> {/* Ícono original */}
      </head>
      <body>{children}</body>
    </html>
  );
}
