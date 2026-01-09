import React from "react";
import { useNavigate } from "react-router-dom";
import posts from "../data/posts";

function useAutoScroll(ref: React.RefObject<HTMLElement>, speed = 20, direction = 1) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = 0;
    let paused = false;

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    const step = (t: number) => {
      if (!last) last = t;
      // if paused, reset last so we don't get a giant dt spike on resume
      if (paused) {
        last = t;
        raf = requestAnimationFrame(step);
        return;
      }
      const dt = t - last;
      last = t;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft += direction * (speed * dt / 1000);
        // wrap smoothly when reaching the end
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft > max) el.scrollLeft = el.scrollLeft - max;
        if (el.scrollLeft < 0) el.scrollLeft = (el.scrollLeft + max) % max;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, speed, direction]);
}

export default function HotSales() {
  const navigate = useNavigate();
  const row1Ref = React.useRef<HTMLDivElement | null>(null);
  const row2Ref = React.useRef<HTMLDivElement | null>(null);

  // split posts into two rows of 15
  const row1 = posts.slice(0, 15);
  const row2 = posts.slice(15, 30);

  // auto-scroll rows with different speeds/directions
  useAutoScroll(row1Ref, 32, 1); // faster left-to-right
  useAutoScroll(row2Ref, 16, -1); // slower right-to-left

  return (
    <section className="hot-sales container">
      <h3>Hot Sales</h3>

      <div ref={row1Ref} className="post-row" aria-label="Hot sales row 1">
        {row1.map((p) => (
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
                <img src={p.media.src} alt={p.title} loading="lazy" />
              ) : (
                <video src={p.media.src} muted playsInline controls preload="metadata" />
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

      <div ref={row2Ref} className="post-row" aria-label="Hot sales row 2" style={{ marginTop: 12 }}>
        {row2.map((p) => (
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
                <video src={p.media.src} muted playsInline controls preload="metadata" />
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
