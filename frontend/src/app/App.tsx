import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import HotSales from "../components/HotSales";
import PostDetail from "../pages/PostDetail";
import { Routes, Route } from "react-router-dom";
import "../styles.css";

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const location = (require('react-router-dom') as any).useLocation();
  const params = new URLSearchParams(location.search || window.location.search);
  const showDebugOverlay = params.get('debugOverlay') === '1';
  React.useEffect(() => {
    console.log('[app] App mounted');
    return () => console.log('[app] App unmounted');
  }, []);

  React.useEffect(() => {
    console.log('[app] activeCategory changed', activeCategory);
  }, [activeCategory]);

  function RouteLogger() {
    const location = (require('react-router-dom') as any).useLocation();
    React.useEffect(() => {
      console.log('[app] route:', location.pathname + (location.search || ''));
    }, [location]);
    return null;
  }

  return (
    <BrowserRouter>
      <div>
        {showDebugOverlay && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',color:'#fff,zIndex:2147483647,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:20}}>DEBUG OVERLAY — React mounted. Remove ?debugOverlay=1 to hide.</div>}
        <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <HotSales />

        <RouteLogger />

        <main className="container">
          <Routes>
            <Route
              path="/"
              element={<div style={{ padding: 28 }}><h2 style={{ marginTop:0 }}>Category: {activeCategory}</h2></div>}
            />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
