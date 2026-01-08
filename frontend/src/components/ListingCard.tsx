import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  price: number;
  address?: string;
  image?: string;
  agentId?: number | null;
  vip?: boolean;
};

export default function ListingCard({ id, title, price, address, image, agentId }: Props) {
  const FALLBACK = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder';
  const [isFav, setIsFav] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      const favs = raw ? JSON.parse(raw) : [];
      setIsFav(favs.includes(id));
    } catch (e) {
      setIsFav(false);
    }
  }, [id]);

  const toggleFav = (ev?: any) => {
    ev?.stopPropagation();
    try {
      const raw = localStorage.getItem('favorites');
      const favs = raw ? JSON.parse(raw) : [];
      const exists = favs.includes(id);
      const next = exists ? favs.filter((x: number) => x !== id) : [id, ...favs];
      localStorage.setItem('favorites', JSON.stringify(next));
      setIsFav(!exists);
    } catch (e) {
      console.error('fav toggle', e);
    }
  };

  return (
    <article className="card">
      <div className="card-image">
        <Link to={`/listings/${id}`} className="card-link">
          <img src={image || FALLBACK} alt={title} />
        </Link>
        <div className="price-badge">${price.toLocaleString()}</div>
        <button className="fav-btn" aria-label="favorite" onClick={toggleFav}>
          {isFav ? '❤️' : '🤍'}
        </button>
        {vip && <div className="vip-badge">TOP</div>}
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
