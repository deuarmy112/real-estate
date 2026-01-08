import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  price: number;
  address?: string;
  image?: string;
  agentId?: number | null;
};

export default function ListingCard({ id, title, price, address, image, agentId }: Props) {
  const FALLBACK = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder';

  return (
    <article className="card">
      <div className="card-image">
        <Link to={`/listings/${id}`} className="card-link">
          <img src={image || FALLBACK} alt={title} />
        </Link>
        <div className="price-badge">${price.toLocaleString()}</div>
        <button className="fav-btn" aria-label="favorite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7.5-4.9-10-8.1C-0.5 7.7 4 4 7 6.4 9 8 12 11 12 11s3-3 5-4.6c3-2.4 7.5.7 5 6.5C19.5 16.1 12 21 12 21z" stroke="#fff" strokeWidth="0.8"/></svg>
        </button>
      </div>

      <div className="card-body">
        <Link to={`/listings/${id}`} className="card-link">
          <h3 className="card-title">{title}</h3>
        </Link>
        <div className="muted card-sub">{address}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
          <div className="muted">Agent #{agentId ?? ((id % 2) + 1)}</div>
          <div className="price">${price.toLocaleString()}</div>
        </div>
      </div>
    </article>
  );
}
