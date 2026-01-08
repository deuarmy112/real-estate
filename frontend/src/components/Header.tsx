import React from "react";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
};

export default function Header({ activeCategory, onCategoryChange }: HeaderProps) {
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

  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);


  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display:'flex',alignItems:'center',gap:16, flex:1}}>
          <Link to="/" className="brand">
            <div style={{fontSize:16}}>Boroko</div>
            <div style={{fontSize:11, marginTop:2}}>Real Estate</div>
          </Link>
          <div className="search" style={{flex:1, marginLeft:20}}>
            <div className="header-search" style={{position:'relative', display:'flex', alignItems:'center'}}>
              <span className="search-icon" aria-hidden style={{position:'absolute', left:10, display:'inline-flex', alignItems:'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input
                className="search-input"
                placeholder="Search city, neighborhood, or property"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                style={{paddingLeft:36, paddingRight:44}}
              />

              <button
                type="button"
                className="filter-btn"
                aria-label="Open filters"
                onClick={() => setShowFilter((s: any) => !s)}
                style={{position:'absolute', right:6, background:'transparent', border:0, padding:6, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M7 12h10M10 18h4" stroke="#0f766e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {showFilter && (
                <div className="filter-popover" role="dialog" style={{position:'absolute', right:0, top:'calc(100% + 8px)', background:'#fff', border:'1px solid rgba(15,118,110,0.06)', borderRadius:8, padding:10, boxShadow:'0 6px 20px rgba(11,107,99,0.06)'}}>
                  <div style={{display:'flex',flexDirection:'column',gap:8,minWidth:180}}>
                    <label style={{fontSize:12,color:'#666'}}>Listing Type</label>
                    <select value={filter} onChange={handleFilterChange} style={{padding:'8px 10px',borderRadius:8,border:'1px solid #eee'}}>
                      <option value="any">Any</option>
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="3plus">3+ Beds</option>
                      <option value="photos">Has Photos</option>
                    </select>
                    <button className="btn" style={{marginTop:6}} onClick={() => setShowFilter(false)}>Apply</button>
                  </div>
                </div>
              )}
            </div>
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
                  onClick={() => onCategoryChange(cat.id)}
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
