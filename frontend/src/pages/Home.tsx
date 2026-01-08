import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [featured, setFeatured] = useState([] as any[]);
  useEffect(() => {
    api.getListings().then((data) => setFeatured(data.slice(0, 6)));
  }, []);

  return (
    <>
      <section className="hero container">
        <h1>Find your next home</h1>
        <p className="lead">Search listings, view details, and create new listings.</p>
        <div className="actions">
          <Link to="/listings" className="btn">Browse Listings</Link>
          <Link to="/create" className="btn btn-secondary">Create Listing</Link>
        </div>
      </section>

      <section className="container">
        <h2>Featured Sales</h2>
        <p className="muted">add sales contents here</p>
        <div className="grid">
          {featured.map((l: any) => (
            <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} />
          ))}
        </div>
      </section>

      <section className="container">
        <h2>Featured Videos</h2>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12 }}>
          {featured.filter((f: any) => f.video).map((f: any) => (
            <div key={f.id} style={{ minWidth: 320 }}>
              <video src={f.video} controls style={{ width: '100%', borderRadius: 8, background: '#000' }} />
              <div style={{ paddingTop: 8 }}>{f.title}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
