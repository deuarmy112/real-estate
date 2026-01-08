import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer" style={{ marginTop: 40, padding: 24, background: "transparent" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 200 }}>
          <div style={{ fontWeight: 800, color: "var(--accent)" }}>Boroko Real Estate</div>
          <div className="muted">Find. Stage. Sell.</div>
        </div>

        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/listings">Listings</Link>
          <Link to="/create">Create Listing</Link>
          <Link to="/contact/1">Contact</Link>
        </nav>

        <div className="muted" style={{ fontSize: 13 }}>© {new Date().getFullYear()} Boroko Real Estate</div>
      </div>
    </footer>
  );
}
