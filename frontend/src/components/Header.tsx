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

  const [favCount, setFavCount] = React.useState(0);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      const favs = raw ? JSON.parse(raw) : [];
      setFavCount(favs.length || 0);
    } catch (e) {
      setFavCount(0);
    }
    const onStorage = () => {
      try { const raw = localStorage.getItem('favorites'); const favs = raw ? JSON.parse(raw) : []; setFavCount(favs.length || 0); } catch(e){}
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const [filter, setFilter] = React.useState('any');

  const handleFilterChange = (e: any) => {
    setFilter(String(e.target.value));
    // future: lift state or trigger search/filter action
  };

  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display:'flex',alignItems:'center',gap:16, flex:1}}>
          <Link to="/" className="brand">
            <div style={{fontSize:16}}>Boroko</div>
            <div style={{fontSize:11, marginTop:2}}>Real Estate</div>
          </Link>
          <div className="search" style={{flex:1, marginLeft:20}}>
            <input className="search-input" placeholder="Search city, neighborhood, or property" />
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <label htmlFor="header-filter" style={{fontSize:12,color:'#666'}}>Filter</label>
            <select id="header-filter" value={filter} onChange={handleFilterChange} style={{padding:'6px 8px',borderRadius:6,border:'1px solid #ddd'}}>
              <option value="any">Any</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="3plus">3+ Beds</option>
              <option value="photos">Has Photos</option>
            </select>
          </div>
        </div>
        <nav style={{display:'flex',alignItems:'center',gap:12}}>
          {user ? (
            <>
              <span style={{marginRight:8}}>Hi, {user.name || user.email}</span>
              <button className="btn" onClick={logout}>Sign out</button>
            </>
          ) : null}
        </nav>
      </div>
      <div className="container">
        <div className="categories" role="tablist" aria-label="Listing categories" style={{display:'flex',gap:10,overflowX:'auto',padding:'8px 0'}}>
          {[
            { id: 'all', label: 'All' },
            { id: 'houses', label: 'Houses' },
            { id: 'apartments', label: 'Apartments' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'land', label: 'Land' },
            { id: 'new', label: 'New Listings' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={"cat-btn" + (activeCategory === cat.id ? ' active' : '')}
              aria-pressed={activeCategory === cat.id}
              style={{padding:'8px 12px',borderRadius:999,border:'1px solid transparent',background:'transparent'}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
