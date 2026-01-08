import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null as any);

  useEffect(() => {
    if (!id) return;
    api.getListingById(Number(id)).then((l) => setListing(l));
  }, [id]);

  if (!listing) return <p className="container">Listing not found.</p>;

  return (
    <section className="container">
      <h2>{listing.title}</h2>
      <p className="muted">{listing.address}</p>
      <p className="price">${listing.price.toLocaleString()}</p>
      <div className="gallery">
        {(listing.images && listing.images.length > 0 ? listing.images : [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'
        ]).map((src: string, i: number) => (
          <img key={i} src={src} alt={`${listing.title} ${i + 1}`} />
        ))}
      </div>
      <p>{listing.description}</p>
      <div style={{marginTop:16}}>
        {listing.agentId ? (
          <a href={`/contact/${listing.agentId}`} className="btn">Contact Agent</a>
        ) : (
          <a href={`mailto:agent@example.com`} className="btn">Contact Agent</a>
        )}
        <a style={{marginLeft:8}} href={`https://maps.google.com?q=${encodeURIComponent(listing.address || '')}`} target="_blank" rel="noreferrer">Open in Maps</a>
      </div>
    </section>
  );
}
