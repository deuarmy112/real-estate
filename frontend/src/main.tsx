import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
const banner = typeof document !== 'undefined' ? document.getElementById('debug-banner') : null;
if (banner) banner.textContent = 'DEBUG: main.tsx starting render...';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (banner) {
  // Delay to allow React to mount and update; this will be overwritten by App logs
  setTimeout(() => { try { banner.textContent = 'DEBUG: React render started'; banner.style.background = '#d1fae5' } catch(e){} }, 250);
}
