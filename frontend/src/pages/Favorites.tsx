import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import api from "../services/api";

export default function Favorites() {
  const [items, setItems] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('favorites');
    let favs: number[] = [];
    try { favs = raw ? JSON.parse(raw) : []; } catch (e) { favs = []; }
    if (!favs || favs.length === 0) { setItems([]); setLoading(false); return; }
    Promise.all(favs.map((id: number) => api.getListingById(id))).then((rows) => {
      setItems(rows.filter(Boolean) as any[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading favorites…</div>;

  return (
    <section className="container">
      <h2>My Favorites</h2>
      {items.length === 0 ? (
        <div className="muted">No favorites yet — add some hearts on listings.</div>
      ) : (
        <div className="grid">
          {items.map((l: any) => (
            <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} vip={l.vip} />
          ))}
        </div>
      )}
    </section>
  );
}
