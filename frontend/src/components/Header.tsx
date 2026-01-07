import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          Boroko Real Estate
        </Link>
        <nav>
          <Link to="/listings">Listings</Link>
          <Link to="/create">Create</Link>
        </nav>
      </div>
    </header>
  );
}
