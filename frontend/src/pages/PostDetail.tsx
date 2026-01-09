import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function PostDetail() {
  const loc: any = useLocation();
  const post = loc.state?.post;

  if (!post) {
    return (
      <div className="container">
        <h2>Post not found</h2>
        <p className="muted">No data was passed to this page.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <main className="container">
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2 }}>
          <h1>{post.title}</h1>
          <div className="muted">{post.excerpt}</div>

          <div style={{ marginTop: 12 }}>
            {post.media.type === 'image' ? (
              <img src={post.media.src} alt={post.title} style={{ width: '100%', borderRadius: 8 }} />
            ) : (
              <video src={post.media.src} controls style={{ width: '100%', borderRadius: 8 }} />
            )}
          </div>
        </div>

        <aside style={{ width: 320 }}>
          <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
            <div style={{ fontWeight: 700 }}>Reactions</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
              <div>❤️ {post.likes}</div>
              <div>👁️ {post.views}</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
