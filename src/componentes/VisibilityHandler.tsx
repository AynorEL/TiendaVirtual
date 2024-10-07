// src/components/VisibilityHandler.tsx

"use client";
import { useEffect, useRef } from 'react';

export default function VisibilityHandler() {
  const originalTitle = "Tienda Virtual";
  const originalIcon = "/images/logoprincipal.png"; // Ícono original desde la carpeta public
  const sadIcon = "/images/llorando.png"; // Ícono para cuando el usuario se va

  const dramaticPhrases = [
    "Vuelve, todo está vacío sin ti 😭",
    "Vuelve, no seas como tu ex 💔",
    "Vuelve, prometo no fallarte 😢",
    "Hasta las ofertas te extrañan vuelve 😔",
    "Vuelve, te extraño más que tu ex 😞",
    "Todo es triste sin ti... vuelve 😩"
  ];

  const phraseIndexRef = useRef(0);

  const changeFavicon = (iconUrl: string) => {
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = `${iconUrl}?v=${new Date().getTime()}`;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = `${iconUrl}?v=${new Date().getTime()}`;
      document.head.appendChild(link);
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      document.title = dramaticPhrases[phraseIndexRef.current];
      changeFavicon(sadIcon);
      phraseIndexRef.current = (phraseIndexRef.current + 1) % dramaticPhrases.length;
    } else {
      document.title = originalTitle;
      changeFavicon(originalIcon);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Establecer el favicon inicial
    changeFavicon(originalIcon);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
