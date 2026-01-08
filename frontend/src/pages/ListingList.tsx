import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function ListingList() {
  const [listings, setListings] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(null as number | null);
  const [maxPrice, setMaxPrice] = useState(null as number | null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    api.getListings().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="container">Loading listings…</p>;

  const filtered = listings.filter((l: any) => {
    if (query && !l.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (minPrice != null && l.price < minPrice) return false;
    if (maxPrice != null && l.price > maxPrice) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const [view, setView] = useState('list' as 'grid' | 'list');

  return (
    <section className="container">
      <h2>Listings</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <aside style={{ width: 260 }}>
          <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
            <h4>Filters</h4>
            <div style={{ marginTop: 8 }}>
              <div className="muted">Price</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <input placeholder="Min" value={minPrice ?? ''} onChange={(e: any) => setMinPrice(e.target.value ? Number(e.target.value) : null)} />
                <input placeholder="Max" value={maxPrice ?? ''} onChange={(e: any) => setMaxPrice(e.target.value ? Number(e.target.value) : null)} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="muted">Keywords</div>
              <input placeholder="e.g. sea view" value={query} onChange={(e: any) => { setQuery(e.target.value); setPage(1); }} />
            </div>
          </div>
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} minPrice={minPrice} maxPrice={maxPrice} onMinChange={(v) => { setMinPrice(v); setPage(1); }} onMaxChange={(v) => { setMaxPrice(v); setPage(1); }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
              <button className={`btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid">
              {pageItems.map((l: any) => (
                <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pageItems.map((l: any) => (
                <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} />
              ))}
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
}
