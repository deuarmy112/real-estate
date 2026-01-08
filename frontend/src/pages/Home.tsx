import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [featured, setFeatured] = useState([] as any[]);
  useEffect(() => {
    api.getListings().then((data) => setFeatured(data.slice(0, 6)));
  }, []);

  // Static fallback content so the homepage always shows sales/videos
  const fallbackSales = [
    {
      id: 101,
      title: 'Waterfront Villa (Sample)',
      price: 795000,
      address: '100 Bay Shore',
      images: ['https://images.unsplash.com/photo-1505691723518-36a3f1d9a1d4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1'],
      agentId: 1,
    },
    {
      id: 102,
      title: 'City Penthouse (Sample)',
      price: 1125000,
      address: '400 Skyline Blvd',
      images: ['https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'],
      agentId: 2,
    },
    {
      id: 103,
      title: 'Country Estate (Sample)',
      price: 650000,
      address: '12 Farm Road',
      images: ['https://images.unsplash.com/photo-1572120360610-d971b9b9f1a5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4'],
      agentId: 1,
    },
  ];

  const fallbackVideos = [
    { id: 'v1', title: 'Tour: Waterfront Villa (Sample)', video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { id: 'v2', title: 'Tour: City Penthouse (Sample)', video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
  ];

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
          {(featured && featured.length > 0 ? featured : fallbackSales).map((l: any) => (
            <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} />
          ))}
        </div>
      </section>

      <section className="container">
        <h2>Featured Videos</h2>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12 }}>
          {((featured && featured.filter((f: any) => f.video).length > 0) ? featured.filter((f: any) => f.video) : fallbackVideos).map((f: any) => (
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
