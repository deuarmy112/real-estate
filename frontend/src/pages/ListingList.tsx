import React from 'react'

export default function ListingList() {
  return (
    <section className="container">
      <h2>Listings</h2>
      <div className="muted">Listing list temporarily simplified for build.</div>
    </section>
  )
}
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ListingCard from "../components/ListingCard";
import ListingRow from "../components/ListingRow";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import React, { useEffect, useRef, useState } from 'react';

export default function ListingList() {
  const [listings, setListings] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(null as number | null);
  const [maxPrice, setMaxPrice] = useState(null as number | null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6 as number);
  const [sort, setSort] = useState('newest' as string);
  const location = useLocation();

  useEffect(() => {
  const [pageSize, setPageSize] = useState(20);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
      setListings(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setQuery(cat);
  }, [location.search]);

  if (loading) return <p className="container">Loading listings…</p>;

  const filtered = listings.filter((l: any) => {
    if (query) {
      const q = query.toLowerCase();
      const inTitle = (l.title || '').toLowerCase().includes(q);
      const inAddress = (l.address || '').toLowerCase().includes(q);
      if (!inTitle && !inAddress) return false;
    }
    if (minPrice != null && l.price < minPrice) return false;
    if (maxPrice != null && l.price > maxPrice) return false;
    return true;
  });

  // apply sort
  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sort === 'price_asc') return (a.price || 0) - (b.price || 0);
    if (sort === 'price_desc') return (b.price || 0) - (a.price || 0);
    // newest by id desc
    return (b.id || 0) - (a.id || 0);
  });

  const totalItems = sorted.length;
  const pageItems = sorted.slice(0, pageSize);

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
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select value={sort} onChange={(e: any) => setSort(e.target.value)} style={{ padding: '8px', borderRadius: 8 }}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
              </select>
              <button className={`btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
              <button className={`btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid">
              {pageItems.map((l: any) => (
                <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} vip={l.vip} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pageItems.map((l: any) => (
                <ListingRow key={l.id} l={l} />
              ))}
            </div>
          )}

          <div style={{ marginTop: 12, textAlign: 'center' }}>
            {pageSize < totalItems ? (
              <button className="btn" onClick={() => setPageSize((s: number) => s + 6)}>Show more</button>
            ) : (
              <div className="muted">End of results</div>
            )}
            <div ref={sentinelRef} />
}
