import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import HotSales from "../components/HotSales";
import PostDetail from "../pages/PostDetail";
import { Routes, Route } from "react-router-dom";
import "../styles.css";

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <BrowserRouter>
      <div>
        <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section style={{ padding: 28, minHeight: 240 }}>
                    <h2 style={{ marginTop: 0 }}>Category: {activeCategory}</h2>
                    <p className="muted">This page has been simplified to show new content driven by the header categories.</p>
                  </section>
                  <HotSales />
                </>
              }
            />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
