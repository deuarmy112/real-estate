import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display:'flex',alignItems:'center'}}>
          <Link to="/" className="brand">
            Boroko Real Estate
          </Link>
          <div className="search" style={{marginLeft:12}}>
            <input placeholder="Search city, address, or zip" />
          </div>
        </div>
        <nav>
          <Link to="/listings">Listings</Link>
          <Link to="/create">Create</Link>
          <Link to="/contact/1" className="btn" style={{marginLeft:12,padding:'8px 12px'}}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
