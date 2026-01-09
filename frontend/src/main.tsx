import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
console.log('[app] main.tsx: starting render', { href: typeof window !== 'undefined' ? window.location.href : '' });

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
