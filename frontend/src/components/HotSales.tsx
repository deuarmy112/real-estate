import React from "react";
import { useNavigate } from "react-router-dom";
import posts from "../data/posts";

export default function HotSales() {
  const navigate = useNavigate();

  return (
    <section className="hot-sales container">
      <h3>Hot Sales</h3>
      <div className="post-grid" aria-label="Hot sales grid">
        {posts.map((p) => (
          <article
            key={p.id}
            className="post-card"
            onClick={() => navigate(`/posts/${p.id}`, { state: { post: p } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/posts/${p.id}`, { state: { post: p } }); }}
          >
            <div className="media-wrap">
              {p.media.type === 'image' ? (
                <img src={p.media.src} alt={p.title} />
              ) : (
                <video src={p.media.src} muted playsInline />
              )}
            </div>
            <div className="post-footer">
              <div className="post-title">{p.title}</div>
              <div className="reactions">
                <span className="likes">❤️ {p.likes}</span>
                <span className="views">👁️ {p.views}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
