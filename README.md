# Interaktywna mapa z wykorzystaniem OpenLayers do wyświetlania tarnowskich pomników

## 🚀 Technologie (Tech Stack)

Aplikacja została zbudowana w oparciu o stos technologiczny:

* **[React.js](https://reactjs.org/)** (v18) - Zarządzanie stanem i cyklem życia komponentów (Hooki: `useState`, `useEffect`, `useRef`).
* **[TypeScript](https://www.typescriptlang.org/)** - Ścisłe typowanie danych (interfejsy dla obiektów geograficznych), eliminacja błędów w czasie kompilacji.
* **[OpenLayers](https://openlayers.org/)** - Potężna biblioteka do renderowania map i warstw wektorowych (radząca sobie ze skomplikowanymi rzutowaniami).
* **[Tailwind CSS](https://tailwindcss.com/)** - Szybkie i responsywne stylowanie interfejsu (podejście utility-first) wraz z płynnymi animacjami (wsuwany panel).
* **[Vite](https://vitejs.dev/)** - Błyskawiczny bundler i serwer deweloperski.

## ✨ Główne funkcjonalności

- **Dynamiczne renderowanie wektorów:** Wczytywanie danych punktowych (Point) z pliku JSON i rzutowanie ich z formatu WGS84 (EPSG:4326) do formatu Web Mercator (EPSG:3857) używanego przez mapę.
- **Interaktywne pinezki:** Niestandardowe ostylowanie obiektów typu `Feature` oraz zmiana kursora po najechaniu na obiekt.
- **Wydobywanie danych z mapy:** Obsługa zdarzeń `singleclick` połączona z metodą `forEachFeatureAtPixel`, co pozwala na powiązanie klikniętego punktu na płótnie (canvas) z konkretnym obiektem danych (rekordem pomnika).
- **Responsywny UI:** Zaimplementowany animowany panel boczny wyświetlający szczegółowe informacje (zdjęcie, autor, lokalizacja, opis) wybranego pomnika, z możliwością jego płynnego zamknięcia.