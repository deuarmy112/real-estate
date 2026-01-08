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
      <Link to={`/listings/${id}`} className="card-link">
        <div className="card-image">
          <img src={image || FALLBACK} alt={title} />
        </div>
        <div className="card-body">
          <h3>{title}</h3>
          <p className="muted">{address}</p>
          <p className="price">${price.toLocaleString()}</p>
        </div>
      </Link>
      <div className="card-footer" style={{padding: 8, borderTop: '1px solid #eee'}}>
        <Link to={`/agents/${agentId ?? ((id % 2) + 1)}`} style={{marginRight:8}}>Agent</Link>
        <Link to={`/listings/${id}/edit`}>Edit</Link>
      </div>
    </article>
  );
}
