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

  return (
    <section className="container">
      <h2>Listings</h2>
      <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} minPrice={minPrice} maxPrice={maxPrice} onMinChange={(v) => { setMinPrice(v); setPage(1); }} onMaxChange={(v) => { setMaxPrice(v); setPage(1); }} />
      <div className="grid">
        {pageItems.map((l: any) => (
          <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
}
