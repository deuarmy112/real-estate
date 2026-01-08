import React from "react";
import { Link } from "react-router-dom";

export default function ListingRow({ l }: { l: any }) {
  const FALLBACK = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder';
  return (
    <div className="listing-row card">
      <Link to={`/listings/${l.id}`} className="card-link" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 140, flexShrink: 0 }}>
          <img src={l.images?.[0] || FALLBACK} alt={l.title} style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8 }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h3 style={{ margin: '0 0 6px 0' }}>{l.title}</h3>
            <div style={{ fontWeight: 800, color: 'var(--accent)' }}>€{(l.price || 0).toLocaleString()}</div>
          </div>
          <div className="muted">{l.address}</div>
          <div style={{ marginTop: 8, fontSize: 13 }} className="muted">{l.bedrooms ? `${l.bedrooms} beds • ` : ''}{l.bathrooms ? `${l.bathrooms} baths • ` : ''}{l.size ? `${l.size} m²` : ''}</div>
        </div>
      </Link>
    </div>
  );
}
