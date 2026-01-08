import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <Link to="/" className="brand">
            <div style={{fontSize:16}}>Boroko</div>
            <div style={{fontSize:11, marginTop:2}}>Real Estate</div>
          </Link>
          <div className="search" style={{flex:1}}>
            <input className="search-input" placeholder="Search city, neighborhood, or property" />
          </div>
        </div>
        <nav>
          <Link to="/listings">Listings</Link>
          <Link to="/create">Create</Link>
          {user ? (
            <>
              <span style={{marginLeft:12, marginRight:8}}>Hi, {user.name || user.email}</span>
              <button className="btn" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{marginLeft:12}}>Sign in</Link>
              <Link to="/register" style={{marginLeft:12}}>Register</Link>
            </>
          )}
          <Link to="/contact/1" className="btn" style={{marginLeft:12,padding:'8px 12px'}}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
