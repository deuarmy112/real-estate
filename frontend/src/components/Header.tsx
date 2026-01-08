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

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display:'flex',alignItems:'center',gap:16, flex:1}}>
          <Link to="/" className="brand">
            <div style={{fontSize:16}}>Boroko</div>
            <div style={{fontSize:11, marginTop:2}}>Real Estate</div>
          </Link>
          <div className="search" style={{flex:1}}>
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
          <Link to="/favorites" style={{display:'inline-flex', alignItems:'center', gap:8}}>
            ❤️ <span className="muted">My favorites</span> <span style={{marginLeft:6,fontWeight:700}}>{favCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
