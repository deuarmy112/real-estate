import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import "../styles.css";

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <BrowserRouter>
      <div>
        <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <main className="container">
          <section style={{padding:28,minHeight:240}}>
            <h2 style={{marginTop:0}}>Category: {activeCategory}</h2>
            <p className="muted">This page has been simplified to show new content driven by the header categories. Add your components here to render listings for the selected category.</p>
            <div style={{marginTop:18}}>
              {/* Placeholder area for category-driven content */}
            </div>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
}
