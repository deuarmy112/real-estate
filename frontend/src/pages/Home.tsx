import React from "react";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>Real Estate Co.</div>
            <h1 style={{ margin: 0 }}>Find your next home</h1>
            <p className="lead">Search listings, view details, and create new listings.</p>
          </div>

          <div style={{ minWidth: 320 }}>
            <input
              placeholder="Search by city, address or title..."
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
            />
          </div>
        </div>
      </section>

      <section className="container">
        <div style={{ padding: 28 }}>
          <h2 style={{ marginTop: 0 }}>New Content Area</h2>
          <p className="muted">This page has been simplified. Add your new category-driven content here — it will render after the header categories and the hero text.</p>
          <div style={{ marginTop: 18 }}>
            {/* TODO: insert new components for category results, featured items, or other custom content */}
          </div>
        </div>
      </section>
    </>
  );
}
